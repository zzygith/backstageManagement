$(function () {
    //click "sign up"
    $('#link_reg').on('click', function () {
        $('.signinBox').hide();
        $('.registerBox').show();
    })

    //click "sign in"
    $('#link_login').on('click', function () {
        $('.registerBox').hide();
        $('.signinBox').show();

    })


    //define the login and register regular expression
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,}$/
            , 'Password must be at least 6 characters, no spaces.'
        ],
        repwd: function (value) {
            let pwd = $('.registerBox [name=password]').val();
            if (pwd != value) {
                return 'The two passwords you typed do not match.'
            }
        }
    })

    //listen for the submission of register form
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('Register successfully')
                $('.registerBox').hide();
                $('.signinBox').show();
            }
        )
    })

    //listen for the submission of login form
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('Failded to login')
                }
                layer.msg('Login successfully');
                //store the token string to localStorage
                localStorage.setItem('token', res.token);
                //go to backstage page
                location.href = '/index.html';
            }


        })

    })
})

