<?php

function verifyToken() {
    if ($_GET['token'] === getActualToken()) {
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

function redirectToVictoryScreen() {
    if (gameIsFinished()) {
        if (isset($_GET['token']) && $_GET['token'] === getActualToken()) {
            header('Location: victory.php');
        }
    }
}

function getActualToken() {
    if (file_exists('token')) {
        $actualToken = trim(file_get_contents('token'));
    } else {
        $actualToken = trim(file_get_contents('../token'));
    }

    return $actualToken;
}

function showPart($part) {
    if ($part === 1) {
        return true;
    }

    $currentProgress = intval(file_get_contents('progress'));

    if ($currentProgress + 1 >= $part) {
        return true;
    }
}

function getSteamCode() {
    return trim(file_get_contents('steamcode'));
}

function redirectLoading() {
    if (empty($_COOKIE['loaded'])) {
        $token = !empty($_GET['token']) ? '?token=' . $_GET['token'] : '';
        setcookie('loaded', '1');
        header('Location: loading.html' . $token);
    }
}