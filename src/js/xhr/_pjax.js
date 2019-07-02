/**
 * Created by Daunt on 22/04/2017.
 */
var pjax = XHR.pjax;
pjax.send(function (xhr,options) {
    NProgress.start();
    if ("undefined" !== typeof tinymce) {
        tinymce.remove();
    }
});


pjax.timeout(function (event) {
    NProgress.done();
    event.preventDefault()
});

pjax.complete(function () {
    conflict.init();
    if ("undefined" !== typeof media && typeof media.init === 'function') {
        media.init();
    }
    if (NProgress.done()){
        $('div[data-toggle="multilang"]').not('.in').hide();
        // $(".content-wrapper").removeClass("back");
    }
});

pjax.end(function () {
    /* if ("undefined" !== typeof tinymce) {
            tinymce.init({selector:'textarea'});
        }*/
});
