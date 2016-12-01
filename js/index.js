$(function() {
    var duration = 12000;

    $("#title-content").animate({
        top: '-100%'
    }, duration, 'linear', function() {
        $('#menu').fadeIn();
    });

    $('body').animate({
        'background-size': '120%'
    }, duration, 'linear')
});