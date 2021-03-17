$(function () {
    let form = layui.form;

    initUserInfo();


})

//Initialize user basic information
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('Failed to get user information')
            }
            console.log(res);
        }
    })

}