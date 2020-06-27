const { User } = require('./../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const id = req.session.userInfo._id;
  const info = await User.updateOne({ _id: id }, { nickName: req.fields.newNickName });
  req.session.userInfo.nickName = req.fields.newNickName;
 return res.send({ msg: 'modify ok！' });
}