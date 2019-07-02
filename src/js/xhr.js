/*
 * XHR
 * -----------------------
 */
var XHR = {
    ajax:{
        selector: document,
        start: function (handler) {
          /*
          * handler
          * Type: Function()
          * The function to be invoked.
          */
          return $(this.selector).ajaxStart(handler);
        },
        send: function (handler) {
          /*
          * handler
          * Type: Function( Event event, jqXHR jqXHR, PlainObject ajaxOptions )
          * The function to be invoked.
          */
          return $(this.selector).ajaxSend(handler);
        },
        stop: function (handler) {
          /*
          * handler
          * Type: Function()
          * The function to be invoked.
          */
          return $(this.selector).ajaxStop(handler);
        },
        success: function (handler) {
          /*
          * handler
          * Type: Function( Event event, jqXHR jqXHR, PlainObject ajaxOptions, PlainObject data )
          * The function to be invoked.
          */
          return $(this.selector).ajaxSuccess(handler);
        },
        error: function (handler) {
          /*
          * handler
          * Type: Function( Event event, jqXHR jqXHR, PlainObject ajaxSettings, String thrownError )
          * The function to be invoked.
          */
          return $(this.selector).ajaxComplete(handler);
        },
        complete: function (handler) {
          /*
          * handler
          * Type: Function( Event event, jqXHR jqXHR, PlainObject ajaxOptions )
          * The function to be invoked.
          */
          return $(this.selector).ajaxComplete(handler);
        }
    },
    pjax:{
        selector: document,
        click: function (handler) {
            /*
            * fires from a link that got activated; cancel to prevent pjax
            */
            $(this.selector).on('pjax:click', handler);
        },
        beforeSend: function (handler) {
            /*
            * can set XHR headers
            */
            $(this.selector).on('pjax:beforeSend', handler);
        },
        start: function (handler) {
            $(this.selector).on('pjax:start', handler);
        },
        send: function (handler) {
            $(this.selector).on('pjax:send', handler);
        },
        clicked: function (handler) {
            /*
            * fires after pjax has started from a link that got clicked
            */
            $(this.selector).on('pjax:clicked', handler);
        },
        beforeReplace: function (handler) {
            /*
            * before replacing HTML with content loaded from the server
            */
            $(this.selector).on('pjax:beforeReplace', handler);
        },
        success: function (handler) {
            /*
            * after replacing HTML content loaded from the server
            */
            $(this.selector).on('pjax:success', handler);
        },
        timeout: function (handler) {
            /*
            * fires after options.timeout; will hard refresh unless canceled
            */
            $(this.selector).on('pjax:timeout', handler);
        },
        error: function (handler) {
            /*
            * on ajax error; will hard refresh unless canceled
            */
            $(this.selector).on('pjax:error', handler);
        },
        complete: function (handler) {
            /*
            * always fires after ajax, regardless of result
            */
            $(this.selector).on('pjax:complete', handler);
        },
        end: function (handler) {
            /*
            * after replacing content
            */
            $(this.selector).on('pjax:end', handler);
        },
        popstate: function (handler) {
            /*
            * event direction property: "back"/"forward"
            */
            $(this.selector).on('pjax:popstate', handler);
        },
        reload: function (container, url) {
            $.pjax.reload({container: container, url : url, pushRedirect: false, push: false, replace: false});
        }
    }
};

/*
 * AJAX
 * -----------------------
 */
var ajax = XHR.ajax;
ajax.start(function () {
    // PRELOAD.attach('.preload');
    NProgress.start();
});
ajax.stop(function () {
    // conflict.init();
    // PRELOAD.detach('.preload');
    if (NProgress.done()){
            $('div[data-toggle="multilang"]').not('.in').hide();
            // $(".content-wrapper").removeClass("back");
    }
});

/*
 * PJAX
 * -----------------------
 */
var pjax = XHR.pjax;

pjax.send(function (xhr,options) {
    // PRELOAD.attach('.preload');
    NProgress.start();
    if ("undefined" !== typeof tinymce) {
        tinymce.remove();
    }
});


pjax.timeout(function (event) {
    event.preventDefault();
});

pjax.complete(function () {
    // conflict.init();
    // PRELOAD.detach('.preload');
    if (NProgress.done()){
        $('div[data-toggle="multilang"]').not('.in').hide();
        // $(".content-wrapper").removeClass("back");
    }
    if ("undefined" !== typeof media && typeof media.init === 'function') {
        media.init();
    }
});

pjax.end(function () {

    /* if ("undefined" !== typeof tinymce) {
            tinymce.init({selector:'textarea'});
        }*/
});