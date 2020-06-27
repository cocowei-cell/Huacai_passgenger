const _ = require('lodash');
const { User, UserLogin } = require('./../../../model/User');
module.exports = async (req, res) => {
    console.log(req.fields);

    const { error } = UserLogin(req.fields);
    if (error) return res.status(400).send({ msg: error.message });
    //降低数据库的压力，从数据库中查询用户信息
    let tag = await User.find({ email: req.fields.email });
    if (!tag.length) return res.status(400).send({ msg: '用户名不存在' });
    let { password } = await User.findOne({ email: req.fields.email });
    if (password === req.fields.password) {
        req.session.userInfo = tag[0];
        return res.send({ msg: 'ok' });
    }
    else {
       return res.status(401).send({ msg: '用户名或密码错误' });
    }

}