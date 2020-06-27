// 用户模块
const { User } = require('../../../model/User');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
  // 当前页
  let page = +req.query.page;
  // 如果页码没有传递
  if (!page || !_.isNumber(page)) page = 1;
  // 查询用户信息 
  const info = await pagination(User).page(page).size(19).display(5).find({ counts: { $gt: 0 } }).sort('-counts').select('createtime telnumber name counts number').exec(); //按照降序排列
 return res.send(info);
}