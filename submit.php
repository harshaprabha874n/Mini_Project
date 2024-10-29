<?php
$servername = "localhost"; // Usually localhost
$username = "root";         // Default username
$password = "";             // Default password (empty for XAMPP)
$dbname = "reminders";      // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO occasions (name, date, phone, email) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $date, $phone, $email);

// Set parameters and execute
$name = $_POST['name'];
$date = $_POST['date'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$stmt->execute();

// Send Email Notification
$to = $email;
$subject = "Occasion Reminder Set";
$message = "You have set a reminder for '$name' on $date.";
$headers = "From: no-reply@yourdomain.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed.";
}

$stmt->close();
$conn->close();
?>
