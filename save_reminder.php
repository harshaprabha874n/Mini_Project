<?php 
//initializing variables
$occasionName=$_POST['occasionName'];
$occasionDate=$_POST['occasionDate'];
$occasionTime=$_POST['occasionTime'];
$email=$_POST['email'];
$phone=$_POST['phone'];

if(!empty($occasionName)||!empty($occasionDate)||!empty($occasionTime)||!empty($email)||!empty($phone)){
    $host="localhost";
    $dbusername="root";
    $dbpassword="";
    $dbname="flower_shop";
}
//create connection
$conn= new mysqli($host,$dbusername,$dbpassword,$dbname);
if(mysqli_connect_error()){
    die('Connection Error('.mysqli_connect_error().')'.mysqli_connect_error());
}
else{
    $INSERT="INSERT into reminders(occasionName,occasionDate,occasionTime,email,phone)values(?,?,?,?,?)";

    //prepare statement
    $stmt=$conn->prepare($INSERT);
    $stmt->bind_param("sssss",$occasionName,$occasionDate,$occasionTime,$email,$phone);
    if($stmt->execute()){
        header("Location:sucindex.html");
        exit();
    }
    else{
        echo"Error inserting record:".$stmt->error;
    }

 }
    $stmt ->close();
    $conn->close();

    

?>