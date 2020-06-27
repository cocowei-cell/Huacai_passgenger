// 用户模块
const { User, Uservalidate } = require('../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  const info = req.fields;
  const { email, nickName, password, role } = req.fields;
  if (req.session.userInfo.role === 'admin') {
    let tagEmail = await User.findOne({ email });
    if (tagEmail) {
      await User.updateOne({ email }, { role });
      return res.send({ msg: '修改角色成功' });
    } else {
      const { error } = Uservalidate(info);
      if (error) return res.status(400).send({ msg: error.message });
      let createInfo = await User.create(info);
      return res.send({ msg: 'the user is create ok!' });
    }
  } else {
      return res.status(400).send({ msg: '闲杂人等，请勿操作！！！' });
  }
}