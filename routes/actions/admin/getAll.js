// 用户模块
const actions = require('../../../model/actions');
// 分页
const pagination = require('mongoose-sex-page');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
  // 当前页
  let page = +req.query.page;   
  // 如果页码没有传递
  if (!page || !_.isNumber(page)) page = 1;
  // 查询条件
  let condition = {};
  // 状态条件
  if (req.query.state != undefined) {
    condition.state = +req.query.state;
  }
  // 查询用户信息 
  const info = await pagination(actions).page(page).size(15).display(5).find(condition).populate('user', 'telnumber name number').exec();
  // 响应
 return res.send(info);
}