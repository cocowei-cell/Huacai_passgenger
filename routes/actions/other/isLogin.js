const _ = require('lodash');
module.exports = async (req, res) => {
    //返回用户的头像，昵称，角色，邮箱，id
   return res.send(_.pick(req.session.userInfo, ['avator', 'nickName', 'role', 'email', '_id']));

}