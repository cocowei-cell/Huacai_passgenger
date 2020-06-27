const actions = require('../../../model/actions');
const { User } = require('./../../../model/User');
const _ = require('lodash');
module.exports = async (req, res) => {
  const id = req.params.id;
  actionsID = id.split('-')[0];
  userID = id.split('-')[1];
  if (req.session.userInfo.role === 'admin') {
    await actions.updateOne({ _id: actionsID }, { state: 1 });
    const countAction = await User.findById(userID);
    let count = countAction.counts + 1;
    await User.updateOne({ _id: userID }, { counts: count });
   return res.send({ msg: 'ok' });
  } else {
   return res.status(403).send({ msg: '凡人勿进' });
  }
}