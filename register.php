<?php
// Database credentials
$servername = "localhost"; // Replace with your server name
$username = "root";        // Replace with your database username
$password = "";            // Replace with your database password
$dbname = "flower_shop"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and assign form data
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password for security
    $firstName = $conn->real_escape_string($_POST['name']);
    $lastName = $conn->real_escape_string($_POST['lastname']);
    $gender = isset($_POST['radiogroup1']) ? $_POST['radiogroup1'] : '';
    $country = $conn->real_escape_string($_POST['country']);

    // Insert data into users table
    $sql = "INSERT INTO users (email, password, firstname, lastname, gender, country)
            VALUES ('$email', '$password', '$firstName', '$lastName', '$gender', '$country')";

    if ($conn->query($sql) === TRUE) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close connection
$conn->close();
?>
