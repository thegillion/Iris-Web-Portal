var HTML = "";
var HTMLfav = "";
var HTMLfavtable = "";
var Maxtime = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function onMirrigation(evt) {
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
		listirrigation(evt.data)			
	}
}
function listirrigation(devices){
	// document.getElementById("deviceSwitch").innerHTML = "";
	document.getElementById("irrigation").innerHTML = '';
	HTMLfavtable = '<table class="tablesorter"><thead><tr><th><i class="fa fa-sort"></i>Name</th><th>Info</th><th>State</th><th>Control(s)</th></tr></thead>';
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var devBatteryNum = "";
		var devID = "";
		var devFav = "";
		var devBrightness = "";
		var devState = "";
		var devName = "";
		var devThermState = "";
		var devMotionState = "";
		var devIrrigationState = "";
		var devIrrigationStateRaw = "";
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
		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("dev:name") != -1){
					devName = device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("devadv:driverversion") != -1){
					devDriverVersion = "Driver Version:" + device[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"") + "<br>";
					
					}					
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = "Protocol:" + device[x].replace('devadv:protocol":','').replace('"',"") + "<br>"; 
					}
					if(device[x].search("dev:vendor") != -1) {
						devVendor = "Vendor" + device[x].replace(/'"'/g,'').replace(/"dev:vendor"/g,"") + "<br>"; 
					}
					if(device[x].search("irrcont:controllerState") != -1) {
						devIrrigationStateRaw = device[x].replace('"irrcont:controllerState":"','').replace('"',"");
						if(devIrrigationStateRaw == "NOT_WATERING"){
						devIrrigationState = '<i class="fa fa-tint" aria-hidden="true" style="color:red;font-size:24px"></i>';
						}else if(devIrrigationStateRaw == "WATERING"){
						devIrrigationState = '<i class="fa fa-tint" aria-hidden="true" style="color:blue;font-size:24px"></i>';
						}else if(devIrrigationStateRaw == "RAIN_DELAY"){
						devIrrigationState = '<i class="fa fa-clock-o" aria-hidden="true" style="font-size:24px"></i>';
						}else{
						devIrrigationState = devIrrigationStateRaw;
						}
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
						devBattery = device[x].replace('"devpow:','').replace('"',"");
						devBatteryNum = device[x].replace('"devpow:','').replace('"',"").replace('battery:','');
						var B = parseInt(devBatteryNum);
						if(B >= 0){
							devBatteryNum = '<i class="fa fa-battery-empty" style="color:red"></i>';
						}
						if(B >= 25){
							devBatteryNum = '<i class="fa fa-battery-quarter" style="color:orange"></i>';
						}
						if(B >= 50){
							devBatteryNum = '<i class="fa fa-battery-half" ></i>';
						}
						if(B >= 75){
							devBatteryNum = '<i class="fa fa-battery-three-quarters" ></i>';
						}	
						if(B >= 95){
							devBatteryNum = '<i class="fa fa-battery-full" style="color:green"></i>';
						}						
					}				
					if(device[x].search('cont:contact":"') != -1) {
						devContact = device[x].replace('cont:contact','').replace('"',"").replace('":"',"").replace('"',"");
						//writeToScreen(devContact);
					}
					if(device[x].search("devconn:signal") != -1) {
						devSignal = device[x].replace('"devconn:','').replace('"',"") + "<br>"; 
					}
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = "Protocol:" + device[x].replace('devadv:protocol":','').replace('"',"") + '<br>'; 
					}
					if(device[x].search('devota:status') != -1) {
						devUpdateStatus = "FW update**:" + device[x].replace('"devota:status":"','').replace('"',"") + '<br>'; 
					}
					if(device[x].search('"swit:state"') != -1) {
						devState =  "Stated reported:" + device[x].replace('"swit:state":"','').replace('"',"") + "<br>"; 
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
						var devInfoLink =  devID + "'";
						devInfoLink = "'device.html?devid=" + devInfoLink + '"';
						
					
					HTMLfav = HTMLfav + '<tr><td>' + devName + '</td>'
						+ '<td><div class="tooltip"><i ondblclick="window.location=' + devInfoLink + ' class="fa fa-info-circle" style="color:blue"></i><span class="tooltiptext">'
							+ devVendor  
							+ '<div id="BATT' + devID + '">' + devBattery + '</div>' 
							+ devSignal + devProtocol + devModel + devDriverVersion + devUpdateStatus + devTargetDriver 
						+'</span> </div> ' + devOnlineStatus
						+ '<div class="tooltip"><i class="fa fa-book"></i><span class="tooltiptext"><div id="HIST' + devID + '">No History Found.</div></span> </div>'
						+ ' <div class="tooltip">' + devBatteryNum + '<span class="tooltiptext"><div id="BATT' + devID + '">' + devBattery + '</div></span> </div></td>'
						if (devType.search("Irrigation") != -1){
							HTMLfav = HTMLfav + '<td><div id="Irrigation' + devID + '">' + devIrrigationState + '</div>'
							if (devIrrigationStateRaw == "WATERING"){
							devIDlist.push(devID);
							HTMLfav = HTMLfav + '<td> <span id="IRRSWITCH' + devID + '"><i onclick="stopIrrigation(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:24px"></i></span></td> </tr>';
							}else{
							devIDlist.push(devID);
							HTMLfav = HTMLfav + '<td> <span id="IRRSWITCH' + devID + '"><i onclick="startIrrigation(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:24px"></i></span></td> </tr>';
							}
							HTMLfavtable = HTMLfavtable + HTMLfav;
							HTMLfav = '';
						}else{
						HTMLfav = '';
						}
					
							devPresence = "";
							devBrightness = "";
							devFav = "";
							devName = "";
							devThermState = "";
							devVendor = "";
							devModel = "";
							devBattery = "";
							devBatteryNum = "";
							devMotionState = "";
							devIrrigationState = "";
							devIrrigationStateRaw = "";
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
					//HTML = HTML + "devtype" + device[x] + "<br>";
					}
				}				
			}
		document.getElementById("irrigation").innerHTML = HTMLfavtable + "</tbody></table>";
		$( document ).ready(function() {
		console.log( "Getting sorttable!" );
				$("table").tablesorter({sortList: [[0,0]]})
			// $("a.append").click(appendData);
		$.getScript('assets/js/jquery.tablesorter.js');
	});
}
function deviceType(brightness,device,ID,state,devContact){
	if (device.search("Switch") == -1){
		if (device.search("Contact") == -1){
			if (device.search("Keyfob") == -1){
				if (device.search("Camera") == -1){
					if (device.search("Motion") == -1){
						if (device.search("Thermostat") == -1){
							if (device.search("Fan Control") == -1){
								if (device.search("Dimmer") == -1){
									if (device.search("Water Leak") == -1){
										// document.getElementById("deviceUnknown").innerHTML = document.getElementById("deviceUnknown").innerHTML + HTML + "<P>";
										HTMLfav = '';
										}
								}
							}
						}
					}
				}
			}
		}
	}
	if (device.search("Switch") != -1){
		//writeToScreen(ID);
		devIDlist.push(ID);
		 if(state.search("ON") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:72px;color:green"></i></div>'
			 HTML = HTML + '<div id="SWITCH' + ID + '" ><i onclick="turnofflight(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:24px"></i></div>';
		 }		 
		 if(state.search("OFF") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:72px"></i></div>'
			 HTML = HTML + '<div id="SWITCH' + ID + '"><i onclick="turnonlight(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:24px"></i></div>';
		 }
		//HTML = HTML + '<input id="ON' + ID + '" type="button" value="Turn on switch" onclick="turnonlight(' + devIDlist.length + ');">';
		//HTML = HTML + '<input id="OFF' + devIDlist.length + '" type="button" value="Turn off switch" onclick="turnofflight(' + devIDlist.length + ');"> <br>';
		// document.getElementById("switches").innerHTML = document.getElementById("switches").innerHTML + HTML + "<P>";

		HTMLfav = '';
	}else if (device.search("Dimmer") != -1){
		//writeToScreen(ID);
		devIDlist.push(ID);
		 if(state.search("ON") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:72px;color:green"></i></div>'
			 HTML = HTML + '<div id="DIMMER' + ID + '" ><i onclick="turnoffdimmer(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:24px"></i></div><br><input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')">';
		 }		 
		 if(state.search("OFF") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:72px"></i></div>'
			 HTML = HTML + '<div id="DIMMER' + ID + '"><i onclick="turnondimmer(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:24px"></i></div><BR><input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" >';
		 }
		//HTML = HTML + '<input id="ON' + ID + '" type="button" value="Turn on switch" onclick="turnonlight(' + devIDlist.length + ');">';
		//HTML = HTML + '<input id="OFF' + devIDlist.length + '" type="button" value="Turn off switch" onclick="turnofflight(' + devIDlist.length + ');"> <br>';
		// document.getElementById("switches").innerHTML = document.getElementById("switches").innerHTML + HTML + "<P>";
		HTMLfav = '';
	}else if (device.search("Contact") != -1){
		if(devContact.search("CLOSED") != -1){
			 HTMLfav = HTMLfav + '<td><div id="STATE' + ID + '"><i class="fa fa-ellipsis-v" style="font-size:24px"></i><i class="fa fa-ellipsis-v" style="font-size:24px"></i></div></td>' + '<td></td> </tr>';
		 }		 
		 if(devContact.search("OPENED") != -1){
			 HTMLfav = HTMLfav + '<td><div id="STATE' + ID + '"><i class="fa fa-ellipsis-v" style="font-size:24px"></i><i class="fa fa-ellipsis-v" style="font-size:24px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size24px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:24px"></i></div></td>' + '<td></td> </tr>';
		 }
		//writeToScreen(state);
		// document.getElementById("deviceContact").innerHTML = document.getElementById("deviceContact").innerHTML + HTML;
		HTMLfavtable = HTMLfavtable + HTMLfav;
		HTMLfav = "";
	}else if (device.search("Fan Control") != -1){
		//writeToScreen(ID);
		 if(state.search("ON") != -1){
			 HTML = HTML + '<div id="FAN' + ID + '"><i class="fa fa-refresh fa-spin" style="font-size:72px;color:green"></i></div>'
			 HTML = HTML + '<div id="FANSPEED' + ID + '">' + '<i class="fa fa-minus-square"></i>' +devFanSpeed + '<i class="fa fa-plus-square"></i>' + '</div>';
		 }		 
		 if(state.search("OFF") != -1){
			 HTML = HTML + '<div id="FAN' + ID + '"><i class="fa fa-refresh" style="font-size:72px"></i></div>'
			 HTML = HTML + '<div id="FANSPEED' + ID + '">' + '<i class="fa fa-minus-square"></i>' + devFanSpeed + '<i class="fa fa-plus-square"></i>' + '</div>'
		 }
		// document.getElementById("deviceFanControl").innerHTML = document.getElementById("deviceFanControl").innerHTML + HTML + "<P>";
		HTMLfav = '';
	}else if (device.search("Motion") != -1){
		//writeToScreen(ID);
		HTMLfav = HTMLfav + '<td></td> </tr>';
		HTMLfavtable = HTMLfavtable + HTMLfav;
		HTMLfav = '';
	}else if (device.search("Water Leak") != -1){
		//writeToScreen(ID);
		HTMLfav = HTMLfav + '<td></td> </tr>';
		HTMLfavtable = HTMLfavtable + HTMLfav;
		HTMLfav = '';
	}else if (device.search("Thermostat") != -1){
		//writeToScreen(ID);
		// document.getElementById("deviceThermostat").innerHTML = document.getElementById("deviceThermostat").innerHTML + HTML + "<P>";
		HTMLfav = '';
	}else if (device.search("Keyfob") != -1){
		//writeToScreen(ID);
		// document.getElementById("deviceKeyfob").innerHTML = document.getElementById("deviceKeyfob").innerHTML + HTML + "<P>";
		HTMLfav = '';
	}else if (device.search("Camera") != -1){
		//writeToScreen(ID);
		// document.getElementById("deviceCamera").innerHTML = document.getElementById("deviceCamera").innerHTML + '<img src="https://svp.irisbylowes.com/preview/' + placeID + '/' + ID + '" width="100%" height="200">' + HTML + "<P>";
		HTMLfav = '';
	}else{
		//drawHTML(HTML);
	}
 	
}