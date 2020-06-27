// 用户模块
const { User } = require('../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  const id = req.params.id;
  if (req.session.userInfo.role === 'admin') {
    await User.findByIdAndRemove(id);
   return res.send({ msg: 'the user has been removed' });
  } else {
   return res.status(403).send({ msg: '闲杂人等，请勿操作！！' });
  }
}