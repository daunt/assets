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
