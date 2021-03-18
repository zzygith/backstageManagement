$(function () {

    //define the login and register regular expression
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,}$/
            , 'Password must be at least 6 characters, no spaces.'
        ],
        newpwd: function (value) {
            let oldpwd = $('.layui-form-item [name=oldPwd]').val();
            if (oldpwd == value) {
                return "New password can't be the same as the old one."
            }
        },
        repwd: function (value) {
            let newpwd = $('.layui-form-item [name=newPwd]').val();
            if (newpwd != value) {
                return 'The two passwords you typed do not match.'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status == 1) {
                    return layer.msg('Original password is wrong');
                }
                layer.msg('Reset password sunccessfully');
                $('.layui-form')[0].reset();
            }
        })

    })


})


