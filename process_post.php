<?php

if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') != 0){
    throw new Exception('Request method must be POST!');
}
 
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if(strcasecmp($contentType, 'application/json') != 0){
    throw new Exception('Content type must be: application/json');
}
 
$content = trim(file_get_contents("php://input"));
 
$decoded = json_decode($content);

$headers = "From: order@zalog-invest.com\n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-type: text/html; charset=utf-8\n";

$subject = "Отправка формы с сайта Залог Инвест";

$to = "zaloginvest9822@gmail.com, pavel@pln-b.ru, order@pln-b.ru";

$message = "";

switch($decoded->form) {

	case 'fast_form': 

		$form_name = 'Быстрая форма оценки';

		$message .= "<b>Форма: </b>" . $form_name . "<br /><hr />";
		$message .= "<b>Площадь квартиры: </b>" . $decoded->apartmentSpace . "<br />";
		$message .= "<b>Адрес: </b>" . $decoded->address . "<br />";
		$message .= "<b>Телефон: </b>" . $decoded->phone . "<br />";
		break;

	case 'online_calculator': 

		$form_name = 'Онлайн-калькулятор';

		$message .= "<b>Форма: </b>" . $form_name . "<br /><hr />";
		$message .= "<b>Количество комнат: </b>" . $decoded->numberOfRooms . "<br />";
		$message .= "<b>Площадь квартиры: </b>" . $decoded->apartmentSpace . "<br />";
		$message .= "<b>Адрес: </b>" . $decoded->address . "<br />";
		$message .= "<b>Телефон: </b>" . $decoded->phone . "<br />";
		if (isset($decoded->region)) {
			$message .= "<b>Регион: </b>" . $decoded->region . "<br />";
		}
		break;

	case 'application_form':

		$form_name = 'Нижняя форма заявки';

		$message .= "<b>Форма: </b>" . $form_name . "<br /><hr />";
		$message .= "<b>Имя: </b>" . $decoded->name . "<br />";
		$message .= "<b>E-mail: </b>" . $decoded->email . "<br />";
		if (isset($decoded->message)) {
			$message .= "<b>Сообщение: </b>" . $decoded->message . "<br />";
		}
		break;

	case 'loan_form':

		$form_name = 'Форма из расчета платежа';

		$message .= "<b>Форма: </b>" . $form_name . "<br /><hr />";
		$message .= "<b>Имя: </b>" . $decoded->name . "<br />";
		$message .= "<b>Телефон: </b>" . $decoded->phone . "<br />";
		break;

}

if( mail($to, $subject, $message, $headers) ){
	echo $to;
	echo $subject;
	echo $message;
	echo $headers;
} else {
	echo "Серверу не удалось отослать письмо. Попробуйте снова позднее.";
}

?>