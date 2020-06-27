const { User } = require('./../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const email = req.query.email;
  if (req.session.userInfo.role === 'admin') {
    const info = await User.findOne({ email });
    if (info) {
      await User.updateOne({ email }, { password: '123456' });
     return res.send({ msg: 'ok' });
    } else {
      return res.status(400).send({ msg: '邮箱不存在' });
    }
  }
}