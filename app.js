const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const formidable = require('express-formidable');
const mongoose = require('mongoose');
//开放静态资文件夹
app.use(express.static(path.join(__dirname, 'public')));
//配置session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        //设置过期时间为10天
        maxAge: 10 * 24 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    console.log(req.headers['user-agent']);
    next();
})
//文件上传目录
app.use(formidable({
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024,  //最大限制为2M
}))

//链接数据库

mongoose.connect('mongodb://localhost/demo', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('数据库链接成功'))
    .catch(() => console.log('数据库链接失败'));

require('./routes')(app);
// 处理404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404', 'notfnd.html'));
})
//监听3000端口
app.listen(80, () => {
    console.log('服务器开启成功');
})

