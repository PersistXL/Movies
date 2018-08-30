const express = require('express'); //导入 express 功能模块 创建 Express 应用实例 名为 app
const bodyParser=require('body-parser');
const app = express();
//引入mongoose数据库驱动
var mongoose = require('mongoose');
//设置连接位置
mongoose.connect('mongodb://127.0.0.1:27017/express-api');
var db = mongoose.connection;
// 引入 MovieSchema
const Movie = require('./movie')
//使用 body-parser 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//监听连接信息
db.on('error', console.error.bind(console, 'connection error:'));
//手动连接一次，构建一条movie 数据，调用 mongoose 提供的 save 接口保存数据
db.once('open', () => {
    // console.log("数据库成功连接");
    let movie = new Movie({ title: '齐天大圣' });
    movie.save(function (err) {
        if (err) console.log(err);
    })
    console.log('suceess!');
});
//当 app.get () 接口会响应 HTTP GET 请求  当访问路径与 / 匹配时 会执行下面代码 通过 res.send() 接口向客户端 发送 hello world 字符串。
app.get('/', function (req, res) {
    res.send('hello world!');
});

app.get('/api',function(req,res){
    res.json({message:'get request!'})
});
app.post('/api',function(req,res){
    console.log(req.body);
    res.json({ message: 'get request!!!'})
});

app.get('/movies', function (req, res) {
    Movie.find().sort({ 'createdAt': -1 }).exec(function (err, movies) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ movies: movies })
    });
});
app.post('/movies', function (req, res) {
    if (req.body.title === '') return res.status(400).json({ error: '电影标题不能为空！' });
    var movie = new Movie();
    for (prop in req.body) {
        post[prop] = req.body[prop];
    }
    movie.save(function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            message: '电影存储成功了！'
        });
    });
});
// app.listen()方法 会创建一个 HTTP server实例，用来监听来自本地 3000 端口的所有请求
app.listen(3000, function () {
    console.log('你的服务器在3000窗口！')
});



