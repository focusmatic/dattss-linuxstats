// Copyright © Focusmatic SAS
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

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