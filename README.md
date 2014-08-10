DomoGeeek
=========

Domotic apps experiments based on Z-wave / Raspberry / NodeJS / MongoDB.
These apps are totally experimental for the moment.

## GroupSMS
Group SMS app that allows persons to subscribe to group SMS. 
When a message is send to this list, the message is send also to all the subscribers by the app.
Useful to connect all your neighbours throw an SMS Mailing list.

## ZwaveBus
Z-Wave bus message based on NodeJS. This app proposes a dynamic loading of events listeners. 
You can quickly develop your own listeners that respond automatically to Z-Wave events.
All changed value events are stored into mongoDB.

## Multipush
Multipush is a service that can broadcast a message on multiple canal (sms, mail, karotz, openkarotz ...).

## Scheduler
Scheduler provide a tasks mechanism to schedule tasks like opening or closing the shutters automatically.
This app is based on the cron module from NodeJS.

----
### Directory description

* apps : Contains Node.js apps.
* deps : Contains specific Node.js modules that need to be installed (npm install xxxx -g)
* lib  : Contains shared libraries for the apps.
* misc : Contains miscellaneous code.