var HTMLcam = "";
var cameraIP = "";
var cameraLocalView = "";
var camUsername = "";
var localURL = "";
var camPassword = "";
var cameraResolutions = [];
var cameraMDmodes = [];
var irLedSupportedModes = [];
var FPS = [];
var bitratesSupported = [];
var cameraQualities = [];
var qualitiesSupported = [];
var irLedLuminances = [];
setInterval(updateImage, 15000);
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("cameraimage");

function onMhubinfo(evt) {
	if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325camhub") != -1){
		listhubinfo(evt.data)			
	}
}

function listhubinfo(devices){
	// this is just to get the Camera Username and Password for local viewing.
	console.log("Looking at hub data ");
	Devices = devices.split("},{");
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("hubsercomm:username") != -1){
					camUsername = device[x].replace('"hubsercomm:username":"','').replace('"',"");
					console.log(camUsername);
					}
					if(device[x].search("hubsercomm:password") != -1){
					camPassword = device[x].replace('"hubsercomm:password":"','').replace('"',"");
					console.log("Password found");
					console.log("Drawing local view.");
					console.log('http://' + camUsername + ':' + camPassword + '@' + cameraIP + '/img/snapshot.cgi');
					// setInterval(updateImage, 1000);
					
					// debugger;
						if(HubIDG != "LWD-4670"){
							localURL = '<img src="http://' + camUsername + ':' + camPassword + '@' + cameraIP + '/img/snapshot.cgi" width="710" height="400">';
							document.getElementById("LocalViewer").innerHTML = 'Look like chrome has removed this support for emdeded logins. <a href="http://' + camUsername + ':' + camPassword + '@' + cameraIP + '/img/snapshot.cgi?size=4&quality=1">Click here</a> to login to your camera<br> <img id="cameraimage" src="http://' + cameraIP + '/img/snapshot.cgi?size=3&quality=1">';
						}else{
							document.getElementById("LocalViewer").innerHTML = 'Look like chrome has removed this support for emdeded logins. <a href="http://' + camUsername + ':' + camPassword + '@' + cameraIP + '/img/snapshot.cgi?size=4&quality=1">Click here</a> to login to your camera<br> <img id="cameraimage" src="http://' + cameraIP + '/img/snapshot.cgi?size=3&quality=1" >';
						}
						document.getElementById("cameraimage").onload = function() {
							// var canvas = document.getElementById("myCanvas");
							// var ctx = canvas.getContext("2d");
							// var img = document.getElementById("cameraimage");
							// ctx.drawImage(img, 0, 0);
							// ctx.fillStyle = "rgba(255, 0, 0, 0.498)";
							// ctx.fillRect(84,38,481,386);
							
							}
					}	
				}				
			}	
					
}
function cameraAvdData(devices){

	// this is just to get the Camera Username and Password for local viewing.
	console.log("Looking at adv camera data");
	Devices = devices.split("},{");
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
				// Cleaning data
				if(device[x].search('{"type":"Error"') != -1){
				cameraMDmodes.push('<option value="PIR">ERROR FOUND RELOAD PAGE loaded default values</option>');
							document.getElementById("MDmode").innerHTML = cameraMDmodes.toString().replace(',',"");
							document.getElementById('mdThresholdValue').innerHTML = "ERROR FOUND loaded default values";
							document.getElementById('mdSensitivityValue').innerHTML = "ERROR FOUND loaded default values";
				}else{
					var Data = device[x].split("\\r\\n");
						for (var y = 0; y < Data.length; y++) {
							// var mdSensitivity = "";
							console.log(Data[y]);
							if(Data[y].search("Motion Detection Mode:") != -1){
							var MDmode = Data[y].replace('Motion Detection Mode: ',"").replace('"',"");
							cameraMDmodes.push('<option value="' + MDmode + '">' + MDmode + '</option>');
							cameraMDmodes.push('<option value="OFF">OFF</option>');
							cameraMDmodes.push('<option value="PIR">PIR</option>');
							cameraMDmodes.push('<option value="WINDOW">WINDOW</option>');
							cameraMDmodes.push('<option value="BOTH">BOTH</option>');
							document.getElementById("MDmode").innerHTML = cameraMDmodes.toString().replace(',',"");
							// devName = '<h3>' + device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','') + "</h3>";
							}
							if(Data[y].search("Motion Detection Threshold:") != -1){
							var mdThreshold = Data[y].replace('Motion Detection Threshold: ',"").replace('"',"");
							document.getElementById('mdThreshold').value = mdThreshold;
							document.getElementById('mdThresholdValue').innerHTML = mdThreshold;
							}
							if(Data[y].search("Motion Detection Sensitivity:") != -1){
							mdSensitivity = Data[y].replace('Motion Detection Sensitivity: ',"").replace('"',"");
							document.getElementById('mdSensitivity').value = mdSensitivity;
							document.getElementById('mdSensitivityValue').innerHTML = mdSensitivity;
							mdSensitivity = parseInt(mdSensitivity) / 10;
							document.getElementById("cameraimage").onload = function() {
							var canvas = document.getElementById("myCanvas");
							var ctx = canvas.getContext("2d");
							var img = document.getElementById("cameraimage");
							ctx.drawImage(img, 0, 0);
							//Math for 
							console.log("rgba(255, 0, 0, " + mdSensitivity + ")");
							ctx.fillStyle = "rgba(255, 0, 0, " + mdSensitivity + ")";
							ctx.fillRect(84,38,481,386);
							
							 }
							}
							
						}
					}
				}				
			}	
}

