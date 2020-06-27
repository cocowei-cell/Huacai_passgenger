const college = require('./../../../model/college');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const info = req.fields;
  const tag = await college.findOne(info);
  if (tag) return res.status(400).send({ msg: '学院已存在' });
  await college.create(info);
  return res.send({ msg: '学院创建成功' });
}