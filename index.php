<?php
require_once('functions.php');
verifyToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="intro">
    <div id="titles">
        <div id="title-content">
            <p>Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.</p>
            <p>Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.</p>
            <p>Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.</p>
            <p>Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.</p>
            <p>Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.Dit is een test.</p>
        </div>
    </div>

    <div id="start-menu">
        <a href="menu.php" id="start-button">Test link</a>
    </div>
    <div id="transition">&nbsp;</div>
</body>

<audio controls autoplay="autoplay" loop="loop">
    <source src="audio/intro.mp3"
            type='audio/mp3'>
</audio>

<script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/index.js"></script>

</html>