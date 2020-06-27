islogin().then(function (res) {
  if (res.role !== 'admin') {
    location.replace('/index.html');
  }
}).catch(function (err) {
  location.replace('/index.html');
}) 