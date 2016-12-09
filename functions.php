<?php

function verifyToken() {
    if (file_exists('token')) {
        $actualToken = trim(file_get_contents('token'));
    } else {
        $actualToken = trim(file_get_contents('../token'));
    }

    if ($_GET['token'] === $actualToken) {
        return true;
    }

    if (gameIsFinished()) {
        return true;
    }

    header('Location: nope.html');
    die();
}

function gameIsFinished() {
    $currentProgress = file_get_contents('progress');

    if ($currentProgress === '3') {
        return true;
    }

    return false;
}