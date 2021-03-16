//AjaxPrefilter function wil be invoked before $.get() or $.post() or $.ajax().
//Before sending the ajax requests, we concatenate the url with the same root path.
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})