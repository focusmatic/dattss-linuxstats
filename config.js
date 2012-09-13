var os = require('os');

var config = {};

//The name of the sentinel DaTtSs' process
config.process_name = process.env.PROCESS_NAME || 'Linux-Servers';

//The name of the server. The hostname by default.
config.servername =  process.env.SERVER_NAME || os.hostname();

//The mandatory DATTS_AUTH_KEY to retrieve on http://dattss.com/
config.datts_auth_key = process.env.DATTS_AUTH_KEY;
if(!config.datts_auth_key){
	console.error("ERROR: You must define a DATTS_AUTH_KEY env variable");
	process.exit(1);
}

module.exports = config;