//导入mongoose模块
const mongoose = require('mongoose');
//结构Schema
const { Schema } = mongoose;
// joi模块
const Joi = require('joi');
const _ = require('lodash')
//创建用户规则
const user = new Schema({
    // 昵称
    nickName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 6
    },
    //邮箱
    email: {
        type: String,
        required: true,
        unique: true
    },
    // 密码必须
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 16
    },
    avator: {
        type: String,
        default: '/uploads/user' + _.random(1,14) + '.png'
    },
    //用户角色
    role: {
        type: String,
        // admin 普通管理员 normal 普通用户 
        default: 'normal',
        enum: ['admin', 'normal']
    },
    //提交后才生成的
    name: {
        type: String,
        required: false,
    },
    createtime: {
        type: String,
        default: require('./../commonJS/getTime')
    },
    number: {
        type: String,
        required: false
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college',
        required: false
    },
    telnumber: {
        type: String,
        required: false
    },
    counts: {
        type: Number,
        default: 0
    }
}, { versionKey: false })
//创建User表格
const User = mongoose.model('User', user);

//obj是被验证的对象
const Uservalidate = obj => {
    const rule1 = {
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱不符合验证规则')),
        nickName: Joi.string().required().max(6).min(2).error(new Error('昵称不符合规则')),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{6,16}$/).error(new Error('密码不符合验证规则')),
        role: Joi.string().valid('normal', 'admin').error(new Error('角色名称不符合规则'))
    };
    return Joi.validate(obj, rule1, {
        // 检测到所有错误
        abortEarly: true,
        // 允许对象包含被忽略的未知键
        allowUnknown: false
    })
};


//登录验证
const UserLogin = user => {
    const rule2 = {
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('用户名或密码错误')),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,16}$/).error(new Error('用户名或密码错误')),
    };
    return Joi.validate(user, rule2, {
        // 检测到所有错误
        abortEarly: true,
    })
};

module.exports = {
    User,
    Uservalidate,
    UserLogin
}