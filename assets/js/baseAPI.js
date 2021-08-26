//AjaxPrefilter function wil be invoked before $.get() or $.post() or $.ajax().

$.ajaxPrefilter(function (options) {
    //Before sending the ajax requests, concatenate the url with the same root path.
    /*     options.url = "https://sleepy-journey-65673.herokuapp.com/"+'http://www.liulongbin.top:3007' + options.url; */
/*     options.url = 'http://www.liulongbin.top:3007' + options.url; */
          options.url = 'http://127.0.0.1:3007' + options.url; 
    //Before sending the ajax requests, set headers for limited API
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    };
    //If failed to login, then skip to login.html
    options.complete = function (res) {
  /*       console.log(res.responseJSON.message); */
        if (res.responseJSON.status === 1 && res.responseJSON.message === "Fail to verify ID.") {
            //clear token
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})