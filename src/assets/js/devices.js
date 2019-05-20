var HTML = "";
var HTMLtable = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function onMdeviceslevel(evt) {
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
		listdeviceslevel(evt.data)			
	}
}
function listdeviceslevel(devices){
	document.getElementById("tbody").innerHTML = "";
	HTMLtable = '<table class="tablesorter"><thead><tr><th><i class="fa fa-sort"></i> Name</th><th>Actions</th><th><i class="fa fa-sort"></i> Protocol</th><th><i class="fa fa-sort"></i> Powered By</th><th><i class="fa fa-sort"></i> Signal Level</th><th><i class="fa fa-sort"></i> Battery Level</th><th><i class="fa fa-sort"></i> Power level</th><th><i class="fa fa-sort"></i> Vendor</th><th><i class="fa fa-sort"></i> Model</th><th><i class="fa fa-sort"></i> Firmware</th><th><i class="fa fa-sort"></i> Driver</th></tr></thead><tbody>';
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var devBatteryNum = "";
		var devID = "";
		var devFav = "";
		var devCP = "";
		var devBrightness = "";
		var devState = "";
		var devLocal = "";
		var devName = "";
		var devNamePassed = "";
		var devThermState = "";
		var devMotionState = "";
		var devVendor = "";	
		var devBattery = "N/A";
		var devSource = "";
		var devOnlineStatus = "";
		var devModel = "";
		var devSignal = "N/A";
		var devProtocol = "";
		var devType = "";
		var devCoolSetPoint = "";
		var devHeatSetPoint = "";
		var devTemp = "";
		var devPresence = "";
		var devContact = "";
		var devPower = "N/A";
		var devDriverVersion = "";
		var devUpdateStatus = "N/A";
		var devCurrentDriver = "";
		var devTargetDriver = "";
		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("dev:name") != -1){
					devName = device[x].replace('"dev:name":"',"").replace('"','').replace('"','').replace('"','');
					devName = devName.replace('\u0027',"'");
					}
					if(device[x].search('"devadv:hubLocal":true') != -1){
					devLocal = '<i class="fa fa-hdd-o"></i>';
					}
					if(device[x].search('"devadv:hubLocal":false') != -1){
					devLocal = '<i class="fa fa-cloud"></i>';
					}
					if(device[x].search("therm:coolsetpoint") != -1){
					C = device[x].replace('"therm:coolsetpoint":',"").replace('"','').replace('"','').replace('"','');
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						//writeToScreen(Cf * 9 / 5 + 32);
						devCoolSetPoint = '<span class="fa-stack fa-2x"><i class="fa fa-gear fa-stack-1x" style="font-size:55px;color:blue"></i>  <i class="fa fa-circle fa-stack-1x" style="font-size:35px;color:white"></i>  <i class="fa-stack-2x" style="font-size:15px;color:blue">' + Math.round(F) + 'F</i></span>';
						//writeToScreen(devTemp);
					}	
					if(device[x].search("therm:heatsetpoint") != -1){
					C = device[x].replace('"therm:heatsetpoint":',"").replace('"','').replace('"','').replace('"','');
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						//writeToScreen(Cf * 9 / 5 + 32);
						devHeatSetPoint = '<span class="fa-stack fa-2x"><i class="fa fa-gear fa-stack-1x" style="font-size:55px;color:red"></i>  <i class="fa fa-circle fa-stack-1x" style="font-size:35px;color:white"></i>  <i class="fa-stack-2x" style="font-size:15px;color:red">' + Math.round(F) + 'F</i></span>';
					}						
					if(device[x].search("therm:active") != -1){
					devThermState = "HVAC Status:" + device[x].replace(/'"'/g,'').replace('"therm:active":"',"").replace('"',"") + "<br>";
						if(devThermState.search('NOTRUNNING') != -1){
							devThermState = '<i class="fa fa-gear" style="font-size:72px"></i></i> <br>';
							}
						if(devThermState.search('RUNNING') != -1){
							devThermState = '<i class="fa fa-gear fa-spin" style="font-size:72px"></i><br>';
							}
						}
					if(device[x].search("devadv:driverversion") != -1){
					devDriverVersion = device[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"");
					}					
					if(device[x].search('"mot:motion":"') != -1){
					devMotionState = "Motion Status:" + device[x].replace(/'"'/g,'').replace('"mot:motion":"',"").replace('"',"") + "<br>";
					
						if(devMotionState.search('NONE') != -1){
							devMotionState = '<i class="fa fa-circle" style="font-size:13px"></i> <br>';
							}
						if(devMotionState.search('DETECTED') != -1){
							devMotionState = '<i class="fa fa-rss" style="font-size:48px;color:green"><br>';
							}
						}				
					if(device[x].search('pres:presence":"') != -1){
						devPresence = device[x].replace('pres:presence":"','').replace('"',"").replace('"',"");
						if(devPresence.search('ABSENT') != -1){
						// devPresence = KeyFobEG[Math.floor(Math.random()*KeyFobEG.length)] +'<br>';
						}
						if(devPresence.search('PRESENT') != -1){
						devPresence = '<i class="fa fa-home" style="font-size:72px"></i> <br>';
						}
						
					}
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = "Protocol:" + device[x].replace('devadv:protocol":','').replace('"',"") + "<br>"; 
					}
					if(device[x].search('devpow:source"') != -1) {
						devSource = device[x].replace('"devpow:source":"','').replace('"',""); 
					}
					if(device[x].search('"dim:brightness":') != -1) {
						devBrightness = device[x].replace('"dim:brightness":','').replace('"',""); 
					}
					if(device[x].search('fan:speed') != -1) {
						devFanSpeed = device[x].replace('"fan:speed":','').replace('"',"");
						devFanSpeed = fanSpeeds[parseInt(devFanSpeed) -1];
					}
					if(device[x].search("dev:vendor") != -1) {
						devVendor = device[x].replace('"','').replace(':','').replace('devvendor":"',"").replace('"',''); 
					}
					if(device[x].search("devota:currentVersion") != -1) {
						devCurrentDriver = device[x].replace('"devota:currentVersion":"','').replace('"',"");
						// writeLogToScreen("CD:" + devCurrentDriver);
					}
					if(device[x].search("devota:targetVersion") != -1) {
						devTargetDriver = device[x].replace('"devota:targetVersion":"','').replace('"',"");
						// writeLogToScreen("TD:" +devTargetDriver);						
					}
					if(device[x].search("devpow:battery") != -1) {
						devBattery = device[x].replace('"devpow:','').replace('"',"").replace('battery:','');
						devBatteryNum = device[x].replace('"devpow:','').replace('"',"").replace('battery:','');
						var B = parseInt(devBatteryNum);
						devBattery = devBattery + "%";
						if(B >= 0){
							devBatteryNum = '<i class="fa fa-battery-empty" style="color:red" aria-hidden="true"></i>';
						}
						if(B >= 25){
							devBatteryNum = '<i class="fa fa-battery-quarter" style="color:orange" aria-hidden="true"></i>';
						}
						if(B >= 50){
							devBatteryNum = '<i class="fa fa-battery-half" aria-hidden="true"></i>';
						}
						if(B >= 75){
							devBatteryNum = '<i class="fa fa-battery-three-quarters" aria-hidden="true"></i>';
						}	
						if(B >= 95){
							devBatteryNum = '<i class="fa fa-battery-full" style="color:green" aria-hidden="true"></i>';
						}						
					}				
					if(device[x].search('cont:contact":"') != -1) {
						devContact = device[x].replace('cont:contact','').replace('"',"").replace('":"',"").replace('"',"");
						//writeToScreen(devContact);
					}				
					if(device[x].search('pow:instantaneous') != -1) {
						devPower = device[x].replace('"attributes":{"pow:instantaneous":','').replace('"',"").replace('pow:',"").replace('instantaneous',"").replace(':',"").replace('"',"").replace('}}}',"");
					}
					if(device[x].search("devconn:signal") != -1) {
						devSignal = device[x].replace('"devconn:','').replace('"',"").replace('signal:',"") + '%'; 
					}
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = device[x].replace('devadv:protocol":','').replace('"',"") + '<br>'; 
					}
					if(device[x].search('devota:currentVersion') != -1) {
						devUpdateStatus = device[x].replace('"devota:currentVersion":"','').replace('"',"") + '<br>'; 
					}
					if(device[x].search('"swit:state"') != -1) {
						devState =  "Stated reported:" + device[x].replace('"swit:state":"','').replace('"',"") + "<br>"; 
					}
					if(device[x].search('temp:temperature') != -1) {
						C = device[x].replace('"temp:temperature":','').replace('"',"");
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						//writeToScreen(Cf * 9 / 5 + 32);
						devTemp = "Temp reported:" + Math.round(F) + "F";
						//writeToScreen(devTemp);
					}
					if(device[x].search("DRIV:dev") != -1) {
						devID = device[x].replace('"base:address":"DRIV:dev:','').replace('"','');
						//writeToScreen(devID);
					}
					if(device[x].search("dev:model") != -1) {
						devModel = device[x].replace('"dev:model":"','').replace('"','')+ "<br>";
						//writeToScreen(devID);
					}
					if(device[x].search('"devconn:state":"') != -1) {
						devOnlineStatus = "Status:" + device[x].replace('"devconn:state":"','').replace('"','') + "<br>";
						if(devOnlineStatus.search('OFFLINE') != -1){
						devOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:red"></i> <span class="tooltiptext">Offline</span></div>';
						}
						if(devOnlineStatus.search('ONLINE') != -1){
						devOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:green"></i> <span class="tooltiptext">Online</span></div>';
						}
						//writeToScreen(devID);
					}
					if(device[x].search("dev:devtype") != -1) {
						devType = device[x] + "<br>";
						//writeToScreen(devType);
					}
					if(device[x].search("FAVORITE") != -1) {
						devFav= "true";
						//writeToScreen(devType);
					}
					if(device[x].search("CONTROLPANEL") != -1) {
						devCP= "true";
					}
					if(device[x].search('"devadv:added":') != -1){
						if(devTargetDriver != ""){
							if(devCurrentDriver == devTargetDriver){
								devTargetDriver = "Driver up to date <br>";
							}else{
								devTargetDriver = "Driver update needed! <br>";
							}
						}
						var devInfoLink =  devID + "'";
						devInfoLink = "'device.html?devid=" + devInfoLink + '"';
						if(devFav == "true"){
						devIDlist.push(devID);
						devFav = '<span id="FAV' + devID + '">' + '<i onclick="removefromfav(' + devIDlist.length + ')"class="fa fa-heart"></i>' + '</span>';
						}else{
						devIDlist.push(devID);
						devFav = '<span id="FAV' + devID + '">' + '<i onclick="addtofav(' + devIDlist.length + ')"class="fa fa-heart-o" ></i>' + '</span>';
						}
						if(devCP == "true"){
						devIDlist.push(devID);
						devCP = '<span id="CP' + devID + '">' + '<i onclick="removefromcontrolpanel(' + devIDlist.length + ')"class="fa fa-th" style="color:green"></i>' + '</span>';
						}else{
						devIDlist.push(devID);
						devCP = '<span id="CP' + devID + '">' + '<i onclick="addtocontrolpanel(' + devIDlist.length + ')"class="fa fa-th" style="color:red"></i>' + '</span>';
						}
					devNamePassed = "'" + devName + "'";
					HTML = HTML + '<tr><td><span ondblclick="window.location=' + devInfoLink + '>' + devName + '</span></td>' 
					// HTML = HTML + '<td><div class="tooltip"><i ondblclick="window.location=' + devInfoLink + ' class="fa fa-info-circle" style="color:blue"></i> <span class="tooltiptext">Double click for info</span></div> ' + devOnlineStatus + '<br><div class="tooltip"> <i id=' + devIDlist.length + '><i ondblclick="findDev(' + devIDlist.length + ')" class="fa fa-search"></i></i><span class="tooltiptext">Double click to find <br> only works on some devices</span></div>' + ' <div class="tooltip"><i ondblclick="renameDev(' + devIDlist.length + ',' + devNamePassed + ')" class="fa fa-pencil" style="color:orange"></i><span class="tooltiptext">Double click to rename</span></div> <br>' + devFav + '</td>' 
					HTML = HTML + '<td><i ondblclick="window.location=' + devInfoLink + ' class="fa fa-info-circle" style="color:blue"></i> ' + devOnlineStatus + '<br> <i id=' + devIDlist.length + '><i ondblclick="findDev(' + devIDlist.length + ')" class="fa fa-search"></i></i> ' + '<i ondblclick="renameDev(' + devIDlist.length + ',' + devNamePassed + ')" class="fa fa-pencil" style="color:orange"></i> <br> <i ondblclick="removeDev(' + devIDlist.length + ')" class="fa fa-trash-o"></i> ' + devFav + '<br>' + devCP + " " + devLocal + '</td>' 
					+ '<td> ' + devProtocol + '</td>' 
					+ '<td> ' + devSource + '</td>' 
					+ '<td> ' + devSignal + '</td>' 
					+ '<td> ' + devBattery + '</td>' 
					+ '<td> ' + devPower + '</td>' 
					+ '<td> ' + devVendor + '</td>' 
					+ '<td>' + devModel + '</td>'
					+ '<td>' + devUpdateStatus + '</td>'
					+ '<td>' + '<i ondblclick="updateDriver(' + devIDlist.length + ')" >' + devDriverVersion + '.</i>' + '</td></tr>';
					HTMLtable = HTMLtable + HTML;
					HTML = "";
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
							devPresence = "";
							devBrightness = "";
							devSource = "";
							devFav = "";
							devCP = "";
							devName = "";
							devLocal = "";
							devNamePassed = "";
							devThermState = "";
							devVendor = "";
							devModel = "";
							devBattery = "N/A";
							devBatteryNum = "";
							devMotionState = "";
							devOnlineStatus = "";
							devSignal = "N/A";
							devProtocol = "";
							devState = "";
							devType = "";
							devTemp = "N/A";
							devContact = "";
							devPower = "N/A";
							devDriverVersion = "N/A";
							devUpdateStatus = "N/A";
							devCurrentDriver = "";
							devTargetDriver = "";
							devCoolSetPoint = "";
							devHeatSetPoint = "";
					//HTML = HTML + "devtype" + device[x] + "<br>";
					}
				}				
			}
	
	document.getElementById("tbody").innerHTML = HTMLtable + "</tbody></table>";
	$( document ).ready(function() {
    console.log( "Getting sorttable!" );
			$("table").tablesorter({sortList: [[0,0]]})
		// $("a.append").click(appendData);
	$.getScript('assets/js/jquery.tablesorter.js');
});


}