$(document).ready(function() {
    $('#header #tnb a.all-menu').on('click', function() {
       /*$(this).css({'background-image': 'url(../img/search_close.png)'});*/
       $('div.mobile-header').toggleClass('show');
       $('div.mobile-header .inner').css({'margin-right': 0});
       /*$('#header #tnb a.all-menu').addClass('on');*/
        
       $('div.mobile-header .inner .binds ul.nav li a').on('click', function() {
           $(this).next().toggleClass('show');
           $('div.mobile-header .inner .binds ul.nav li a').removeClass('on');
           $(this).addClass('on');
       });
    });
});