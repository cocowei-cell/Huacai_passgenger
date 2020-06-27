const { User, Uservalidate } = require('../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const { originPassword, newPassword } = req.fields;

  const { email, role, nickName } = req.session.userInfo;
  const { error } = Uservalidate({ password: originPassword, email, role, nickName });
  if (error) {
    return res.status(400).send({ msg: error.message });
  }
  let id = req.session.userInfo._id;
  const passwords = await User.findById(id).select('password -_id');
  if (passwords.password === originPassword) {
    await User.updateOne({ _id: id }, { password: newPassword });
    delete req.session.userInfo;
   return res.send({ msg: 'password ok' });
  } else {
    return res.status(400).send({ msg: '密码不正确' });
  }
}