function OnMlistcamSettings(evt) {
	if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d") != -1){		
		listCameraSettings(evt.data);
	}
}
function listCameraSettings(devices){
	// document.getElementById("cameras").innerHTML = "";
	Devices = devices.split("},{");
		var devBatteryNum = "";
		var devID = "";
		var devState = "";
		var devName = "";
		var devThermState = "";
		var devMotionState = "";
		var devVendor = "";	
		var devBattery = "";
		var devOnlineStatus = "";
		var devModel = "";
		var devSignal = "";
		var devProtocol = "";
		var devType = "";
		var devCoolSetPoint = "";
		var devHeatSetPoint = "";
		var devTemp = "";
		var devPresence = "";
		var devContact = "";
		var devDriverVersion = "";
		var devUpdateStatus = "";
		var devCurrentDriver = "";
		var devTargetDriver = "";
		var cameraFlip = "";
		var cameraQuality = "";
		var cameraIRLedMode = "";
		var cameraMaxFramerate = "";
		var cameraFramerate = "";
		var cameraResolution = "";
		var irLedLuminance = "";
		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("dev:name") != -1){
					devName = '<h3>' + device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','') + "</h3>";
					}	
					if(device[x].search("ipinfo:mac") != -1){
					camMac = device[x].replace(/'"'/g,'').replace('"ipinfo:mac":"',"").replace('"',"");
					}	
					if(device[x].search("camera:privacy") != -1){
					cameraLocalView = device[x].replace('"camera:privacy":',"").replace('"',"");
					}	
					if(device[x].search("camera:irLedMode") != -1){
					cameraIRLedMode = device[x].replace('"camera:irLedMode":"',"").replace('"',"");
					irLedSupportedModes.push('<option value="' + cameraIRLedMode + '">' + cameraIRLedMode + '</option>');
					}
					if(device[x].search("camera:irLedLuminance") != -1){
					irLedLuminance = device[x].replace('"camera:irLedLuminance":',"").replace('"',"");
					irLedLuminances.push('<option value="' + irLedLuminance + '">' + irLedLuminance + '</option>');
					}					
					if(device[x].search('"mot:motion":"') != -1){
					devMotionState = "Motion Status:" + device[x].replace(/'"'/g,'').replace('"mot:motion":"',"").replace('"',"") + "<br>";
					// writeLogToScreen(devMotionState);
						if(devMotionState.search('NONE') != -1){
							devMotionState = '<i class="fa fa-circle" style="font-size:13px"></i> <br>';
							}
						if(devMotionState.search('DETECTED') != -1){
							devMotionState = '<i class="fa fa-rss" style="font-size:48px;color:green"><br>';
							}
						}				
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = "Protocol:" + device[x].replace('devadv:protocol":','').replace('"',"") + "<br>"; 
					}
					if(device[x].search("dev:vendor") != -1) {
						devVendor = "Vendor" + device[x].replace(/'"'/g,'').replace(/"dev:vendor"/g,"") + "<br>"; 
					}
					if(device[x].search("camera:maxframerate") != -1) {
						cameraMaxFramerate = device[x].replace('"camera:maxframerate":','').replace('"',"");
						cameraMaxFramerate = parseInt(cameraMaxFramerate) + 1;
					}
					if(device[x].search("camera:framerate") != -1) {
						cameraFramerate = device[x].replace('"camera:framerate":','').replace('"',"");
						FPS.push('<option value="' + cameraFramerate + '">' + cameraFramerate + '</option>');
					}
					if(device[x].search("devota:currentVersion") != -1) {
						devCurrentDriver = device[x].replace('"devota:currentVersion":"','').replace('"',"");
						// writeLogToScreen("CD:" + devCurrentDriver);
					}
					if(device[x].search("devota:targetVersion") != -1) {
						devTargetDriver = device[x].replace('"devota:targetVersion":"','').replace('"',"");
						// writeLogToScreen("TD:" +devTargetDriver);						
					}
					if(device[x].search("devconn:signal") != -1) {
						devSignal = device[x].replace('"devconn:','').replace('"',"") + "<br>"; 
					}
					if(device[x].search("ipinfo:ip") != -1) {
						cameraIP = device[x].replace('"ipinfo:ip":"',"").replace('"',''); 

						console.log(cameraIP);
					}
					if(device[x].search('"camera:resolution":"') != -1) {
						cameraResolution = device[x].replace('"camera:resolution":"',"").replace('"',''); 
						cameraResolutions.push('<option value="' + cameraResolution + '">' + cameraResolution + '</option>');
						console.log(cameraResolution);
					}
					if(device[x].search('"camera:quality":"') != -1) {
						cameraQuality = device[x].replace('"camera:quality":"',"").replace('"',''); 
						cameraQualities.push('<option value="' + cameraQuality + '">' + cameraQuality + '</option>');
						console.log(cameraQuality);
					}
					if(device[x].search('"camera:bitrate":"') != -1) {
						bitrate = device[x].replace('"camera:bitrate":"',"").replace('"',''); 
						bitratesSupported.push('<option value="' + bitrate + '">' + bitrate + '</option>');
						console.log(bitrate);
					}
					if(device[x].search('devota:status') != -1) {
						devUpdateStatus = "FW update**:" + device[x].replace('"devota:status":"','').replace('"',"") + '<br>'; 
					}
					if(device[x].search("DRIV:dev") != -1) {
						devID = device[x].replace('"base:address":"DRIV:dev:','').replace('"','');
						//writeToScreen(devID);
					}
					if(device[x].search("dev:model") != -1) {
						devModel = "Model:" + device[x].replace('"dev:model":"','').replace('"','')+ "<br>";
						//writeToScreen(devID);
					}
					if(device[x].search('"devconn:state":"') != -1) {
						devOnlineStatus = "Status:" + device[x].replace('"devconn:state":"','').replace('"','') + "<br>";
						if(devOnlineStatus.search('OFFLINE') != -1){
						devOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:red"></i><span class="tooltiptext"> Offline</span></div> ';
						}
						if(devOnlineStatus.search('ONLINE') != -1){
						devOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:green"></i><span class="tooltiptext"> Online</span></div> ';
						}
						//writeToScreen(devID);
					}
					if(device[x].search("dev:devtype") != -1) {
						devType = device[x] + "<br>";
						//writeToScreen(devType);
					}
					if(device[x].search('"devadv:added":') != -1){
						if(devTargetDriver != ""){
							if(devCurrentDriver == devTargetDriver){
								devTargetDriver = "Driver up to date <br>";
							}else{
								devTargetDriver = "Driver update needed! <br>";
							}
						}
					
					var message = '{"type":"hubsercomm:getCustomAttrs","headers":{"destination":"SERV:' + HubIDG + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325getcam","isRequest":true},"payload":{"messageType":"hubsercomm:getCustomAttrs","attributes":{"mac":"' + camMac + '"}}}';
					websocket.send(message);
					console.log(message);
					
					
					cameraResolutions.push('<option value="160x120">160x120</option>');
					cameraResolutions.push('<option value="320x240">320x240</option>');
					cameraResolutions.push('<option value="640x480">640x480</option>');
					cameraResolutions.push('<option value="1280x720">1280x720</option>');
					document.getElementById("resolution").innerHTML = cameraResolutions.toString().replace(',',"");
					
					
					irLedSupportedModes.push('<option value="AUTO">AUTO</option>');
					irLedSupportedModes.push('<option value="OFF">OFF</option>');
					irLedSupportedModes.push('<option value="ON">ON</option>');
					document.getElementById("IRLEDMODE").innerHTML = irLedSupportedModes.toString().replace(',',"");
					
					cameraQualities.push('<option value="Very low">Very low</option>');
					cameraQualities.push('<option value="Low">Low</option>');
					cameraQualities.push('<option value="Normal">Normal</option>');
					cameraQualities.push('<option value="High">High</option>');
					cameraQualities.push('<option value="Very high">Very high</option>');
					document.getElementById("quality").innerHTML = cameraQualities.toString().replace(',',"");
					for (i = 1; i < cameraMaxFramerate; i++) { 
						FPS.push('<option value="' + i + '">' + i + '</option>');
					}					
					document.getElementById("framerate").innerHTML = FPS.toString().replace(',',"");
					
					bitratesSupported.push('<option value="32K">32K</option>');
					bitratesSupported.push('<option value="64K">64K</option>');
					bitratesSupported.push('<option value="96K">96K</option>');
					bitratesSupported.push('<option value="128K">128K</option>');
					bitratesSupported.push('<option value="256K">256K</option>');
					bitratesSupported.push('<option value="384K">384K</option>');
					bitratesSupported.push('<option value="512K">512K</option>');
					bitratesSupported.push('<option value="768K">768K</option>');
					bitratesSupported.push('<option value="1024K">1024K</option>');
					bitratesSupported.push('<option value="1280K">1280K</option>');
					bitratesSupported.push('<option value="2048K">2048K</option>');
					document.getElementById("bitrate").innerHTML = bitratesSupported.toString().replace(',',"");
					
					for (i = 1; i < 6; i++) { 
						irLedLuminances.push('<option value="' + i + '">' + i + '</option>');
					}					
					document.getElementById("LED-Luminance").innerHTML = irLedLuminances.toString().replace(',',"");

					
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
							devPresence = "";
							devName = "";
							devThermState = "";
							devVendor = "";
							devModel = "";
							devBattery = "";
							devBatteryNum = "";
							devMotionState = "";
							devOnlineStatus = "";
							devSignal = "";
							devProtocol = "";
							devState = "";
							devType = "";
							devTemp = "";
							devContact = "";
							devDriverVersion = "";
							devUpdateStatus = "";
							devCurrentDriver = "";
							devTargetDriver = "";
							devCoolSetPoint = "";
							devHeatSetPoint = "";
					//HTMLcam = HTMLcam + "devtype" + device[x] + "<br>";
					}
				}				
			}	
					
}
function camReboot() {
	var message = '{"type":"hubsercomm:setCustomAttrs","headers":{"destination":"SERV:' + HubIDG + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325setcam","isRequest":true},"payload":{"messageType":"hubsercomm:reboot","attributes":{"mac":"'+ camMac + '"}}}';
	websocket.send(message);
	document.getElementById("AdvLoading").innerHTML = '<br><i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <br><br> Rebooting...';
}

