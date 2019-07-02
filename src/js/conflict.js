/**
 * Created by Daunt on 30/04/2017.
 */

var conflict = [];
conflict.init = function(){
    // var bsTooltip = $.fn.tooltip.noConflict();
    // var bootstrapButton = $.fn.button.noConflict();
    // $.fn.bootstrapBtn = bootstrapButton;
    $('[data-toggle="tooltip"]').tooltip({
        trigger : 'hover',
        track: true,
        "html": true,
        "container": "body"
    });
    $('[data-toggle-title="tooltip"]').tooltip({
        trigger : 'hover',
        track: true,
        "html": true,
        "container": "body"
    }).on('mouseleave', function () {
        $('.tooltip.fade.in').remove();
    });
    $("[data-toggle='popover']").popover({
        track: true,
        "html": true,
        trigger: "hover focus",
        "container": "body"
    }).on('mouseleave', function () {
        $('.popover.fade.in').remove();
    });
};
conflict.init();
$.widget.bridge('uibutton', $.ui.button);
