$(function () {
  new Vue({
    el: '#app',
    data: {
      userInfo: {}
    },
    methods: {
      async getUserInfo() {
        if (await islogin()) {
          this.userInfo = await islogin();
          nickname = this.userInfo.nickName;
        } else {
          logoutook();
          return;
        }
      },
      outPage() {
        $.ajax({
          type: 'post',
          url: '/logout',
          success: function () {
            logoutook();
            location.replace('/index.html');
          }
        })
      },
    },
    created() {
      this.getUserInfo();
    }
  })

  var nickname;
  var nickNameRegx = /nima|fuck|mother|他吗的|特么的|你吗比|你吗|曹逼|曹比|智障|性爱|性交|啪啪|艹你吗|草拟吗|草你妈|艹|草拟妈|操你妈|日你吗|日你妈|rinima|我靠|去几把|B脸|吃屎|dad|xukun|nmsl|sml|尼玛|你妈逼|你妈B|几把|鸡巴|JB|bitch|婊子|蛆|废物|笨比|死吗玩意|gi/;
  $('button[type="submit"]').click(function () {
    var value = $('#nick').val().trim();
    if (value === nickname) {
      alert('昵称相同不用修改');
      return false;
    }
    if (value.length < 2 || value.length > 6) {
      alert('昵称不符合规则');
      return false;
    }
    if (nickNameRegx.test(value)) {
      alert('昵称非法');
      return false;
    }
    $.ajax({
      url: '/user/modifynick',
      type: 'put',
      data: {
        newNickName: value
      },
      success: function () {
        location.reload();
      }
    })
    return false;
  })
})