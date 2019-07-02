var MODAL = {
    selector: document,
    close: true,
    onsubmit:function (boolean, modal) {
        $(selector).on('beforeSubmit', function (e) {
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
            // $(".modal-dialog").draggable({
            //     handle: ".modal-header"
            // });
            $(modal).modal('show');
            $(modal).appendTo('body');
            $(modal).find('.modal-title').text($(this).attr('data-modal-title'));
            $('.tooltip.fade.left.in').remove();
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
                $(this).appendTo($(object).parent()[0]);
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