<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
if(isset($_POST))
{
    $services = $_POST['services'];
    $selectservice = $_POST['select-service'];
    $phone = $_POST['phone'];
    $gender = $_POST['gender'];
    $textradio = $_POST['text-radio'];
    $mailFrom = $_POST['mail'];
    $name = 'Admin';
    $selectskill = $_POST['select-skill'];
    $textarea = $_POST['textarea'];
    $hire2 = $_POST['hire2'];
    $hire = $_POST['hire'];
    $budget = $_POST['budget'];
    $hire3 = $_POST['hire3'];
    $hire4 = $_POST['hire4'];
    $category = $_POST['category'];
    $hirefree = $_POST['hire-free'];
    $myRange = $_POST['myRange'];
    $hire5 = $_POST['hire5'];


    



$mail = new PHPMailer(true);
try
{
    // SMTP server configuration
    // $mail->SMTPDebug = 2;
    // $mail->isSMTP();
    // $mail->Host = 'smtp.gmail.com';
    // $mail->SMTPAuth = true;
    // $mail->Username = 'yourmail@gmail.com';
    // $mail->Password = 'yourmail password';
    // $mail->SMTPSecure = 'tls';
    // $mail->Port = 587;

    //Recipent

    $mail->Sender = $mailFrom;
    $mail->From = $mailFrom;
    $mail->FromName = $name;
    // $mail->setFrom($mailFrom, $name);
    $mail->addAddress('user@site.com', 'Admin'); 
    $mail->addReplyTo($mailFrom);
    $mail->addAttachment($_FILES['file']['tmp_name'],
    $_FILES['file']['name']);


    //Content
    $mail->isHTML(true);

    $mail->Subject = 'Marketing2';

  
    $mail->Body = "You have received an e-mail from " . "<b>".$name . "</b>"
    ."<br/>" . "<b>services: </b> " .$services
    ."<br/>" . "<b>selectservice: </b> "  .$selectservice
    . "<br/>" . "<b>phone: </b> " .$phone
    . "<br/>" . "<b>gender: </b> " .$gender
    ."<br/>" . "<b>textradio: </b> "  .$textradio
    . "<br/>" . "<b>selectskill: </b> " .$selectskill
    . "<br/>" . "<b>textarea: </b> " .$textarea
    ."<br/>" . "<b>hire2: </b> "  .$hire2
    . "<br/>" . "<b>hire: </b> " .$hire
    . "<br/>" . "<b>budget: </b> " .$budget
    ."<br/>" . "<b>hire3: </b> "  .$hire3
    . "<br/>" . "<b>hire4: </b> " .$hire4
    . "<br/>" . "<b>category: </b> " .$category
    ."<br/>" . "<b>hirefree: </b> "  .$hirefree
    . "<br/>" . "<b>myRange: </b> " .$myRange
    . "<br/>" . "<b>hire5: </b> " .$hire5;

    $mail->send();
    echo 'Mail sent';
}
catch(Exception $e)
{
    echo "mail not sent. Error: ", $mail->ErrorInfo;
}
}
else
{
    echo "error";
}


ini_set("log_errors", 1);
ini_set("error_log", "/tmp/php-error.log");
error_log( "Hello, errors!" );
