$(document).ready(function () {

  new Vue({
    el: '#app',
    data: {
      pictureurl: '',
      college: []
    },
    methods: {
      pic() {
        var fields = document.getElementById('pics').files[0];
        if (!fields.type.includes('image')) {
          alert('请上传图片文件');
          return;
        }
        if (fields.size >= 2 * 1024 * 1024) {
          alert('图片文件大于2M，请重新选择');
          return;
        }
        var form = new FormData();
        form.append('pics', fields);
        var that = this;
        $.ajax({
          url: '/uploads',
          type: 'post',
          contentType: false,
          processData: false,
          data: form,
          success: function (res) {
            that.pictureurl = res[0].pics
          }
        })
      }
    },
    created() {
      var that = this;
      $.ajax({
        type: 'get',
        url: '/getcollege',
        success: function (res) {
          that.college = res;
        }
      })
    }
  })



  $('button[type="submit"]').click(function (e) {
    e.preventDefault();
    var info = getFormInfo($('form').serialize());
    console.log(info);

    if (!nospace(info.name, '请输入您的名字')) {
      return;
    }
    if (!nospace(info.number, '请输入您的学号')) {
      return;
    }
    if (info.college == 0) {
      alert('请选择学院');
      return;
    }
    if (!nospace(info.telnumber, '请输入您的手机号码')) {
      return;
    }
    if (!nospace(info.action, '请输入您的行为描述')) {
      return;
    }
    if ($('textarea').val().trim().length > 100) {
      alert('请输入少于100个字符');
      return;
    }
    if (!nospace(info.picture, '请选择您的行为照片')) {
      return;
    }
    $.ajax({
      type: 'post',
      url: '/user/apply',
      beforeSend: function () {
        $('.info').stop().slideDown(200);
        $('.allModel').show();
      },
      data: $('form').serialize(),
      success: function (res) {
        console.log(res);
        $('.info').html('申请成功,2s后返回首页');
        setTimeout(function () {
          location.replace('/User/myaction.html'); //返回后需要重新通过报名入口就进入申请列表，而不是通过导航可以返回
        }, 2000)
      }
    })
  })
})