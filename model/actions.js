//导入mongoose模块
const mongoose = require('mongoose');
//结构Schema
const { Schema } = mongoose;

const actionst = new Schema({
  action: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  picture: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    default: 0,
    //默认为0，为未审核，1为审核
    enum: [0, 1]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  time: {
    type: String,
    default: require('./../commonJS/getTime')
  }
});
const action = mongoose.model('action', actionst);
module.exports = action;