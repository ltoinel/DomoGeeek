/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Constants file for the ZwaveBus
 * @author: ltoinel@free.fr
 */

var commandClass = {
	0x71 : "alarm",
	0x22 : "applicationStatus",
	0x85 : "association",
	0x9b : "associationCommandConfiguration",
	0x20 : "basic",
	0x50 : "basicWindowCovering",
	0x80 : "battery",
	0x56 : "crc16Encap",
	0x46 : "climateControlSchedule",
	0x81 : "clock",
	0x70 : "configuration",
	0x21 : "controllerReplication",
	0x90 : "energyProduction",
	0x82 : "hail",
	0x87 : "indicator",
	0x89 : "language",
	0x76 : "lock",
	0x72 : "manufacturerSpecific",
	0x32 : "meter",
	0x35 : "meterPulse",
	0x8f : "multiCmd",
	0x60 : "multiInstanceChannel",
	0x8e : "multiInstanceAssociation",
	0x00 : "noOperation",
	0x73 : "powerlevel",
	0x88 : "proprietary",
	0x75 : "protection",
	0x2B : "sceneActivation",
	0x9c : "sensorAlarm",
	0x30 : "sensorBinary",
	0x31 : "sensorMultilevel",
	0x27 : "switchAll",
	0x25 : "switchBinary",
	0x26 : "switchMultilevel",
	0x28 : "switchToggleBinary",
	0x29 : "switchToggleMultilevel",
	0x44 : "thermostatFanMode",
	0x45 : "thermostatFanState",
	0x40 : "thermostatMode",
	0x42 : "thermostatOperatingState",
	0x43 : "thermostatSetpoint",
	0x63 : "userCode",
	0x86 : "version",
	0x84 : "wakeUp"
};

module.exports = commandClass;
