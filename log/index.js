var mqtt = require('mqtt');
var mysql = require('mysql');
require('dotenv').config({ path: './.env' });
var client = mqtt.connect(process.env.MQTT_BROKER, {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
});
console.log(`Test` + process.env.MQTT_BROKER);
var express = require('express');
var app = express();

var logData = [];

// Buat koneksi ke database MySQL
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Function to create the table if it doesn't exist
function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tbl_store (
      id INT AUTO_INCREMENT PRIMARY KEY,
      topic VARCHAR(255) NOT NULL,
      message FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  connection.query(createTableQuery, function (error, results, fields) {
    if (error) throw error;
    console.log('Table tbl_store created or already exists');
  });
}

// Call the function to create the table before connecting
createTable();

client.on('connect', function () {
  client.subscribe('sensor/suhu');
  client.subscribe('sensor/kelembapan');
});

client.on('message', function (topic, message) {
  logData.push({ topic: topic, message: parseFloat(message.toString()) });
  var sql = `INSERT INTO tbl_store (topic, message) VALUES ('${topic}', '${message.toString()}')`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    console.log('Data berhasil disimpan');
  });
});

app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <title>MQTT Log</title>
      </head>
      <body>
        <h1>MQTT Log</h1>
        <table border="1">
          <tr>
            <th>Topic</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
          ${logData
            .map(function (data) {
              return `
              <tr>
                <td>${data.topic}</td>
                <td>${data.message}</td>
                <td>${new Date().toISOString()}</td>
              </tr>
            `;
            })
            .join('')}
        </table>
      </body>
    </html>
  `);
});

app.listen(3000, function () {
  console.log('Server started on http://localhost:3000');
});
