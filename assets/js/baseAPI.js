//AjaxPrefilter function wil be invoked before $.get() or $.post() or $.ajax().

$.ajaxPrefilter(function (options) {
    //Before sending the ajax requests, concatenate the url with the same root path.
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    //Before sending the ajax requests, set headers for limited API
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    };
})