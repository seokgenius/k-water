$(document).ready(function (){
    setParallaxWithBar('.scroll-page');

    function setParallaxWithBar(selector) {
        var numPage = $(selector).length;
        var pageNow = 0;
        var pagePrev = 0;
        var pageNext = 0;
        var eventScroll = '';
        var onAnimation = false;
        
        eventScroll = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
        checkScroll();
        $(window).on('scroll resize', function() {
            checkScroll();
        });
    
        // 중하단 마우스 모양 클릭시 다음 섹션으로 넘어감
        $('#content div.scroll a').on('click', function() {
            showPage(pageNext);
        });
        
        // spyscroll
        $('#side-nav ul li a').on('click', function() {
            var index = $('#side-nav ul li').index($(this).parent());
            $('#side-nav ul li a').removeClass('active');
            $(this).addClass('active');
            showPage(index + 1);
        });

        // 마우스 휠 이벤트
        window.addEventListener(eventScroll, function(e) {
            e.preventDefault();
            if (onAnimation === true) return false;

            var delta = 0;
            if (eventScroll === 'mousewheel') {
                delta = e.wheelDelta / -120;
            } else {
                delta = e.detail / 3;
            }
            
            if (delta > 0) {
                showPage(pageNext);
            } else if (delta < 0) {
                showPage(pagePrev);
            }
        }, {passive: false});

        

        function checkScroll() {
            var scrollTop = $(document).scrollTop();
            var minScroll = 0;
            var maxScroll = 0;
            $(selector).each(function(i) {
                minScroll = $(this).offset().top - $(window).height() / 2;
                maxScroll = $(this).offset().top + $(window).height() / 2;
                if (scrollTop > minScroll && scrollTop <= maxScroll) {
                    var n = i + 1;
                    $('#side-nav ul li a').removeClass('active');
                    $('#side-nav ul li a:eq(' + (n - 1) + ')').addClass('active');
                    pageNow = n;
                    pagePrev = (n - 1) < 1 ? 1 : n - 1;
                    pageNext = (n + 1) > numPage ? numPage : n + 1;
                    return false;
                }
            });
        }

        function showPage(n) {
            if (pageNow === n) return false;
            var scrollAmt = $(selector).eq(n - 1).offset().top;
            onAnimation = true;
            $('html, body').stop(true).animate({'scrollTop': scrollAmt + 'px'}, 500, function() {
                onAnimation = false;
            });
        }
    } 
});