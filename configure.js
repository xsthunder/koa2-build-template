/**
 * Created by xsthunder on 2018/05/08
 * app configure.
 */
const fs = require('fs');
'use strict';

let enableMongoDb = false;

let enableDbLog = enableMongoDb||false;

let env = 'development';

const configure = {};

try{
	let {name,version} = JSON.parse( fs.readFileSync('package.json', 'utf-8') );
	configure.app = {
		name:name,
		env: env,
		version: version
	};
}catch(err){
	console.error('Failed to get app name and version', err);
}

let port = 20185;

configure.server = {
	port: port
};

configure.enableMongoDb = enableMongoDb;
if( enableMongoDb ){
	configure.mongoose = {
		url: 'mongodb://127.0.0.1:19970/test',
		port: 19970
	};
	configure.model = require('./app/schema/configure');
}

module.exports = configure;
