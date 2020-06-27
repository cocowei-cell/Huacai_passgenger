const { User } = require('./../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  var email = req.query.email;
  const info = await User.findOne({ email });
  if (info) {
    return res.status(400).send({ msg: '用户名已存在' });
  }
 return res.send({ msg: '用户名可用' });
}