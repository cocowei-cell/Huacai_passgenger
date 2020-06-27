const { User, Uservalidate } = require('./../../../model/User');
const _ = require('lodash');

module.exports = async (req, res) => {
  // 获取参数
  const { error } = Uservalidate(req.fields);
  if (error) {
    return res.status(400).send({ msg: error.message })
  }
  const info = await User.create(req.fields);
 return res.send(_.pick(info, ['_id', 'nickName', 'role', 'email']));
}