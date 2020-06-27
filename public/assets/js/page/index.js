
$(function () {
    //公共变量
    var first;
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
    //Vue挂载整个容器
    new Vue({
        el: '#app',
        data: {
            userInfo: {},
            show: false,
            bannerImg: [],
            recommend: []
        },
        //方法
        methods: {
            async getUserInfo1() {
                var start = getURL('start');
                if (await islogin()) {
                    this.userInfo = await islogin();
                    if (this.userInfo.role === 'admin') {
                        location.href = '/admin/index.html';
                    }
                    this.show = true;
                } else {
                    logoutook();
                    return;
                };
            },
            logout() {
                $.ajax({
                    type: 'post',
                    url: '/logout',
                    success: function () {
                        logoutook();
                        location.reload();
                    }
                })
            },
            url(item) {
                return 'article.html?id=' + item._id;
            }
        },
        // computed: {

        // },
        created() {
            this.getUserInfo1();
            var that = this;
            $.ajax({
                url: '/getimg',
                type: 'get',
                success: function (res) {
                    that.bannerImg = res;
                }
            });
            $.ajax({
                url: '/getimgand',
                type: 'get',
                success: function (res) {
                   
                    that.recommend = res;
                    setTimeout(function () {
                        // 设置延迟执行，将此函数执行放在dom渲染之后
	 layui.use('carousel', function () {
                        var carousel = layui.carousel;
                        //建造实例
                        carousel.render({
                            elem: '#test1'
                            , width: '100%' //设置容器宽度
                            , arrow: 'hover' //箭头显示方式
                            //,anim: 'updown' //切换动画方式
                        });
                    });
                        var width = 1269.3;
                        var width2 = Math.ceil($('#slider li').length / 5) * width;
                        var leftPosition = 0;
                        var page = $('#page');
                        var totalPage = Math.ceil($('#slider li').length / 5);
                        var currentPage = 1;
                        page.html(currentPage + '/' + totalPage);
                        $('#slider').css('width', width2);
                        $('.before').click(function () {
                            if (Math.floor(leftPosition) === 0) {
                                $('#slider').stop().animate({
                                    left: -(width2 - width)
                                })
                                leftPosition = -width2 + width;
                                console.log(leftPosition);
                                currentPage = totalPage;
                                page.html(currentPage + '/' + totalPage);
                                return;

                            }
                            leftPosition += width;
                            $('#slider').stop().animate({
                                left: leftPosition
                            })
                            currentPage--;
                            page.html(currentPage + '/' + totalPage);
                        })
                        $('.after').click(function () {
                            if (leftPosition.toFixed(1) === (-width2 + width).toFixed(1)) {
                                console.log(leftPosition);
                                $('#slider').stop().animate({
                                    left: 0
                                })
                                leftPosition = 0;
                                currentPage = 1;
                                page.html(currentPage + '/' + totalPage);
                                return;
                            }
                            leftPosition -= width;
                            $('#slider').stop().animate({
                                left: leftPosition
                            })
                            currentPage++;
                            page.html(currentPage + '/' + totalPage);
                        })
                        function floatE(ele) {
                            for (var i = 0; i < $(ele).length; i++) {
                                if (i % 5 === 0) {
                                    $(ele)[i].className = 'spec';
                                }
                            }
                        }
                        //解决li的外边距问题
                        floatE('.recommend ul>li');
                    })
                }
            });
        },
    })


    // layui配置
    layui.use('element', function () {
        var element = layui.element;
        //监听导航点击
        element.on('nav(demo)', function (elem) {
            //console.log(elem)
            layer.msg(elem.text());
        });
    });


    //end-----


    //JQuery代码
    var login = $('.login');
    $('#login,#navLogin').on('click', function () {
        $('.allModel').show();
        login.show();
    })
    $('#close').on('click', function () {
        login.hide();
        $('.allModel').hide();
    })



    // 用户记住密码
    // 检测是否被选中
    var emailRegx = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;  //邮箱验证正则
    var error = $('.error');
    var tagEmail = true; //是否邮箱验证正确
    $('#email').on('input', function () {
        if ($(this).val().trim().length === 0) {   //如果没有内容为真
            tagEmail = true;
            $(this).removeClass('errorIn');
            error.html('');
        }
        else {
            if (emailRegx.test($(this).val()) == false) {
                $(this).addClass('errorIn');
                error.html('*邮箱不符合规则*');
                tagEmail = false;  //不符合为假
            } else {
                tagEmail = true;
                $(this).removeClass('errorIn');
                error.html('')
            }
        }
    })

    $('#password').on('input', function () {
        $(this).removeClass('errorIn');
        error.html('');
    })
    //获取本地存储
    if (localStorage.getItem('UseremailNCWU') && localStorage.getItem('UserPassNCWU')) {
        $('#email').val(localStorage.getItem('UseremailNCWU'));
        $('#password').val(localStorage.getItem('UserPassNCWU'));
        $('#checkbox').prop('checked', true);
    }
    //提交表单到服务器

    $('#btnLogin').on('click', function () {
        if (tagEmail == false) {
            $('#email').focus();
            return false;
        };                  //邮箱格式不正确 阻止提交信息
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();
        if (email.length === 0) {
            $('#email').addClass('errorIn').focus();  //如果没有输入邮箱自动聚焦
            error.html('*请输入您的邮箱*');
            return false;
        }
        if (password.length === 0) {
            $('#password').addClass('errorIn').focus();  //密码自动聚焦
            error.html('*请输入您的密码*');
            return false;
        }
        //保存密码和账号信息
        var isSel = $('#checkbox').prop('checked');
        if (isSel === true) {
            localStorage.setItem('UseremailNCWU', email);
            localStorage.setItem('UserPassNCWU', password);
        } else {
            localStorage.removeItem('UseremailNCWU');
            localStorage.removeItem('UserPassNCWU');
        }
        $.ajax({
            url: '/login',
            type: 'post',
            data: {
                email: email,
                password: password
            },
            success: function (res) {
                settoken();
                location.reload();
            },
            error: function (res) {
                $('#email').addClass('errorIn').focus();  //如果没有输入邮箱自动聚焦
                console.log(res.responseText);
                error.html(JSON.parse(res.responseText).msg);
            }
        })
        //Ajax请求
        //阻止默认行为
        return false;
    })
})

//end----