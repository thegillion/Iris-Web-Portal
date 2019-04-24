<?php
include 'dbinfo.php';
$something = $_POST['FW'];
$HUBID = $_POST['HUBID'];
$webkey = $_POST['key'];
$key = "HMNBNjdfgs826sghws";
error_log(print_r($_POST,TRUE));
header('Cache-Control: no-cache, must-revalidate');
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if($key == $webkey){
	$something = "'".$something."'";
	$sql = "UPDATE `admin_irisportal`.`firmware` SET `newfirmware` = $something WHERE `firmware`.`id` = 1;";
	$userfields = $conn->query($sql);
	// if($HUBID == "LWF-0066"){
	// $sql = "UPDATE `admin_irisportal`.`firmware` SET `currentfirmware` = $something WHERE `firmware`.`id` = 1;";
	// $userfields = $conn->query($sql);
	// }
}else{
?>
<img src="http://irisstatus.org/iris_portal/email_alerts/nokey.gif">
<meta http-equiv="refresh" content="2;URL='http://www.lingscars.com/'" /> 
<?php
}
?>