//AjaxPrefilter function wil be invoked before $.get() or $.post() or $.ajax().

$.ajaxPrefilter(function (options) {
    //Before sending the ajax requests, concatenate the url with the same root path.
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    //Before sending the ajax requests, set headers for limited API
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    };
    //If failed to login, then skip to login.html
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //clear token
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})