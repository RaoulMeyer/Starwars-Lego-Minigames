<?php
require_once('functions.php');
verifyToken();
redirectToVictoryScreen();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="menu">
    <div id="menu">
        <ul>
            <?php if (showPart(1)): ?>
            <li>
                <img src="img/r2d2.png" />
                <a href="./pacman/">EPISODE I</a>
            </li>
            <?php endif; ?>
            <?php if (showPart(2)): ?>
            <li>
                <img src="img/xwing.png" />
                <a href="./spaceinvaders/">EPISODE II</a>
            </li>
            <?php endif; ?>
            <?php if (showPart(3)): ?>
            <li>
                <img src="img/falcon.png" />
                <a href="./flappy/">EPISODE III</a>
            </li>
            <?php endif; ?>
        </ul>
    </div>
    <div id="transition">&nbsp;</div>
</body>

<audio controls autoplay="autoplay" loop="loop">
    <source src="audio/menu.mp3"
            type='audio/mp3'>
</audio>

<script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/index.js"></script>

</html>