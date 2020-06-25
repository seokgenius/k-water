$(document).ready(function() {
    /*header*/
    $('#header #gnb ul.menu li').on('mouseenter', function() {
        $('#header #gnb ul.menu li ul.menu-sub').addClass('on');
    });
    $('#header #gnb ul.menu li').on('mouseleave', function() {
        $('#header #gnb ul.menu li ul.menu-sub').removeClass('on');
    });
    
    $('#header #tnb a.search-btn-open').on('click', function() {
        $('#header div.search').toggleClass('on');
        $(this).toggleClass('click');
    });
    
    /*footer*/
    $('#footer div.site:eq(0) > a').on('click', function() {
        $('#footer div.site ul:eq(0)').toggleClass('open');
    });
    $('#footer div.site:eq(1) > a').on('click', function() {
        $('#footer div.site ul:eq(1)').toggleClass('open');
    });
    
    /*side-nav*/
    $('#side-nav ul li a').on('click', function() {
        var index = $(this).parent().index();
        $('#side-nav ul li a').removeClass('active');
        $(this).addClass('active');
    });
    
    /*main-slider*/
    
    //슬라이드 변수 정의
    var numSlide = $('.main .slider .move ul li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    //타이머 변수
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
});