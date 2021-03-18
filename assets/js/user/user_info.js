$(function () {
    initUserInfo();

})

//Initialize user basic information
function initUserInfo() {
    let form = layui.form;
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('Failed to get user information')
            }
            //Invoke form.val() to assign the form
            form.val('formUserInfo', res.data);
        }
    })

    //Listense for the form submission
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('Failed to edit information');
                }
                layer.msg('Edit information successfully');
                //Reset avatar and username of index.html
                window.parent.getUserInfo();
            }
        })
    })
}
$('#btnReset').on('click', function (e) {
    //Prevent default reset
    e.preventDefault();
    initUserInfo()
})
