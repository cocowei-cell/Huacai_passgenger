function getURL(name) {
  var str = location.search;
  str = str.substr(1);
  var arr = str.split('&');
  var newArr;
  arr.some(function (value) {
    if (value.split('=')[0] == name) {
      newArr = value.split('=')[1];
      return false;
    }
  })
  return newArr;
}