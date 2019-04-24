<?php
include 'dbinfo.php';
error_log(print_r($_POST,TRUE));
header('Cache-Control: no-cache, must-revalidate');
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM `portal`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["vr"];
    }
} else {
    echo "0 results";
}
$conn->close();
?>