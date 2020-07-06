$(document).ready(function() {
    /*a 태그 기본 이벤트 방지*/
    preventDefaultAnchor();
    function preventDefaultAnchor() {
        $(document).on('click', 'a[href="#"]', function(e) {
            e.preventDefault();
        });
    }
    
    /*header*/
    $('#header #gnb ul.menu li').on('mouseenter focusin', function() {
        $('#header').addClass('active');
        $('#header #gnb').addClass('on');
        $('#header #gnb ul.menu').addClass('on');
        $('#header #gnb #blind').addClass('show');
        $('#header #gnb ul.menu li ul.menu-sub').css({'display': 'block'});
        $(this).children().addClass('on');
    });
    $('#header #gnb ul.menu li').on('mouseleave focusout', function() {
        $('#header #gnb').removeClass('on');
        $('#header').removeClass('active');
        $(this).children().removeClass('on');
        $('#header #gnb ul.menu').on('mouseleave', function() {
            $('#header #gnb ul.menu').removeClass('on');
            $('#header #gnb ul.menu li ul.menu-sub').css({'display': 'none'});
            $('#header #gnb #blind').removeClass('show');
        });
    });
    
    $('#header #tnb').on('mouseenter focusin', function() {
        $('#header').removeClass('active');
        $('#header #gnb').removeClass('on');
        $('#header #gnb #blind').removeClass('show');
        $('#header #gnb ul.menu').removeClass('on');
        $(this).children().removeClass('on');       
        $('#header #gnb ul.menu li ul.menu-sub').css({'display': 'none'});
    });
    
    $('#header #tnb a.search-btn-open').on('click', function() {
        $('#header div.search').toggleClass('on');
        $(this).toggleClass('click');
    });
    
    /* mobile-header */
    $('#header #tnb a.all-menu').on('click', function() {
       $('div.mobile-header').toggleClass('show');
       $('div.mobile-header .inner').css({'margin-right': 0});        
       $('div.mobile-header .inner .binds ul.nav li a').on('click', function() {
           $(this).next().toggleClass('show');
           $('div.mobile-header .inner .binds ul.nav li a').removeClass('on');
           $(this).addClass('on');
       });
    });
    
    /*footer*/
    $('#footer div.site:eq(0) > a').on('click focusin', function() {
        $('#footer div.site ul:eq(0)').toggleClass('open');
    });
    $('#footer div.site:eq(1) > a').on('click focusin', function() {
        $('#footer div.site ul:eq(1)').toggleClass('open');
    });
    
    /*main-slider*/
    var numSlide = $('.main .slider .move ul li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var timerId = '';
    var isTimerOn = true;
    var timerSpeed = 3000;
    
    /*타이머가 켜져있으면 정지버튼으로 바꿈*/
    if (isTimerOn === true) {
        $('.main .slider .control a.btn-play').addClass('on');
    } else {
        $('.main .slider .control a.btn-play').removeClass('on');
    }
    
    showSlide(1);
    
    $('.main .slider .control a.btn-play').on('click', function() {
        //타이머가 켜져있으면 끄고, 꺼져있으면 켜는 동작
        if (isTimerOn === true) {
            clearTimeout(timerId);
            $(this).removeClass('on');
            isTimerOn = false;
        } else {
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
            $(this).addClass('on');
            isTimerOn = true;
        }
    });
    
    $('.main .slider .control ul li a').on('click', function() {
        var index = $('.main .slider .control ul li').index($(this).parent());
        $('.main .slider .control ul li a').removeClass('on');
        $(this).addClass('on');
        $('.main .slider .move ul li').removeClass('on');
        $('.main .slider .move ul li:eq(' + index + ')').addClass('on');
        showSlide(index + 1);
    });
    
    function showSlide(n) {
        clearTimeout(timerId); //timer의 시간이 0으로 바뀌는 효과
        $('.main .slider .control ul li a').removeClass('on');
        $('.main .slider .control ul li a:eq(' + (n - 1) + ')').addClass('on');
        $('.main .slider .move ul li').removeClass('on');
        $('.main .slider .move ul li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slidePrev = (n <= 1) ? numSlide : (n - 1);
        slideNext = (n >= numSlide) ? 1 : (n + 1);

        /*재귀의 형태이므로 setInterval대신 setTimeout으로 써도 계속 작동함*/
        if (isTimerOn === true) {
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
        }
    }
    
    /*k-water, news 팝업존*/
    setImageSlide('.k-water .layout > ul > li.popup-zone', 1, true, 3000);
    setImageSlide('.news .layout div.pop-ul div.popupzone', 1, true, 3000);
    
    function setImageSlide(selector, first, status, speed) {
        var numSlide = $(selector).find('div.move ul li').length;
        var slideNow = 0;
        var slidePrev = 0;
        var slideNext = 0;
        var slideFirst = first;
        var timerId = null;
        var isTimerOn = status;
        var timerSpeed = speed;
        var isClickAllowed = true;
        var onAnimation = false;

        showSlide(slideFirst, 'change');

        $(selector).find('div.control a.btn-left').on('click', function() {
            $(this).find('img').stop(true).animate({'left': '-10px'}, 50).animate({'left': 0}, 100);
            showSlide(slidePrev, 'prev');
        });
        $(selector).find('div.control a.btn-right').on('click', function() {
            $(this).find('img').stop(true).animate({'right': '-10px'}, 50).animate({'right': 0}, 100);
            showSlide(slideNext, 'next');
        });
        $(selector).find('div.control a.btn-stop').on('click', function() {
            clearTimeout(timerId);
            $(this).css({'display': 'none'});
            $(selector).find('div.control a.btn-play').css({'display': 'inline-block'});
            isTimerOn = false;
        });
        $(selector).find('div.control a.btn-play').on('click', function() {
            timerId = setTimeout(function() {showSlide(slideNext, 'next');}, timerSpeed);
            $(this).css({'display': 'none'});
            $(selector).find('div.control a.btn-stop').css({'display': 'inline-block'});
            isTimerOn = true;
        });
        
        function showSlide(n, direction) {
            if (onAnimation === true) return false;
            clearTimeout(timerId);
            
            if (direction === 'change') {
                resetSlide(n);
            } else {
                var offsetLeft = 0;
                if (direction === 'prev') {
                    offsetLeft = 100;
                } else if (direction === 'next') {
                    offsetLeft = -100;
                } else {
                    offsetLeft = 0;
                }
                onAnimation = true;
                $(selector).find('div.move ul').css({'transition': 'left 0.3s', 'left': offsetLeft + '%'}).one('transitionend', function() {
                    resetSlide(n);
                    onAnimation = false;
                });
            }
            if (isTimerOn === true) {
                timerId = setTimeout(function() {showSlide(slideNext, 'next');}, timerSpeed);
            }
        }

        function resetSlide(n) {
            slideNow = n;
            slidePrev = (n <= 1) ? numSlide : (n - 1);
            slideNext = (n >= numSlide) ? 1 : (n + 1);
            $(selector).find('div.control span.count').text(slideNow + ' / ' + numSlide);
            $(selector).find('div.move ul').css({'transition': 'none', 'left': 0});
            $(selector).find('div.move ul li').css({'left': 0, 'display': 'none'});
            $(selector).find('div.move ul li:eq(' + (slideNow - 1) + ')').css({'left': 0, 'display': 'block'});
            $(selector).find('div.move ul li:eq(' + (slidePrev - 1) + ')').css({'left': '100%', 'display': 'none'});
            $(selector).find('div.move ul li:eq(' + (slideNext - 1) + ')').css({'left': '-100%', 'display': 'none'});
        }
    }
});