/**
 * Created by Daunt on 8/25/2016.
 */
$(document).ready(function() {
    $('body').addClass('over');
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.addEventListener("click", function(e){
            if (this.getAttribute('href').substring(0,1) != '#'){
                if (e.which === 2){
                }else {
                    // $('body').removeClass('loaded');
                    // $('body').addClass('over');
                }
            }else{
                e.preventDefault();
            }
        })

    }

    // $("a").click(function() {
    //         $('body').removeClass('loaded');
    //         $('body').addClass('over');
    // });
});
$(window).load(function() {
    setTimeout(function(){
        $('body').addClass('loaded');
    }, 0);
    setTimeout(function(){
        $('body').removeClass('over');
    }, 1500);
});
