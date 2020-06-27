const actions = require('./../../../model/actions');
const idValidator = require('./../../../model/idValidate');
const _ = require('lodash');
module.exports = async (req, res) => {
  const id = req.params.id;
  const { error } = idValidator({ _id: id });
  if (error) return res.status(400).send({ msg: error.message });
  if (req.session.userInfo._id) {
    await actions.deleteOne({ _id: id });
   return res.send({ msg: 'ok' });
  }
  else {
   return res.status(400).send({ msg: 'please login' });
  }
}