const actions = require('./../../../model/actions');
const _ = require('lodash');

module.exports = async (req, res) => {
  //获取参数
  const id = req.params.id;
  const info = await actions.findById(id).populate('user', '-password -college -telnumber -createtime -email -nickName -role -avator -counts');
 return res.send(info);
}