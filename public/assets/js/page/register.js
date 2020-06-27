
$(function () {
  //用户交互
  var email = $('#email');
  var nickName = $('#nickName');
  var password = $('#password');
  var emailP = $('#emailError');
  var nickNameP = $('#nicknameError');
  var passwordP = $('#passError');
  var emailRegx = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;  //邮箱验证正则
  var passwordRegx = /^[a-zA-Z0-9]{6,16}$/  //密码验证规则
  //昵称验证规则 如果符合其一就不让其注册
  var nickNameRegx = /nima|fuck|mother|他吗的|特么的|你吗比|曹逼|曹比|智障|性爱|性交|啪啪|艹你吗|草拟吗|草你妈|艹|草拟妈|操你妈|日你吗|日你妈|rinima|我靠|去几把|B脸|吃屎|dad|xukun|nmsl|sml|尼玛|你妈逼|你妈B|几把|鸡巴|JB|bitch|婊子|蛆|废物|笨比|死吗玩意|gi/;
  var tagEmail = false;
  var tagNick = false;
  var tagPass = false;
  var emailValue,
    nickNameValue,
    passwordValue;
  email.on('input', function () {
    emailValue = $(this).val();
    if (emailValue.trim().length == 0) {
      emailP.html('邮箱');
      emailP.removeClass('errorP rightP');
      $(this).removeClass('errorIn rightIn');
    } else {
      if (emailRegx.test(emailValue) == true) {
        emailP.removeClass('errorP rightP');
        $(this).removeClass('errorIn rightIn');
        tagEmail = true;
        emailP.addClass('rightP');
        emailP.html('邮箱格式正确');
        $(this).addClass('rightIn');
      } else {
        emailP.removeClass('errorP rightP');
        $(this).removeClass('errorIn rightIn');
        tagEmail = false;
        emailP.addClass('errorP');
        emailP.html('*邮箱格式错误*');
        $(this).addClass('errorIn');
      }
    }
  })
  email.on('blur', function () {
    emailValue = $(this).val();
    if (tagEmail) {
      $.ajax({
        url: '/user/findUser',
        type: 'get',
        data: {
          email: emailValue
        },
        error: function () {
          emailP.removeClass('errorP rightP');
          email.removeClass('errorIn rightIn');
          tagEmail = false;
          emailP.addClass('errorP');
          emailP.html('*邮箱已存在*');
          email.addClass('errorIn');
        }

      })
    }
  })
  nickName.on('input', function () {
    nickNameValue = $(this).val();
    if (nickNameValue.trim().length < 2 || nickNameValue.trim().length > 6 && nickNameValue.trim().length) {
      tagNick = false;
      $(this).removeClass('errorIn rightIn');
      nickNameP.removeClass('errorP rightP');
      nickNameP.addClass('errorP');
      nickNameP.html('昵称不符合规则');
      $(this).addClass('errorIn');
    } else {
      if (nickNameRegx.test(nickNameValue) == true) {
        tagNick = false;
        $(this).removeClass('errorIn rightIn');
        nickNameP.removeClass('errorP rightP');
        nickNameP.addClass('errorP');
        nickNameP.html('*昵称含有非法字符*');
        $(this).addClass('errorIn');
      } else {
        tagNick = true;
        $(this).removeClass('errorIn rightIn');
        nickNameP.removeClass('errorP rightP');
        nickNameP.addClass('rightP');
        nickNameP.html('昵称格式正确');
        $(this).addClass('rightIn');
      }
    }
    if (nickNameValue.trim().length === 0) {
      nickNameP.removeClass('errorP rightP');
      nickNameP.html('昵称');
      $(this).removeClass('errorIn rightIn');
    }
  })

  password.on('input', function () {
    passwordValue = $(this).val();
    if (passwordRegx.test(passwordValue) === false) {
      tagPass = false;
      passwordP.removeClass('errorP rightP');
      $(this).removeClass('errorIn rightIn');
      passwordP.addClass('errorP');
      passwordP.html('*密码不符合规则*');
      $(this).addClass('errorIn');
    } else {
      tagPass = true;
      passwordP.removeClass('errorP rightP');
      $(this).removeClass('errorIn rightIn');
      passwordP.addClass('rightP');
      passwordP.html('密码符合要求');
      $(this).addClass('rightIn');
    }
    if (passwordValue.trim().length == 0) {
      passwordP.removeClass('errorP rightP');
      $(this).removeClass('errorIn rightIn');
      passwordP.html('密码');
    }
  })
  $('#btnRegister').on('click', function () {
    emailValue = email.val().trim();
    nickNameValue = nickName.val().trim();
    passwordValue = password.val().trim();
    if (!emailValue) {
      email.focus();
      email.addClass('errorIn');
      emailP.addClass('errorP');
      emailP.html('*请输入邮箱*');
      return false;
    }
    if (!nickNameValue) {
      nickName.focus();
      nickName.addClass('errorIn');
      nickNameP.addClass('errorP');
      nickNameP.html('*请输入昵称*');
      return false;
    }
    if (!passwordValue) {
      password.focus();
      password.addClass('errorIn');
      passwordP.addClass('errorP');
      passwordP.html('*请输入密码*');
      return false;
    }
    if (!tagPass || !tagNick || !tagEmail) {
      return false;
    }
    //AJax请求

    $.ajax({
      url: '/user/register',
      type: 'post',
      data: {
        nickName: nickNameValue,
        email: emailValue,
        password: passwordValue
      },
      success: function (res) {
        alert('注册成功啦，快去登陆吧！QAQ~');
        location.replace('/index.html');
      }
    })
    //SDA
    return false;
  })
})

// 注册


