const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const fsPromises = require('fs').promises;

const app = new koa();
const router = Router();

app.use(bodyParser());

const readFile = fsPromises.readFile('./data.json')

router.get('/',async (ctx, next) => {
    readData = await readFile;
    ctx.body = readData;
});


app
  .use(router.routes());

var server = app.listen(3000, function() {
    var port = server.address().port;
      console.log("App now running on port", port);
});