//判断登录状态
function islogin() {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'post',
      url: '/islogin',
      success: function (res) {
        if (res._id) {
          resolve(res);
        } else {
          resolve(false);
        }
      }
    })
  })

}