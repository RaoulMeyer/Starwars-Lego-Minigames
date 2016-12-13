$(function() {
    var body = $('body');
    if (body.hasClass('intro')) {
        var duration = 45000;

        $('#title-content').animate({
            top: '-50%'
        }, duration, 'linear', function () {
            $('#start-button').click();
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
        if (window.location.href.indexOf('?') > 0) {
            href += '?' + window.location.href.slice(window.location.href.indexOf('?') + 1);
        }

        $('#transition').fadeIn(1000);
        $('audio').animate({volume: 0}, 1000);
        setTimeout(function() {window.location = href}, 1200);

        return false;
    });

});

function won(part) {
    var params = getUrlVars();

    if (params.hasOwnProperty('token')) {
        $.get("/won.php", { token: params['token'], part: part } );
        setTimeout(function() { $('#back-button').click() }, 1000);
    }
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
