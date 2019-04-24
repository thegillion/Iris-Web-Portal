var HTML = "";
var HTMLtable = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function onMsignallevel(evt) {
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
		listsignallevel(evt.data);
	}
}
function listsignallevel(devices){
	// document.getElementById("deviceSwitch").innerHTML = "";
	document.getElementById("tbody").innerHTML = "";
	HTMLtable = '<table class="tablesorter"><thead><tr><th><i class="fa fa-sort"></i> Signal Level</th><th><i class="fa fa-sort"></i> Device Name</th></tr></thead><tbody>';
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
					devDriverVersion = "Driver Version:" + device[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"") + "<br>";
					
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
					if(device[x].search('"dim:brightness":') != -1) {
						devBrightness = device[x].replace('"dim:brightness":','').replace('"',""); 
					}
					if(device[x].search('fan:speed') != -1) {
						devFanSpeed = device[x].replace('"fan:speed":','').replace('"',"");
						devFanSpeed = fanSpeeds[parseInt(devFanSpeed) -1];
					}
					if(device[x].search("dev:vendor") != -1) {
						devVendor = "Vendor" + device[x].replace(/'"'/g,'').replace(/"dev:vendor"/g,"") + "<br>"; 
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
					if(device[x].search("devconn:signal") != -1) {
						devSignal = device[x].replace('"devconn:','').replace('"',"").replace('signal:',"") + "%"; 
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
					if(device[x].search("FAVORITE") != -1) {
						devFav= "true";
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
					HTML = HTML + '<tr><td>' + devSignal + '</td>'
					+ '<td>' + devName + '</td></tr>';
					deviceType(devSignal,devType,devID,devState,devContact);
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
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
	
	document.getElementById("tbody").innerHTML = HTMLtable + "</tbody></table>";
			$( document ).ready(function() {
		console.log( "Getting sorttable!" );
				$("table").tablesorter({debug: true})
			$("a.append").click(appendData);
		$.getScript('assets/js/jquery.tablesorter.js');
	});
}
function deviceType(signal,device,ID,state,devContact){
	if (device.search("Switch") == -1){
		if (device.search("Contact") == -1){
			if (device.search("Keyfob") == -1){
				if (device.search("Camera") == -1){
					if (device.search("Motion") == -1){
						if (device.search("Thermostat") == -1){
							if (device.search("Fan Control") == -1){
								if (device.search("Dimmer") == -1){
									if(signal != 0){
										HTMLtable = HTMLtable + HTML;
									}
									HTML = "";
								}
							}
						}
					}
				}
			}
		}
	}
	if (device.search("Switch") != -1){
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}

		HTML = "";
	}else if (device.search("Dimmer") != -1){
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else if (device.search("Contact") != -1){
		//writeToScreen(state);
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else if (device.search("Fan Control") != -1){
		//writeToScreen(ID);
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else if (device.search("Motion") != -1){
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else if (device.search("Thermostat") != -1){
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else if (device.search("Keyfob") != -1){
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else if (device.search("Camera") != -1){
		if(signal != 0){
		HTMLtable = HTMLtable + HTML;
		}
		HTML = "";
	}else{
		//drawHTML(HTML);
	}
 	
}