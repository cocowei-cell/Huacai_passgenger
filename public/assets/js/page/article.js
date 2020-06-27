window.onload = function () {
  new Vue({
    el: '#app',
    data: {
      time: '',
      number: '',
      name: '',
      action: '',
      picture: '',
    },
    created() {
      var that = this;
      $.ajax({
        type: 'get',
        url: '/getbyid/' + getURL('id'),
        success(res) {
          that.number = res.user.number.trim();
          that.name = res.user.name.trim();
          that.action = res.action.trim();
          that.time = res.time.trim();
          that.picture = res.picture.trim();
        }
      })
    }
  })
}