function updateImage( )
{
var time = new Date();
temptime = "";
temptime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() ;
console.log("firing timer");
document.getElementById("LocalViewer").innerHTML = "";
document.getElementById("LocalViewer").innerHTML = 'Look like chrome has removed this support for emdeded logins. <a href="http://' + camUsername + ':' + camPassword + '@' + cameraIP + '/img/snapshot.cgi?size=4&quality=1">Click here</a> to login to your camera<br><img src="http://' + cameraIP + '/img/snapshot.cgi?size=4&quality=1&' + temptime + '" width="710" height="400"><br>' + temptime;
}

function saveAdvancedSettings() {
	var IRLEDMODE = document.getElementById('IRLEDMODE');
	var LEDLuminance = document.getElementById('LED-Luminance');
	var MDmode = document.getElementById('MDmode');
	var mdThreshold =  document.getElementById('mdThreshold').value;
	var mdSensitivity =  document.getElementById('mdSensitivity').value;
	var message = '{"type":"hubsercomm:setCustomAttrs","headers":{"destination":"SERV:' + HubIDG + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325setcam","isRequest":true},"payload":{"messageType":"hubsercomm:setCustomAttrs","attributes":{"mac":"'+ camMac + '","irLedMode":' + IRLEDMODE.options[IRLEDMODE.selectedIndex].value + ',"irLedLuminance":' + LEDLuminance.options[LEDLuminance.selectedIndex].value + ',"mdMode":' + MDmode.options[MDmode.selectedIndex].value + ',"mdThreshold":' + mdThreshold + ',"mdSensitivity":' + mdSensitivity + ',"mdWindowCoordinates":"84,38,562,424"}}}';
	websocket.send(message);
	console.log(message);
	document.getElementById("AdvLoading").innerHTML = '<br><i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <br><br> Saving...';
}
function saveBasicSettings() {
	var resolutionOption = document.getElementById('resolution');
	var qualityOption = document.getElementById('quality');
	var bitrateOption = document.getElementById('bitrate');
	var framerateOption =  document.getElementById('framerate');
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + camID + '","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325setcam","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"camera:framerate":' + framerateOption.options[framerateOption.selectedIndex].value + ',"camera:resolution":' + resolutionOption.options[resolutionOption.selectedIndex].value + ',"camera:bitrate":' + bitrateOption.options[bitrateOption.selectedIndex].value + ',"camera:quality":"' + qualityOption.options[qualityOption.selectedIndex].value + '"}}}';
	websocket.send(message);
	document.getElementById("BasicLoading").innerHTML = '<br><i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <br><br> Saving...';
	
}
function showValue(ID) {
		var x = document.getElementById(ID).value;
		document.getElementById(ID + "Value").innerHTML = x;
}