// mount global router

const Router = require('koa-router');
const router = new Router();
const configure = require('../configure');

/**
 * COR controls for options
 */
router.options('/*',(ctx)=>{
    ctx.set('Access-Control-Allow-Headers','Content-Type');
    ctx.set('Access-Control-Allow-Origin','*');
    ctx.set('Access-Control-Allow-Methods','POST, GET, OPTIONS, DELETE, PUT');
    ctx.set('Access-Control-Max-Age','86400');
    ctx.body = '';
});


/**
 * log to Db
 */
if(configure.enableDbLog){
	router.use('/*',async(ctx,next)=>{
		ctx.set('Access-Control-Allow-Origin','*');//must set
		//ctx.debug(ctx.request.body);
		let Log = ctx.mongoose.model(ctx.configure.model.log);
		let req = ctx.request;
		console.log( ctx.request);
		req = `${req.method} on ${req.host}${req.url} with body `+ JSON.stringify(req['body']['fields']);
		await next();
		let res = JSON.stringify(ctx.body);
		let log = new Log(Log.newInstance(req,res));
		log.save();
	});
}

/*
 * this is an alive check
 */
router.get('/how-are-you', async(ctx)=>{
	ctx.good('i am fine, thank you, and you?');
});

// TODO USE FS.READDIR to auto load router
router.use('/login',require('./router/login').routes());
router.use('/register',require('./router/register').routes());
router.use('/log',require('./router/log').routes());

module.exports = router;
