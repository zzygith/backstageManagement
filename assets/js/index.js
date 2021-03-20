$(function () {
    getUserInfo();
    //Clear token and skip to login.html when 'sign out' button is clicked.
    $('#btnLogout').on('click', function () {
        layer.confirm('Sign out rightnow?', { icon: 3, title: 'Info', btn: ['Yes', 'Cancel'] }, function () {
            localStorage.removeItem('token');
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
                return layer.msg('Failed to get user information')
            }
            renderAvatar(res.data);
        }
    })
}
//Render avatar of user
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('welcome&nbsp;&nbsp' + name);
    //Take the first letter of name as avatar
    let first = name[0].toUpperCase();
    $('.avatar').html(first);

}