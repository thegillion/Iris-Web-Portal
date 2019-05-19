var HTML = "";
var HTMLtable = "";
var tableArray = [];
function onMpair(evt) {
	if(evt.search('"source":"DRIV:dev:') != -1){
		showNewDevice(evt);
		console.log( "Found new device that was added." );
	}
}
function showNewDevice(devices){
	document.getElementById("pairingTable").innerHTML = "";
	HTMLtable = '<table><thead><th> Name</th><th>Actions</th><th> Protocol</th><th> Powered By</th><th> Vendor</th><th> Model</th></tr></thead><tbody>';
	Devices = devices.split("},{");
		var devBatteryNum = "";
		var devID = "";
		var devFav = "";
		var devBrightness = "";
		var devState = "";
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
					if(device[x].search("dev:vendor") != -1) {
						devVendor = device[x].replace('"','').replace(':','').replace('devvendor":"',"").replace('"',''); 
					}
					if(device[x].search("dev:model") != -1) {
						devModel = device[x].replace('"dev:model":"','').replace('"','');
					}
					if(device[x].search("FAVORITE") != -1) {
						devFav= "true";
					}
					if(device[x].search("dev:name") != -1){
						devName = device[x].replace('"dev:name":"',"").replace('"','').replace('"','').replace('"','');
						devName = devName.replace('\u0027',"'");
					}
					if(device[x].search("devadv:driverversion") != -1){
						devDriverVersion = "Driver Version:" + device[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"") + "<br>";
					}
					if(device[x].search("DRIV:dev") != -1) {
						devID = device[x].replace('"base:address":"DRIV:dev:','').replace('"','');
					}
					if(device[x].search('devpow:source"') != -1) {
						devSource = device[x].replace('"devpow:source":"','').replace('"',""); 
					}
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = device[x].replace('devadv:protocol":','').replace('"',""); 
					}
					if(device[x].search("devadv:added") != -1){
					var devInfoLink =  devID + "'";
						devInfoLink = "'device.php?devid=" + devInfoLink + '"';
						if(devFav == "true"){
						devIDlist.push(devID);
						devFav = '<span id="FAV' + devID + '">' + '<i onclick="removefromfav(' + devIDlist.length + ')"class="fa fa-heart"></i>' + '</span>';
						}else{
						devIDlist.push(devID);
						devFav = '<span id="FAV' + devID + '">' + '<i onclick="addtofav(' + devIDlist.length + ')"class="fa fa-heart-o" ></i>' + '</span>';
						}
					devNamePassed = "'" + devName + "'";
					HTML = '<tr><td><span id="NAME' + devID + '">' + devName + '</span> </td>'
					+ '<td><i ondblclick="window.location=' + devInfoLink + ' class="fa fa-info-circle" style="color:blue"></i> <i id=' + devIDlist.length + '><i ondblclick="findDev(' + devIDlist.length + ')" class="fa fa-search"></i></br> ' + '<i ondblclick="renameDev(' + devIDlist.length + ',' + devNamePassed + ')" class="fa fa-pencil" style="color:orange"></i> ' + devFav + '</td>' 
					+ '<td>' + devProtocol + '</td>'
					+ '<td>' + devSource + '</td>'
					+ '<td>' + devVendor + '</td>'
					+ '<td>' + devModel + '</td></tr>'
					HTMLtable = HTMLtable + HTML;
					HTML = "";
					// deviceType(devSignal,devType,devID,devState,devContact);
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
							devPresence = "";
							devBrightness = "";
							devSource = "";
							devFav = "";
							devName = "";
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
							devDriverVersion = "";
							devUpdateStatus = "N/A";
							devCurrentDriver = "";
							devTargetDriver = "";
							devCoolSetPoint = "";
							devHeatSetPoint = "";
					//HTML = HTML + "devtype" + device[x] + "<br>";
					}
				}
							
			}
			document.getElementById("pairingTable").innerHTML = HTMLtable + "</tbody></table>";
		}
function startPairing(){
placeIDG = document.getElementById("places").options[document.getElementById("places").selectedIndex].value
var message = '{"type":"place:StartAddingDevices","headers":{"destination":"SERV:place:' + placeIDG + '","correlationId":"54d63b37-cc68-4e63-ae1b-f66330065c6d","isRequest":true},"payload":{"messageType":"place:StartAddingDevices","attributes":{"time":300000}}}';
websocket.send(message);
}
function stopPairing(){
placeIDG = document.getElementById("places").options[document.getElementById("places").selectedIndex].value
var message = '{"type":"place:StopAddingDevices","headers":{"destination":"SERV:place:' + placeIDG + '","correlationId":"931588b4-deed-4d79-a48d-1e5109b725da","isRequest":true},"payload":{"messageType":"place:StopAddingDevices","attributes":{}}}';
websocket.send(message);
}