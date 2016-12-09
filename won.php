<?php

if (!isset($_GET['token']) || !isset($_GET['part']) || !ctype_digit($_GET['part'])) {
    die();
}

$actualToken = trim(file_get_contents('token'));

if ($_GET['token'] === $actualToken) {
    $currentProgress = 0;
    if (file_exists('progress')) {
        $currentProgress = file_get_contents('progress');
    }

    if ($currentProgress < $_GET['part'] && $_GET['part'] >= 1 && $_GET['part'] <= 3) {
        file_put_contents('progress', $_GET['part']);
    }
}