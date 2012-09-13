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

var os = require('os');

var config = {};

//The name of the sentinel DaTtSs' process
config.process_name = process.env.PROCESS_NAME || 'Linux-Servers';

//The name of the server. The hostname by default.
config.servername =  process.env.SERVER_NAME || os.hostname();

//The mandatory DATTS_AUTH_KEY to retrieve on http://dattss.com/
config.dattss_auth_key = process.env.DATTSS_AUTH_KEY;
if(!config.dattss_auth_key){
	console.error("ERROR: You must define a DATTSS_AUTH_KEY env variable");
	process.exit(1);
}

module.exports = config;