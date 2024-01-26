<?php
$recaptcha_secret_key = '6LcdDlApAAAAANYKBxJfKhpkkS-M-2NhxeXuGF0a';
$recaptcha_response = $_POST['g-recaptcha-response'];

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array(
    'secret' => $recaptcha_secret_key,
    'response' => $recaptcha_response
);

$options = array(
    'http' => array(
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$result_json = json_decode($result, true);

echo json_encode($result_json);
?>
