const { User } = require('../../../model/User');

//退出删除cookie
module.exports = async (req, res) => {
	req.session.destroy(err => {
		if (err == null) {
			res.clearCookie('connect-sid');
			res.send({ message: '退出成功' });
		} else {
			res.send({ message: '退出失败' });
		}
	});
};
