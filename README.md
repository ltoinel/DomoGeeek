![DomoGeeek](./static/img/logo.jpg "Domogeek")

DomoGeeek is an home automation solution based on Node-RED that runs on a Raspberry Pi.

Preinstalled modules : 
* Scheduler : Schedule tasks at fixed time or sun time.
* MongoDB : MongoDB connector for saving data.

Works perfectly with the ZWave2MQTT module for interaction with Z-Wave devices throw an MQTT bus.

----
#Tutorial

## Prerequisites 
* Install Node v0.12 (http://conoroneill.net/download-compiled-version-of-nodejs-0120-stable-for-raspberry-pi-here)

## Optional
* Install MongoDB and start the daemon (http://raspbian-france.fr/installer-mongodb-raspberry-pi/)
* Install Mosquitto (MQTT Bus) and start the daemon (http://mosquitto.org/2013/01/mosquitto-debian-repository/)

## Install 

```sh
$ cd ./domogeeek/
$ npm install
```

## Run 

```sh
$ ./start.sh
```

Then open your browser on : http://127.0.0.1