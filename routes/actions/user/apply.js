const { User } = require('./../../../model/User');
const actions = require('./../../../model/actions');
const idValidator = require('./../../../model/idValidate');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const { name, number, college, telnumber } = req.fields; //将此参数保存到用户表中
  const { err } = idValidator({ _id: college });
  if (err) return res.status(400).send({ msg: err.message });
  const { action, picture } = req.fields;  //此参数保存到行为表
  const id = req.session.userInfo._id;
  if (!id) return res.status(400).send({ msg: '未知错误' });
  await User.updateOne({ _id: id }, { name, number, telnumber, college });
  await actions.create({
    user: id,
    action: action.trim(),
    picture
  });
 return res.send({ msg: 'add ok' });
}