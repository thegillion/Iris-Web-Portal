<html>
<head>
	<title>Iris Login</title>
</head>
<body>
<?php
//This is the login page for the portal this will edit the edit the token to think its coming from the server.
//You will also need to edit Nginx config to redo the webstocket URL. 
//
//** NGINX CONFIG**
//** Add the following lines before "location / {"
//location /websocket/ {
		// proxy_pass      https://bc.irisbylowes.com:443; Change this to your webstocket  login
        // proxy_set_header Origin https://home.irisbylowes.com; You can set this to your Iris Server URL.
		// proxy_http_version 1.1;
		// proxy_set_header Upgrade $http_upgrade;
		// proxy_set_header Connection "Upgrade";
	// }
ini_set("display_errors", "on");
error_reporting(E_ALL);

// Show login form?
if (!isset($_POST['user']))
{
?>
	<form method="post" action="login.php">
	Email: <input type="text" name="user" />
	Password: <input type="password" name="password" />
	<input type="submit" value="login" />
	</form>
<?php
}
else
{
	// Create a new curl resource
	$ch = curl_init();

	// Update feed URL
	curl_setopt($ch, CURLOPT_URL, 'https://bc.irisbylowes.com/login'); // This need to be set to your Arcus server URL.

	// Referer
	curl_setopt($ch, CURLOPT_REFERER, 'https://bc.irisbylowes.com/login'); // This need to be set to your Arcus server URL.

	// User agent:
	curl_setopt($ch, CURLOPT_USERAGENT, 'IrisWebPortal/1.0');

	// Remove header! (0 = yes, 1 = no)
	curl_setopt($ch, CURLOPT_HEADER, 1);
	
	// POST
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST);

	// Return data in variable. true = return, false = print
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	// Timeout in seconds
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);

	// Ensure the whole request is handled.. No "100 Continue" headers
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:') );

	// This is due to an older version of open SSL.  Fix before production
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// Download update XML
	$output = curl_exec($ch);

	// Check for errors
	if(!curl_errno($ch))
	{
		// Get some info on the request (i.e. HTTP status, content-type, etc)
	    $status = curl_getinfo($ch);
	    if ($status['http_code'] == '401')
	    {
	    	die ("Login Failed!");
		}
	    else if ($status['http_code'] == '200')
	    {
    		// Get the session cookie
    		$cookies = array();
    		preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $output, $matches);
    		foreach($matches[1] as $item)
    		{
    parse_str($item, $cookie);
    $cookies = array_merge($cookies, $cookie);
		}

		setcookie ('irisAuthToken', $cookies['irisAuthToken'], time() + 86400*30, '/', 'proxy.iriswebportal.com'); // Here too.
		header('Location: https://proxy.iriswebportal.com/'); // This needs to be set to your portal URL
	    }
	}
}
?>
</body>
</html>