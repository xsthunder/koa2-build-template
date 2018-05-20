const router = require('./app/router.js');


const Router = require('koa-router');
//const router = new Router();


const app = require('./app/koa.js');
const KoaBody = require('koa-body');

app
    .use(KoaBody({
        multipart:true
    }))
    .use(router.routes());
    //.use(router.allowedMethods());

if( !module.parent ){
	module.exports = app.callback();
}
else {
	const configure = app.context.configure;
	app.listen(configure.server.port);
	app.context.log(`${configure.app.name} listen in ${configure.server.port}`);
}
