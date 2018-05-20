/**
 * Created by xsthunder on 2018/05/08
 * app configure.
 */

'use strict';

let enableMongoDb = false;

let enableDbLog = enableMongoDb||false;

let env = 'development';
let version = 1;
let host = '127.0.0.1';
let port = 20185;


const configure = {};

configure.app = {
    env: env,
    version: version
};
configure.server = {
    host: host,
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
