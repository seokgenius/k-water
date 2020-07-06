// Common JS
$(document).ready(function(){
    preventDefaultAnchor();
    
    
});


function preventDefaultAnchor() {
    /*이벤트를 문서 전체로 위임*/
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });
}

