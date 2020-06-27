const college = require('./../../../model/college');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const info = await college.find();
 return res.send(info);
}