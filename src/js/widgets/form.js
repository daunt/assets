var FORM = {
    selector: 'form',
    modalPjax: '#modal-pjax-',
    beforeSubmit: function (selector, modalPjax, e) {
        $(selector).on('beforeSubmit', function (e) {
            e.preventDefault();
            var $form = $(this);
            $.post(
                $form.attr("action"),
                $form.serialize()
            )
                .done(function (result) {
                    if($(modalPjax).attr("close") != 'false'){
                        $(modalPjax).modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $('#dial').dialog('close');
                    }
                    if ($(modalPjax).attr("onclose") == 'false' || $(modalPjax).attr("close") == 'false'){
                        XHR.pjax.reload($form.attr("pjax"), $form.attr("redirect"));
                    }
                    if ($form.attr('except')  == typeof undefined && $form.attr('except') == false) {
                        $form.attr('except', '');
                    }
                    $form.find('input, select, textarea').not($form.attr('except')).val(null).trigger('change');
                    // $form.trigger('reset');
                    // $form.find('select').val(null).trigger('change');
                });
            return false;
        });
    }
};
