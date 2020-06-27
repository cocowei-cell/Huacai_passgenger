//导出路由模块
module.exports = app => {
    app.use('/user', require('./user'));
    app.use('/', require('./admin'));

    app.get('/getimg', require('./actions/other/getimg'));
    app.get('/getimgand', require('./actions/other/getimgand'));








    //删除行为
    app.delete('/deleteact/:id', require('./actions/other/deleteact'));
 
    //文件上传路由
    app.post('/uploads', require('./actions/other/uploads'));
    //登录退出模块
    app.post('/islogin', require('./actions/other/isLogin'));
    app.post('/login', require('./actions/other/login'));
    app.post('/logout', require('./actions/other/logout'));
}