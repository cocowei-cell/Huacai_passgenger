
$(function () {
  var app1 = new Vue({
    el: '#app',
    data: {
      userInfo: {},
      allInfo: {},
      email: '',
      nickName: '',
      password: '',
      role: '',
      emailuse: ''
    },
    methods: {
      async getUserInfo() {
        if (await islogin()) {
          this.userInfo = await islogin();
          console.log(this.userInfo);

        } else {
          logoutook();
          return;
        }
      },
      getUserAll(page) {
        var that = this;
        setTimeout(function () {
          that.allInfo = {};
          jQuery.ajax({
            type: 'get',
            url: '/getallusers',
            data: {
              page: page,
            },
            success: function (res) {
              that.allInfo = res;
            }
          })
        })
      },
      geta(page) {
        if (page > this.allInfo.pages) {
          this.allInfo.page = this.allInfo.pages;
          return;
        } else if (page <= 0) {
          this.allInfo.page = 1;
          return;
        } else {
          this.getUserAll(page);
        }
      },
      filters(page) {
        this.getUserAll(page);
      },
      deletes(id) {
        var tagd = confirm('您确定删除该用户吗？');
        if (tagd) {
          jQuery.ajax({
            type: 'delete',
            url: '/deleteuser/' + id,
            success: function (data) {
              location.reload();
            }
          })
        }
      },
      outPage() {
        jQuery.ajax({
          type: 'post',
          url: '/logout',
          success: function () {
            logoutook();
            location.replace('/index.html');
          }
        })
      },
      add() {
        var email = this.email.trim();
        var nickName = this.nickName.trim();
        var password = this.password.trim();
        var role = this.role.trim();
        if (email.length === 0) {
          alert("请输入邮箱");
          return false;
        }
        if (nickName.length === 0) {
          alert("请输入昵称");

          return false;
        }
        if (password.length === 0) {
          alert("请输入密码");
          return false;
        }
        if (role.length === 0) {
          alert("请选择角色选项");
          return false;
        }
        $.ajax({
          type: 'post',
          url: '/adduser',
          data: {
            email: email,
            nickName: nickName,
            password: password,
            role: role
          },
          success: function (res) {
            alert(res.msg);
            location.reload();
          },
          error: function (err) {
            alert(err.responseJSON.msg);
          }
        })
      },
      validateEmail() {
        var email = this.emailuse.trim();
        if (email.length === 0) return;
        $.ajax({
          type: 'get',
          url: '/user/findUser',
          data: {
            email: email
          },
          success: function (res) {
            alert(res.msg);
          },
          error: function (err) {
            alert(err.responseJSON.msg);
          }
        })
      }
    },
    created() {
      this.getUserInfo();
      this.getUserAll(1);
    }
  })

})

