<?php
require_once('../functions.php');
verifyToken();
?>
<html>
<head>
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../js/index.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
</head>
<body>
    <div id="transition">&nbsp;</div>
    <canvas id="canvas" width="1000" height="500"></canvas>
    <audio controls autoplay="autoplay" loop="loop" style="display: none;">
        <source src="../audio/flappy.mp3"
                type='audio/mp3'>
    </audio>
</body>
</html>
