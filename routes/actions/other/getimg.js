const actions = require('./../../../model/actions');
const _ = require('lodash');
require('mongoose-query-random');
module.exports = async (req, res) => {
  const count = await actions.countDocuments();
  if (count === 0) return res.status(400).send({ msg: 'no can display!' });
  else {
    await actions.find({state:1}).random(5, true, (err, reslut) => {
     return res.send(reslut);
    })
  }

}