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
<body class="menu">
    <div id="menu">
        CONGRATULATIONS! <br />
        Your efforts are rewarded with the following Steam code: <br /><br />
        <?php echo getSteamCode(); ?><br /><br />
        Please redeem this code as soon as possible!
    </div>
    <div id="transition">&nbsp;</div>
</body>

<audio controls autoplay="autoplay" loop="loop">
    <source src="audio/victory.mp3"
            type='audio/mp3'>
</audio>

<script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="js/index.js"></script>

</html>