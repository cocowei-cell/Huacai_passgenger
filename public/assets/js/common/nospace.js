function nospace(value,errmsg) {
  if(value.trim().length===0) {
    alert(errmsg);
    return false;
  }
  else {
    return true;
  }
}