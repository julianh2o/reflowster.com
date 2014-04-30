<?php

$EMAIL_LOG_PATH = "/home/reflowst/email_subscriptions.txt";

$email = $_POST['email'];
$type = $_POST['type'];

if (!in_array($type,["update","none","order"])) {
    header(' ', true, 400);
    return;
}

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    file_put_contents($EMAIL_LOG_PATH,"$email\t$type\n",FILE_APPEND);
} else {
    header(' ', true, 400);
}
