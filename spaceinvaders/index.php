<?php
require_once('../functions.php');
verifyToken();
?>
<!DOCTYPE html>
<html >
<head>
  <meta charset="UTF-8">
  <title>Space Invaders HTML5 Canvas</title>
    <link rel="stylesheet" href="css/style.css">
    <link href='http://fonts.googleapis.com/css?family=Play:400,700' rel='stylesheet' type='text/css'>
</head>

<body>

    <canvas id="game-canvas" width="640" height="640"></canvas>

    <div id="transition">&nbsp;</div>
    <script src="js/index.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="../js/index.js"></script>

    <audio controls autoplay="autoplay" loop="loop" style="display: none;">
        <source src="../audio/spaceinvaders.mp3"
                type='audio/mp3'>
    </audio>
</body>
</html>
