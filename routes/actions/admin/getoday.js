const actions = require('../../../model/actions');
const _ = require('lodash');
const time = require('./../../../commonJS/getTime');//获取时间
module.exports = async (req, res) => {
  const todayAction = await actions.countDocuments({ time: time() });//查询今日提交的所有人数
  const todayPass = await actions.countDocuments({ time: time(), state: 1 })//查询今日审核通过的人数
  const todayWait = await actions.countDocuments({ time: time(), state: 0 }) //查询今日未审核的人数
  return res.send({ todayAction, todayPass, todayWait });
}