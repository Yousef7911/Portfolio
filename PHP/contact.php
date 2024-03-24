<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = isset($_POST['fullName']) ? $_POST['fullName'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : '';
    $subject = isset($_POST['subject']) ? $_POST['subject'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Email address to send the form data to
    $to = "yousef2142003@gmail.com";

    // Email content
    $email_subject = "New Message: $subject";
    $email_body = "You have received a new message from the Portfolio.\n\n" .
        "Full Name: $fullName\n" .
        "Email Address: $email\n" .
        "Phone Number: $phoneNumber\n" .
        "Subject: $subject\n" .
        "Message:\n$message";

    // Send email
    if (mail($to, $email_subject, $email_body)) {
        echo "<script>alert('Your message has been sent successfully. Thank you!');</script>";
    } else {
        echo "<script>alert('Sorry, there was an error sending your message. Please try again later.');</script>";
    }
}
?>