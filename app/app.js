var mysql = require('mysql');
var express = require('express');
var app = express();
var port = 4000;

require('dotenv').config({path: './.env'});
// Buat koneksi ke database MySQL
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Buat endpoint untuk menampilkan chart
app.get('/', function (req, res) {
  connection.query('SELECT * FROM tbl_store', function (error, results, fields) {
    if (error) throw error;

    // Buat array untuk menyimpan data dari database
    var labels = [];
    var data = [];

    // Loop melalui hasil query dan tambahkan ke array
    results.forEach(function (result) {
      labels.push(result.topic);
      data.push(parseFloat(result.message));
    });

    // Render halaman HTML dengan chart menggunakan library Chart.js
    res.send(`
      <html>
        <head>
          <title>MQTT Log</title>
          <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
          <style>
            canvas {
              max-width: 100%;
              height: 500px;
            }
          </style>
        </head>
        <body>
          <h1>MQTT Log</h1>
          <div>
            <canvas id="myChart"></canvas>
          </div>
          <script>
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: ${JSON.stringify(labels)},
                datasets: [{
                  label: 'Data Sensor',
                  data: ${JSON.stringify(data)},
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                }
              }
            });
          </script>
        </body>
      </html>
    `);
  });
});

// Jalankan server
app.listen(port, function () {
  console.log(`MQTT Log app listening on port ${port}!`);
});
