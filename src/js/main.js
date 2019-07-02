/**
 * Created by Daunt on 8/25/2016.
 */
$(".lazy").lazyload({effect : "fadeIn"});
$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip();});
$('#home-index').on('pjax:send', function() {
    $('#loading').show();
    $('html, body').animate({scrollTop: $('#home-index').offset().top}, 1000);
});
$('#home-index').on('pjax:complete', function () {
    $('#loading').hide();
    $(".lazy").lazyload({effect: "fadeIn"});
    // $.pjax.reload({container: "#meta-tags", timeout: 5000});
    event.preventDefault();

});
$(function () {
    $('.login').click(function () {
        $('#modal-login').modal('show').find('#login-form').load($(this).attr('value'));
    });
});
$(document).ready(function() {
    $('.navbar a.dropdown-toggle').on('click', function(e) {
        var $el = $(this);
        var $parent = $(this).offsetParent(".dropdown-menu");
        $(this).parent("li").toggleClass('open');
        if(!$parent.parent().hasClass('nav')) {
            $el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 0});
        }
        $('.nav li.open').not($(this).parents("li")).removeClass("open");
        return false;
    });
    $(".affix-sidebar").affix({
        offset: {
            top: $(".top-bar").outerHeight(true)
                +$(".breadcrumb").outerHeight(true)
                // +$("#carousel-header").outerHeight(true)
                +$(".page-header").outerHeight(true)+20,
            bottom: $(".footer").outerHeight(true)} });
    $(window).scroll(function () {
        if ($(document).scrollTop() > 70) {
            $('nav').addClass('shrink');
        } else {
            $('nav').removeClass('shrink');
        }
        $('div.affix-sidebar.affix').width($('div.col-sm-4.sidebar').width());
    });
});
