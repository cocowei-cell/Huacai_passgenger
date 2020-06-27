$(function () {
  $(function () {
    $('#export').click(function () {
      Excel('tables', 'export', '排名');
    })
  })
  var app1 = new Vue({
    el: '#app',
    data: {
      userInfo: {},
      action: {},
    },
    methods: {
      async getUserInfo() {
        if (await islogin()) {
          this.userInfo = await islogin();
        } else {
          logoutook();
          return;
        }
      },
      getactions(page) {
        var that = this;
        setTimeout(function () {
          that.action = {};
          jQuery.ajax({
            type: 'get',
            url: '/rank',
            data: {
              page: page,
            },
            success: function (res) {
              that.action = res;
              console.log(res);
              
            }
          })
        })
      },
      geta(page) {
        if (page > this.action.pages) {
          this.action.page = this.action.pages;
          return;
        } else if (page <= 0) {
          this.action.page = 1;
          return;
        } else {
          this.getactions(page);
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
    },
    created() {
      this.getUserInfo();
      this.getactions(1);
    }
  })

})