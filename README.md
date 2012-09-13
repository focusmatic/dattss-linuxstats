dattss-linuxstats
=================

A sentinel which publishes disk, memory and cpu loads statistics to DaTtSs' server.

See: http://dattss.com/

Configuration
-------------
Retrieve your authentication key on on DaTtSs website and install this NodeJS application on your servers:

`DATTS_AUTH_KEY=<yout auth key> SERVER_NAME=<server name> node app.js`

Once launched you'll see the statistics on DaTtSs' dashboard displayed as:
- <server name>.cpuload (in percent)
- <server name>.memoryload (in percent)
- <server name>.diskload (the biggest partition in percent)