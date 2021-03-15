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




})

