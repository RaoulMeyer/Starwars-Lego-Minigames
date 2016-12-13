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
            <p>Although peace may be upon us, it is of great importance to always be prepared for battle.</p>
            <p>In this trial, you must defeat numerous enemies in often difficult circumstances. Unfortunately, gravity does not seem to be on your side.</p>
            <p>A reward awaits those that succeed...</p>
            <p>Good luck!</p>
        </div>
    </div>

    <div id="start-menu" style="display: none;">
        <a href="menu.php" id="start-button">>> Skip intro</a>
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