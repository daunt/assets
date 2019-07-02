/*
 * PRELOAD
 * -----------------------
 */
var PRELOAD = {
    selector: document,
    overlay: $('<div class="overlay"><div class="fa fa-refresh fa-spin"></div><span style="font-size: 24px;">Please wait...</span></div>'),
    attach: function (object) {
        $(object).prepend(this.overlay);
        // console.log('attach:' + $('.overlay').length);
        return true;
    },
    detach: function (object) {
        if ($('.overlay').length >= 1){
            // console.log('detach:' + $('.overlay').length);
            $(object).find(this.overlay).remove();
            $('.overlay').remove();
        }
        return true;
    },
};

/*
 * FORM
 * -----------------------
 */
var FORM = {
    selector: 'form',
    modalPjax: '#modal-pjax-',
    beforeSubmit: function (selector, modalPjax, e) {
        $(selector).on('beforeSubmit', function (e) {
            e.preventDefault();
            // $('#product-content').val(Htme.content.get('.dragndropproduct-content'));
            var $form = $(this);
            $.post(
                $form.attr("action"),
                $form.serialize()
            )
                .done(function (result) {
                    if($(modalPjax).attr("close") !== 'false'){
                        $(modalPjax).modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('#dial').dialog('close');
                    }
                    if ($(modalPjax).attr("onclose") === 'false' || $(modalPjax).attr("close") === 'false'){
                        XHR.pjax.reload($form.attr("pjax"), $form.attr("redirect"));
                    }
                    if ($form.attr('except') === typeof undefined && $form.attr('except') === false) {
                        $form.attr('except', '');
                    }
                    if ($form.attr('data-clear') === undefined) {
                        $form.find('input, select, textarea').not($form.attr('except')).val(null).trigger('change');
                        $form.find('#transaction-quantity').val(1);
                    }

                    if ($form.attr('data-close') === 'update' || $form.attr('data-close') === 'true'){
                        $(modalPjax).modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('#dial').dialog('close');
                    }
                    // $form.trigger('reset');
                    // $form.find('select').val(null).trigger('change');

                    if (typeof $form.attr('data-wsend') !== 'undefined'){
                        notification = JSON.parse($form.attr('data-wsend'));
                        notification.notif.msg = $form.attr('data-msg');
                        notification = JSON.stringify(notification);
                        WS.event.onSend(notification);
                    }
                });
            return false;
        });
    }
};

/*
 * MODAL
 * -----------------------
 */
var MODAL = {
    selector: document,
    close: true,
    onsubmit:function (boolean, modal) {
        $(selector).on('beforeSubmit', function (e) {

            $('#product-content').val(Htme.content.get('.dragndropproduct-content'));


            var $form = $(this);

            $.post(
                $form.attr("action"),
                $form.serialize()
            )
                .done(function (result) {
                    XHR.pjax.reload($form.attr("pjax"), $form.attr("redirect"));
                    $(modalPjax).modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $('#dial').dialog('close');
                    $form.trigger('reset');
                    $form.find('select').val(null).trigger('change');
                });
            return false;
        });
    },
    onclick:function (clicker, modal) {
        $(clicker).click(function () {
            $(".modal-dialog").draggable({
                handle: ".modal-header"
            });
            $(modal).modal('show');
            $(modal).appendTo('body');
            $(modal).find('.modal-title').text($(this).attr('data-modal-title'));
            // $('.tooltip.fade.left.in').remove();
            // $('.popover.fade.right.in').remove();
        });
    },
    onstart:function (clicker, modal, object) {
        this.onclick(clicker, modal);
        this.event.show(modal);
        this.event.hidden(modal, object);
        this.pjax.complete(clicker, modal, object);
    },
    onclose:function (accept, modal, pjax, redirect) {
        if(accept == 'true'){
            $(modal).on('hidden.bs.modal', function (event) {
                XHR.pjax.reload(pjax, redirect);
            });
        }
    },
    event:{
        show: function (modal) {
            $(modal).on('show.bs.modal', function (event) {
                if($(this).data(this.id) === undefined){
                    $(this).data(this.id, $(this).parent());
                }
                // $(this).parent()
                // console.log($('.box-title').text());\
                // console.log(this);
                // $(this).find('.modal-title').text($('.box-title:first').text());
            });
        },
        shown: function (modal) {
            $(modal).on('shown.bs.modal', function (event) {
            });
        },
        hidden: function (modal, object) {
            $(modal).on('hidden.bs.modal', function (event) {
                $(this).appendTo($(this).data(this.id));
                // $(this).appendTo($(object).parent()[0]);
                $('.datetimepicker').remove();
                $('.tooltip.fade.left.in').remove();
            });
        },
        conflict: function () {
            $(MODAL.selector).on('hidden.bs.modal', function (event) {
                if ($('.modal:visible').length) {
                    $('body').addClass('modal-open');
                }
            });
        }
    },
    pjax:{
        complete: function (clicker, modal, object) {
            $(object).on('pjax:complete', function() {
                MODAL.onclick(clicker, modal);
            });
        }
    }

};
MODAL.event.conflict();

/*
 * TABS
 * -----------------------
 */
var TABS = {
    selector: document,
    init: function (selector) {
        this.active(selector);
        this.dblclick(selector);
        this.click(selector);
        $(selector+':first').click();
    },
    reload: function (selector) {
        if (!$('body').hasClass('modal-open')){
            url = $(selector).attr('data-url');
            target = $(selector).attr('data-target');
            $.get(url, function(data) {
                $(target).html(data);
            });
            $(selector).attr('data-loaded', true);
        }
    },
    click: function (selector) {
        $(selector).click(function(e) {
            if($(this).attr('data-loaded') == false){
                TABS.reload($(this));
            }
            $(this).tab('show');
            return false;
        });
    },
    dblclick: function (selector) {
        $(selector).dblclick(function(e){
            TABS.reload($(this));
            return false;
        });
    },
    active: function (selector) {
        $('.active'+selector).each(function(e) {
            if($(this).attr('data-loaded') == false){
                TABS.reload($(this));
            }
            $(this).tab('show');
            return false;
        });
    }
};
