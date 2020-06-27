//导入mongoose模块
const mongoose = require('mongoose');
//结构Schema
const { Schema } = mongoose;
// joi模块
const Joi = require('joi');

const college = new Schema({
  name: {
    type: String,
    required: true
  }
}, { versionKey: false });

const colleges = mongoose.model('college', college);
module.exports = colleges;