//文件上传模块
module.exports = async (req, res) => {
    var filePath = [];
    //如果有文件上传
    if (req.files) {

        for (let item in req.files) {
            //如果存在路径
            if (!req.files[item].type.includes('image')) {
                return res.status(400).send({ msg: '请上传图片', code: 0 });
            }
            if (req.files[item].path) {
                filePath.push({
                    [item]: req.files[item].path.split('public')[1]
                })
            }
        }
    }
   return res.send(filePath);
}