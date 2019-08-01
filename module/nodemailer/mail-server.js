const koa = require('koa');
const Router = require('koa-router');
const nodemailer = require('nodemailer');

const app = new koa();
const router = Router();

//建立郵件客戶端
//允許低安全性應用程式：已開啟
var transporter = nodemailer.createTransport({
    //使用Gmail郵件伺服器
    service:'Gmail',
    auth:{
      user : 'example@gmail.com',
      pass : 'password'
    }
  });
  
  var mailOptions = {
    //寄件者
    from : 'example@gmail.com',
    //收件者
    to : 'Lisheng0706@gmail.com',
    //主旨
    subject : 'apple',
    //內文
    text : 'Titan',
    //Html內文
    html : ''
  };  

//http://127.0.0.1:3001/?message=123456
router.get('/success',async (ctx) => {
    mailOptions.html = `<b>Send message from nodemailer ${ctx.query.message}</br>`
    //傳送郵件
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent : ' + info.response);
        }
    });
    ctx.body = 'ok';
})

app.use(router.routes());
app.listen(3001);