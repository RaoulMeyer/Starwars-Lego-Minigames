$(function() {
    var body = $('body');
    if (body.hasClass('intro')) {
        var duration = 12000;

        $("#title-content").animate({
            top: '-100%'
        }, duration, 'linear', function () {
            $('#start-menu').fadeIn();
        });

        body.animate({
            'background-size': '120%'
        }, duration, 'linear');
    }

    if (body.hasClass('menu')) {
        $('#menu').show();

        $('li').click(function() {
            $(this).find('a').click();
        })
    }

    function transition(href) {
    }

    $("#transition").fadeOut(1000);
    $('a').click(function (e) {
        e.preventDefault();

        var href = $(this).attr('href');
        $("#transition").fadeIn(1000);
        setTimeout(function() {window.location = href}, 1200);

        return false;
    });

});