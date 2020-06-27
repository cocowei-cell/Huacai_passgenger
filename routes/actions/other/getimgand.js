const actions = require('./../../../model/actions');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const info = await actions.find({state:1}).populate('user', '-password -college -telnumber -createtime -email -nickName -role -_id -avator -counts').limit(45);
  return res.send(info);
}