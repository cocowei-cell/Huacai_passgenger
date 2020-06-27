
$(function () {
  //Jquery代码和vue代码分开，防止造成dom渲染出错
  $(function () {
    var detail = jQuery('.detail');
    jQuery('.detail').mouseenter(function () {
      jQuery(this).css('cursor', 'move')
    })
    jQuery('.detail').mousedown(function (tar) {
      var lefts = detail.offset().left;
      var tops = detail.offset().top;
      var relativeX = tar.pageX - lefts;
      var relativeY = tar.pageY - tops;
      jQuery(document).mousemove(function (e) {
        var left1 = e.pageX - relativeX + $('.detail').innerWidth()/2;
        var top1 = e.pageY - relativeY;
        detail.css({
          left: left1,
          top: top1
        })
      })
    })
    jQuery('.detail').mouseup(function () {
      jQuery(document).off('mousemove');
    })
  })
  var app1 = new Vue({
    el: '#app',
    data: {
      userInfo: {},
      statue: 0,
      action: {},
      bar: {},
      isShow: false
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
      getactions(page, state) {
        var that = this;
        setTimeout(function () {
          that.action = {};
          jQuery.ajax({
            type: 'get',
            url: '/getall',
            data: {
              page: page,
              state: state
            },
            success: function (res) {
              that.action = res;
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
          this.getactions(page, this.statue);
        }
      },
      filters(page) {
        this.getactions(page, this.statue);
      },
      deletes(id) {
        var tagd = confirm('您确定删除该志愿行为吗？');
        if (tagd) {
          jQuery.ajax({
            type: 'delete',
            url: '/deleteact/' + id,
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
      showInfo(target) {
        var that = this;
        this.isShow = true;
        $.ajax({
          type: 'get',
          url: '/getbyid/' + target,
          success: function (res) {
            that.bar = res;
            console.log(res);
          }
        })
      },
      pass(id, user) {
        $.ajax({
          type: 'put',
          url: '/updates/' + id + '-' + user,
          success: function (res) {
            location.reload();
          }
        })
      }
    },
    created() {
      this.getUserInfo();
      this.getactions(1, 0);
    }
  })

})

