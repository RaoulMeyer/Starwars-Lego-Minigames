$(function () {
    var ws;
    var canvas = document.getElementById("canvas");
    var canvasContext = canvas.getContext("2d");
    var avatar = new Image();
    avatar.src = "img/ship.png";

    var background = new Image();
    background.src = "img/background.png";

    var wallImage = new Image();
    wallImage.src = 'img/wall.png';

    var FRAMERATE = 60;
    var HORIZONTAL_SPEED = 150;
    var offset = 0;
    var ownId = Math.floor(Math.random() * 10000);

    var birds = [];
    var obstacles = [];
    var finished = false;

    var ownBird = new Bird(ownId);
    ownBird.dead = true;
    birds.push(ownBird);

    function Bird(id) {
        this.x = 100;
        this.y = 100;
        this.xSpeed = HORIZONTAL_SPEED;
        this.ySpeed = 0;
        this.width = 100;
        this.height = 100;
        this.id = id;
        this.jump = function () {
            this.ySpeed = -400;
        };
        this.dead = false;
    }

    function Message(type) {
        this.type = type;
        this.id = ownId;
        this.y = null;
    }

    function Obstacle(x, gapY) {
        this.x = x;
        this.gapY = gapY;
        this.width = 50;
        this.gapSize = 190;
        this.near = function (bird) {
            return bird.x > this.x - 300 && bird.x < this.x + this.width + 300;
        };
        this.colliding = function (bird) {
            var radius = (bird.width / 2 + bird.height / 2) / 6;
            if (bird.x > this.x - radius && bird.x < this.x + this.width + radius) {
                if (bird.y - radius < this.gapY || bird.y + radius > this.gapY + this.gapSize) {
                    return true;
                } else {
                    var cornerDistances = [this.distance(bird, this.x, this.gapY),
                        this.distance(bird, this.x + this.width, this.gapY),
                        this.distance(bird, this.x, this.gapY + this.gapSize),
                        this.distance(bird, this.x + this.width, this.gapY + this.gapSize)];
                    var min = Math.min.apply(null, cornerDistances);
                    if (min < radius) {
                        return true;
                    }
                }
            }
            return false;
        };
        this.distance = function (bird, x, y) {
            return Math.sqrt((bird.x - x) * (bird.x - x) + (bird.y - y) * (bird.y - y));
        }
    }

    function WebSocketTest() {
        if ("WebSocket" in window) {
            ws = new WebSocket("ws://santa.tumma.nl:11111/");
            ws.onopen = function () {
                ws.send(JSON.stringify(new Message("getObstacles")));
                ws.send(JSON.stringify(new Message("start")));
            };
            ws.onmessage = function (evt) {
                var bird, index;
                var message = JSON.parse(evt.data);
                switch (message.type) {
                    case "start":
                        bird = findBirdById(message.id);
                        index = birds.indexOf(bird);
                        if (index > -1) {
                            birds.splice(index, 1);
                        }
                        bird = new Bird(message.id);
                        birds.push(bird);
                        break;
                    case "jump":
                        bird = findBirdById(message.id);
                        bird.y = message.y;
                        bird.jump();
                        break;
                    case "remove":
                        bird = findBirdById(message.id);
                        index = birds.indexOf(bird);
                        if (index > -1) {
                            birds.splice(index, 1);
                        }
                        break;
                    case "obstacles":
                        for (var i = 0; i < message.obstacles.length; i++) {
                            var obstacle = new Obstacle(400 + 300 * i, message.obstacles[i]);
                            obstacles.push(obstacle);
                        }
                }
            };
            ws.onclose = function () {
            };
        }
        else {
            // The browser doesn't support WebSocket
            alert("WebSocket NOT supported by your Browser!");
        }
    }

    function loop() {
        updateBirds();
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        if (!ownBird.dead) {
            offset += HORIZONTAL_SPEED / FRAMERATE;

            if (offset > 5000 && !finished) {
                won(3);
                finished = true;
                ownBird.dead = true;
            }
        }

        canvasContext.drawImage(background, -offset % canvas.width, 0, canvas.width, canvas.height);
        canvasContext.drawImage(background, -offset % canvas.width + canvas.width, 0, canvas.width, canvas.height);

        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            canvasContext.save();

            canvasContext.translate(-offset, 0);

            canvasContext.fillStyle = canvasContext.createPattern(wallImage, 'repeat');
            canvasContext.fillRect(obstacle.x, 0, obstacle.width, obstacle.gapY);
            canvasContext.fillRect(obstacle.x, obstacle.gapY + obstacle.gapSize, obstacle.width, canvas.height - obstacle.gapY - obstacle.gapSize);

            canvasContext.restore();
        }

        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            canvasContext.save();

            canvasContext.translate(bird.x - offset, bird.y);
            canvasContext.rotate(Math.atan(bird.ySpeed / bird.xSpeed));
            canvasContext.drawImage(avatar, -bird.width / 2, -bird.height / 2, bird.width, bird.height);

            canvasContext.restore();
        }
    }

    function updateBirds() {
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            if (!bird.dead) {
                bird.x += bird.xSpeed / FRAMERATE;
                bird.y += bird.ySpeed / FRAMERATE;
                bird.ySpeed += 800 / FRAMERATE;
            }
            collisionDetect(bird);
        }
    }

    function collisionDetect(bird) {
        if (bird.y > canvas.height - 50) {
            bird.dead = true;
        }
        for (var i = 0; i < obstacles.length; i++) {
            var obstacle = obstacles[i];
            if (obstacle.near(bird)) {
                if (obstacle.colliding(bird)) {
                    bird.dead = true;
                }
            }
        }

    }

    function findBirdById(id) {
        for (var i = 0; i < birds.length; i++) {
            var bird = birds[i];
            if (bird.id == id) {
                return bird;
            }
        }
        return null;
    }

    function action() {
        if (!ownBird.dead) {
            jump();
        } else {
            start();
        }
    }

    function jump() {
        ownBird.jump();
        var message = new Message("jump");
        message.y = ownBird.y;
        ws.send(JSON.stringify(message));
    }

    function start() {
        var index = birds.indexOf(ownBird);
        if (index > -1) {
            birds.splice(index, 1);
        }
        ownBird = new Bird(ownId);
        birds.push(ownBird);

        offset = 0;

        ws.send(JSON.stringify(new Message("start")));
    }

    WebSocketTest();

    setInterval(loop, 1000 / FRAMERATE);

    canvas.onclick = action;
    window.onkeydown = function (e) {
        if (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 13) {
            action();
        }
    }
});