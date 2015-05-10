/**
 * DomoGeeek v1.0 https://github.com/ltoinel/domogeeek
 * 
 * Copyright 2014 DomoGeeek Released under the Apache License 2.0 (Apache-2.0)
 * 
 * @desc: Constants file for the ZwaveBus
 * @author: ltoinel@free.fr
 */

var commandClass = {
	113 : "alarm",
	34 : "applicationStatus",
	133 : "association",
	155 : "associationCommandConfiguration",
	32 : "basic",
	80 : "basicWindowCovering",
	128 : "battery",
	// 0x56 : "crc16Encap",
	70 : "climateControlSchedule",
	129 : "clock",
	112 : "configuration",
	33 : "controllerReplication",
	144 : "energyProduction",
	130 : "hail",
	135 : "indicator",
	137 : "language",
	118 : "lock",
	114 : "manufacturerSpecific",
	50 : "meter",
	53 : "meterPulse",
	143 : "multiCmd",
	96 : "multiInstanceChannel",
	142 : "multiInstanceAssociation",
	0 : "noOperation",
	115 : "powerlevel",
	136 : "proprietary",
	117 : "protection",
	43 : "sceneActivation",
	156 : "sensorAlarm",
	48 : "sensorBinary",
	49 : "sensorMultilevel",
	39 : "switchAll",
	37 : "switchBinary",
	38 : "switchMultilevel",
	40 : "switchToggleBinary",
	41 : "switchToggleMultilevel",
	68 : "thermostatFanMode",
	69 : "thermostatFanState",
	64 : "thermostatMode",
	66 : "thermostatOperatingState",
	67 : "thermostatSetpoint",
	99 : "userCode",
	134 : "version",
	132 : "wakeUp"
};

module.exports = { 
		commandClass : commandClass 
};
