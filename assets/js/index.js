$(function () {

    getUserInfo();

    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('Sign out rightnow?', { icon: 3, title: '提示' }, function () {
            localStorage.removeItem('tikon');
            location.href = '/login.html';
            layer.close(index);
        })
    })

})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.msg('Failed to get user information')
            }
            console.log(res.data);
            renderAvatar(res.data);
        }
    })
}

//Render avatar of user
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('welcome&nbsp;&nbsp' + name);
    let first = name[0].toUpperCase();
    console.log(first);
    $('.avatar').html(first);

}