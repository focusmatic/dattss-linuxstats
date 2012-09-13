dattss-linuxstats
=================

A sentinel which publishes disk, memory and cpu loads statistics to DaTtSs' server.

See: http://dattss.com/

Usage
-----
Retrieve your authentication key on on DaTtSs website and install this NodeJS application on your servers:

`DATTS_AUTH_KEY=<yout auth key> SERVER_NAME=<server name> node sentinel.js`

Once launched you'll see the statistics on DaTtSs' dashboard displayed as:
- cpuload (in percent)
- memoryload (in percent)
- diskload (the biggest partition in percent)