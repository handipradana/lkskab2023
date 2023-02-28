# lkskabbanyumas2023
This is application for LKS Kab. Banyumas 2023
# Folder Log
The log folder contains files that have the function to display the MQTT Log to the Web Application, in this Web Application configuration you must follow the following command:
## Install Dependencies
>npm install -g

## Setting Environments Variable
>MQTT_BROKER=mqtt://your_url_MQTT_broker<br/>
>MQTT_PORT=1883<br/>
>MQTT_USERNAME=your username mqtt<br/>
>MQTT_PASSWORD=your password mqtt<br/>
>DB_HOST=your endpoint Database<br/>
>DB_USER=your username Database<br/>
>DB_PASSWORD=your password Database<br/>
>DB_NAME=your name Database<br/>

## Command run application
>npm run prod

## Run Log Application
> Open browser and access your ip+port, ex: localhost:3000 //if you create EC2 instance and not use Load Balancer<br/>
> Open your url Load Balancer //if your create Public Load Balancer<br/>

# Folder App
The log folder contains files that have the function to display the MySQL  to the Web Application, in this Web Application configuration you must follow the following command:
## Install Dependencies
>npm install -g

## Setting Environments Variable
>DB_HOST=your endpoint Database<br/>
>DB_USER=your username Database<br/>
>DB_PASSWORD=your password Database<br/>
>DB_NAME=your name Database<br/>

## Command run application
>npm run start

## Run Log Application
> Open browser and access your ip+port, ex: localhost:4000 //if you create EC2 instance and not use Load Balancer<br/>
> Open your url Load Balancer //if your create Public Load Balancer<br/>
