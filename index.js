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



app.listen(app.context.configure.server.port);
app.context.log(`tzbei api listen in ${app.context.configure.server.port}`);
