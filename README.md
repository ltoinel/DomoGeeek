![DomoGeeek](./assets/img/logo.jpg "Domogeek")

**DomoGeeek** is a set of small and flexible components for home automation based on MQTT / Z-Wave / Raspberry Pi / NodeJS / MongoDB.

*Note : These  NodeJS apps are fully experimental. You can use PM2 to start the apps and maintain them up.*

## Architecture schema
![DomoGeeek Architecture](./assets/img/architecture.jpg "Architecture")

## My current installation 
* A Raspberry Pi with a Z-wave Dongle / Raspian / NodeJS / Mosquitto and MongoDB that hosts the NodeJS apps.
* An Android Phone that provides me a free SMS gateway and notifies me when there is a power outage.

![DomoGeeek Physical Architecture](./assets/img/installation.jpg "Physical Architecture")


----
# Core apps description

## Zwavebus
Z-wave gateway between the MQTT broker and the Zwave network.

## Alarm 
Alarm module that alerts you when some movement is detected or a door is opened when you are not at home.

## GroupSMS
SMS Mailing-list module that simplify the communication to a list of persons by SMS.

## Multipush
Send message to many communication channels : Email, SMS, Openkarotz ..

## Presence
Detect your presence in your home based on the Wifi detection of your smartphone or your GPS location.

## Scheduler
Schedule any task in you home: open / close the shutter, announce a message on the karotz ...

## Smartmeter
Analyze, store the amount of energy consumed by your home. 

## Smokedetector
Alert you when smoke is detected at your home.


----
#Tutorial

## Prerequisites 
* Install Node v0.12 (http://conoroneill.net/download-compiled-version-of-nodejs-0120-stable-for-raspberry-pi-here)
* Install MongoDB and start the daemon (http://raspbian-france.fr/installer-mongodb-raspberry-pi/)
* Install Mosquitto (MQTT Bus) and start the daemon (http://mosquitto.org/2013/01/mosquitto-debian-repository/)

## Install the share modules
* Install the share modules, this will create a "node_modules" directory inside the project
```sh
$ cd ./domogeeek/
$ npm install
```

## Start the apps
* Configure the apps that you want to use
```sh
$ cd apps/scheduler/
$ mv config-sample.js config.js
$ vi config.js
```
* Test the app quickly
```sh
$ node app.js
ctrl+c to close the app
```
* Install pm2 
```sh
$ npm install pm2 -g
```
* Start the apps into a daemon
```sh
$ pm2 start ./apps/scheduler/app.js --name scheduler
.....
```
* Check the logs and flush them if needed
```sh
$ pm2 logs
$ pm2 flush
.....
```
* Check apps status and the memory
```sh
$ pm2 list
$ pm2 monit
.....
```

