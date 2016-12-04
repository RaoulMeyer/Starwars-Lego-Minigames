$(function() {
    var body = $('body');
    if (body.hasClass('intro')) {
        var duration = 12000;

        $('#title-content').animate({
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

    if (body.hasClass('loading')) {
        var fetched = 0;

        var urls = [
            './audio/flappy.mp3',
            './audio/intro.mp3',
            './audio/menu.mp3',
            './audio/pacman.mp3',
            './audio/spaceinvaders.mp3',
            './audio/victory.mp3',
            './img/falcon.png',
            './img/r2d2.png',
            './img/stars.png',
            './img/xwing.png',
            './flappy/img/background.png',
            './flappy/img/ship.png',
            './flappy/img/wall.png',
            './pacman/sound/die.mp3',
            './pacman/sound/eat-fruit.mp3',
            './pacman/sound/eat-ghost.mp3',
            './pacman/sound/eat-pill.mp3',
            './pacman/sound/eating.mp3',
            './pacman/sound/extra-life.mp3',
            './pacman/sound/ghost-eaten.mp3',
            './pacman/sound/ready.mp3',
            './pacman/sound/siren.mp3',
            './pacman/sound/waza.mp3'
        ];

        for (var i = 0; i < urls.length; i++) {
            $.get(urls[i]).done(function () {
                fetched++;
                $('#loading-inner').animate({
                    'width': 100 - 100 * fetched / urls.length + '%'
                }, 100, null, function() {
                    if (fetched >= urls.length) {
                        setTimeout(function() { $('#index-link').click(); }, 1000);
                    }
                });
            });
        }
    }

    $('#transition').fadeOut(1000);
    $('a').click(function (e) {
        e.preventDefault();

        var href = $(this).attr('href');
        $('#transition').fadeIn(1000);
        $('audio').animate({volume: 0}, 1000);
        setTimeout(function() {window.location = href}, 1200);

        return false;
    });

});