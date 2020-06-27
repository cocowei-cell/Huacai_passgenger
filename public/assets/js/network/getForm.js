function getFormInfo(info) {
  var arr = info.split('&');
  var infoObj = {};
  for (var item of arr) {
    infoObj[item.split('=')[0]] = item.split('=')[1];
  }
  return infoObj;
}