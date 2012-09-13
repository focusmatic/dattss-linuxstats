var dattss = require('dattss');
var df = require('df');
var osutils = require('./lib/os-utils');
var config = require('./config');
var dattss = require('dattss');

//The statistics period
var statsPeriodInMs = 1000;

//The sentinel process
var sentinel = require('dattss').process({ name: config.process_name,auth: config.datts_auth_key });

//Monitor the free memory
setInterval(function() {
	var freemem = osutils.freememPercentage();
	memload = Math.round((1 - freemem) * 100);
	sentinel.agg(config.servername+'.memload', memload+'g');
},statsPeriodInMs);

//Monitor the CPU
osutils.cpuUsage(function(cpuLoad){
	cpuLoad = Math.round(cpuLoad * 100);
	sentinel.agg(config.servername+ '.cpuload',cpuLoad + 'g');
	return true;
},false,statsPeriodInMs);

//Monitor the biggest disk
setInterval(function() {
	df(function (err, table) {
		if (err) {
			console.error(err.stack);
			return;
		}

		var max = 0;
		var maxEntry = {};
		table.forEach(function(entry){
			if(entry.blocks > max){
				max = entry.blocks;
				maxEntry = entry;
			}
		});
		sentinel.agg(config.servername+ '.diskload',maxEntry.percent + 'g');
	});
},statsPeriodInMs);