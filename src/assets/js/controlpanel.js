var HTML = "";
var HTMLcp = "";
var HTMLCPtable = "";
var cellCount = 0;

var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function OnMfindCP(evt) {
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
						if(localStorage!=null) {
						  if(localStorage["fontsize"]!=null) {
							document.getElementById("fontsizeDD").selectedIndex = localStorage["fontsize"];
						  }
						}
		var y = document.getElementById("fontsizeDD");
		iconsize = y.options[y.selectedIndex].value;
		listDevices(evt.data)						
	}
}
function listDevices(devices){
	// document.getElementById("deviceSwitch").innerHTML = "";
	//document.getElementById("controlpanel").innerHTML = "";
	HTMLCPtable = '';
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var devBatteryNum = "";
		var devBrightness = "";
		var devID = "";
		var devFav = "";
		var devCP = "";
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
						devCoolSetPoint = '<span class="fa-stack fa-2x"><i class="fa fa-gear fa-stack-1x" style="font-size:50px;color:blue"></i>  <i class="fa fa-circle fa-stack-1x" style="font-size:30px;color:white"></i>  <i class="fa-stack-2x" style="font-size:12px;color:blue">' + Math.round(F) + 'F</i></span>';
						//writeToScreen(devTemp);
					}	
					if(device[x].search("therm:heatsetpoint") != -1){
					C = device[x].replace('"therm:heatsetpoint":',"").replace('"','').replace('"','').replace('"','');
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						//writeToScreen(Cf * 9 / 5 + 32);
						devHeatSetPoint = '<span class="fa-stack fa-2x"><i class="fa fa-gear fa-stack-1x" style="font-size:50px;color:red"></i>  <i class="fa fa-circle fa-stack-1x" style="font-size:30px;color:white"></i>  <i class="fa-stack-2x" style="font-size:12px;color:red">' + Math.round(F) + 'F</i></span>';
					}						
					if(device[x].search("therm:active") != -1){
					devThermState = "HVAC Status:" + device[x].replace(/'"'/g,'').replace('"therm:active":"',"").replace('"',"") + "<br>";
						if(devThermState.search('NOTRUNNING') != -1){
							devThermState = '<i class="fa fa-gear" style="font-size:' + iconsize + 'px"></i></i> <br>';
							}
						if(devThermState.search('RUNNING') != -1){
							devThermState = '<i class="fa fa-gear fa-spin" style="font-size:' + iconsize + 'px"></i><br>';
							}
						}
					if(device[x].search("devadv:driverversion") != -1){
					devDriverVersion = "Driver Version:" + device[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"") + "<br>";
					
					}					
					if(device[x].search('"mot:motion":"') != -1){
					devContact = "Motion Status:" + device[x].replace(/'"'/g,'').replace('"mot:motion":"',"").replace('"',"") + "<br>";
					
						// if(devMotionState.search('NONE') != -1){
							// devMotionState = '<i class="fa fa-circle" style="font-size:' + iconsize + 'px"></i>';
							// }
						// if(devMotionState.search('DETECTED') != -1){
							// devMotionState = '<i class="fa fa-rss" style="font-size:' + iconsize + 'px;color:green">';
							// }
						}				
					if(device[x].search('pres:presence":"') != -1){
						devPresence = device[x].replace('pres:presence":"','').replace('"',"").replace('"',"");
						if(devPresence.search('ABSENT') != -1){
						// devPresence = KeyFobEG[Math.floor(Math.random()*KeyFobEG.length)] +'<br>';
						}
						if(devPresence.search('PRESENT') != -1){
						devPresence = '<i class="fa fa-home" style="font-size:' + iconsize + 'px"></i>';
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
						devOnlineStatus = '<i class="fa fa-exchange" style="color:red"></i> ';
						}
						if(devOnlineStatus.search('ONLINE') != -1){
						devOnlineStatus = '<i class="fa fa-exchange" style="color:green"></i>';
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
					if(devCP == "true"){
						if(cellCount >= 4){
						HTMLcp = HTMLcp + gridlist[cellCount];
						cellCount = 0
						console.log("HTML data " + HTMLcp);
						console.log("cell Count " + cellCount);
						}else{
						HTMLcp = HTMLcp + gridlist[cellCount];
						cellCount = cellCount + 1;
						console.log("HTML data " + HTMLcp);
						console.log("cell Count " + cellCount);
						}
						HTMLcp = HTMLcp + '<center>';
						deviceType(devBrightness,devCP,devType,devID,devState,devContact);
						HTMLcp = HTMLcp + '<B>'+ devOnlineStatus + ' ' + devBatteryNum + '<br>' + devName + '</B> </center> </div>';
						HTMLCPtable = HTMLCPtable + HTMLcp;
						HTMLcp = "";
					}
						// + '<td><div class="tooltip"><i ondblclick="window.location=' + devInfoLink + ' class="fa fa-info-circle" style="color:blue"></i><span class="tooltiptext">'
							// + devVendor  
							// + '<div id="TEMP' + devID + '">' + devTemp + '</div>' 
							// + '<div id="BATT' + devID + '">' + devBattery + '</div>' 
							// + devSignal + devProtocol + devModel + devDriverVersion + devUpdateStatus + devTargetDriver 
						// +'</span> </div> ' + devOnlineStatus
						// + '<div class="tooltip"><i class="fa fa-book"></i><span class="tooltiptext"><div id="HIST' + devID + '">No History Found.</div></span> </div>'
						// + ' <div class="tooltip">' + devBatteryNum + '<span class="tooltiptext"><div id="BATT' + devID + '">' + devBattery + '</div></span> </div></td>'
						// if (devType.search("Thermostat") != -1){
						// HTMLcp = HTMLcp + '</td><td><div id="HVAC' + devID + '">' + devThermState +'</div></td><td>' + devHeatSetPoint + devCoolSetPoint + '</td>'
						// }
						// if (devType.search("Motion") != -1){
						// HTMLcp = HTMLcp + '<td><div id="Motion' + devID + '">' + devMotionState + '</div>'
						// }
					
							devPresence = "";
							devBrightness = "";
							devFav = "";
							devCP = "";
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
	if(HTMLCPtable == '')
	{
		HTMLcp = HTMLcp + '<h3>Otto Mation broke your control panel...<br> No you just need to add device by using the <a href="devices.html">All Devices</a> page .</h3>'
		HTMLCPtable = HTMLCPtable + HTMLcp;
	}
	document.getElementById("controlpanel").innerHTML = HTMLCPtable + "</tbody></table>";
}
function deviceType(brightness,fav,device,ID,state,devContact){
	if (device.search("Switch") == -1){
		if (device.search("Contact") == -1){
			if (device.search("Keyfob") == -1){
				if (device.search("Camera") == -1){
					if (device.search("Motion") == -1){
						if (device.search("Thermostat") == -1){
							if (device.search("Fan Control") == -1){
								if (device.search("Light") == -1){
									if (device.search("Dimmer") == -1){
										if (device.search("Halo") == -1){
											if(fav == "true"){
												HTMLcp = HTMLcp + ''
												HTMLCPtable = HTMLCPtable + HTMLcp;
												
											}
										//HTMLcp = "";
										}
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
			 HTMLcp = HTMLcp + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:green"></i></div>'
			 HTMLcp = HTMLcp + '<div id="SWITCH' + ID + '" ><i onclick="turnofflight(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i></div>';
		 }		 
		 if(state.search("OFF") != -1){
			 HTMLcp = HTMLcp + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px"></i></div>'
			 HTMLcp = HTMLcp + '<div id="SWITCH' + ID + '"><i onclick="turnonlight(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i></div>';
		 }
	}else if (device.search("Dimmer") != -1){
		devIDlist.push(ID);
		 if(state.search("ON") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:green"></i></div></td>'
			 HTMLcp = HTMLcp + '<br>'
			 HTMLcp = HTMLcp + '<td><div id="DIMMER' + ID + '" ><i onclick="turnoffdimmer(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i></div> <br> <input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')">';
		 }		 
		 if(state.search("OFF") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px"></i></div></td>'
			 HTMLcp = HTMLcp + '<br>'
			 HTMLcp = HTMLcp + '<td><div id="DIMMER' + ID + '"><i onclick="turnondimmer(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i></div> <BR> <input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')">';
		 }
	}else if (device.search("Halo") != -1){
		devIDlist.push(ID);
		 if(state.search("ON") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:green"></i></div></td>'
			 HTMLcp = HTMLcp + '<td><div id="DIMMER' + ID + '" ><i onclick="turnoffdimmer(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i></div><br><input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')"></td></tr>';
		 }		 
		 if(state.search("OFF") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px"></i></div></td>'
			 HTMLcp = HTMLcp + '<td><div id="DIMMER' + ID + '"><i onclick="turnondimmer(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i></div><BR><input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')"></td></tr>';
		 }
	}else if (device.search("Light") != -1){
		devIDlist.push(ID);
		 if(state.search("ON") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:green"></i></div></td>'
			 HTMLcp = HTMLcp + '<td><span id="DIMMER' + ID + '" ><i onclick="turnoffdimmer(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i></span> <BR> <input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')"></td></tr>';
		 }		 
		 if(state.search("OFF") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:' + iconsize + 'px"></i></div></td>'
			 HTMLcp = HTMLcp + '<td><span id="DIMMER' + ID + '"><i onclick="turnondimmer(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i></span> <BR> <input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + devIDlist.length + ')"></td></tr>';
		 }
		
	}else if (device.search("Contact") != -1){
		if(devContact.search("CLOSED") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i></div></td>' + '<td></td> </tr>';
		 }		 
		 if(devContact.search("OPENED") != -1){
			 HTMLcp = HTMLcp + '<td><div id="STATE' + ID + '"><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size48px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i></div></td>' + '<td></td> </tr>';
		 }
	}else if (device.search("Fan Control") != -1){
	devIDlist.push(ID);
		var FanSpeed = 0;
		if(parseInt(devFanSpeed) == 1){
			FanSpeed = parseInt(devFanSpeed);
			devFanSpeed = fanSpeeds[parseInt(devFanSpeed) -1];
			devFanSpeed = '<i onclick="turnofffan(' + devIDlist.length + ')" class="fa fa-minus-square"></i>' + devFanSpeed + '<i onclick="setfanspeed(' + devIDlist.length + ',' + [FanSpeed + 1] +  ')" class="fa fa-plus-square"></i>'
		}else if(parseInt(devFanSpeed) == 2){
			FanSpeed = parseInt(devFanSpeed);
			devFanSpeed = fanSpeeds[parseInt(devFanSpeed) -1];
			devFanSpeed = '<i onclick="setfanspeed(' + devIDlist.length + ',' + [FanSpeed - 1] +  ')" class="fa fa-minus-square"></i>' + devFanSpeed + '<i onclick="setfanspeed(' + devIDlist.length + ',' + [FanSpeed + 1] +  ')" class="fa fa-plus-square"></i>'
		}else if(parseInt(devFanSpeed) == 3){
			FanSpeed = parseInt(devFanSpeed);
			devFanSpeed = fanSpeeds[parseInt(devFanSpeed) -1];
			devFanSpeed = '<i onclick="setfanspeed(' + devIDlist.length + ',' + [FanSpeed - 1] +  ')" class="fa fa-minus-square"></i>' + devFanSpeed + '<i onclick="setfanspeed(' + devIDlist.length + ',' + FanSpeed +  ')" class="fa fa-plus-square"></i>'
		}else{
			devFanSpeed = fanSpeeds[parseInt(devFanSpeed) -1];
		}
		 if(state.search("ON") != -1){
			 HTMLcp = HTMLcp + '<div id="FAN' + ID + '"><i class="fa fa-refresh fa-spin" style="font-size:' + iconsize + 'px;color:green"></i></div>'
			 HTMLcp = HTMLcp + '<span id="FANSPEED' + ID + '">' + devFanSpeed + '</span>';
			 HTMLcp = HTMLcp + '<br>'
			 HTMLcp = HTMLcp + ' <span id="FANSWITCH' + ID + '" ><i onclick="turnofffan(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i></span>';
			
		 }		 
		 if(state.search("OFF") != -1){
			 HTMLcp = HTMLcp + '<div id="FAN' + ID + '"><i class="fa fa-refresh" style="font-size:' + iconsize + 'px"></i></div>'
			 HTMLcp = HTMLcp + '<span id="FANSPEED' + ID + '">' + devFanSpeed + '</span> '
			 HTMLcp = HTMLcp + '<br>'
			 HTMLcp = HTMLcp + '<span id="FANSWITCH' + ID + '"> <i onclick="turnonfan(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i></span>';
		 }
	}else if (device.search("Motion") != -1){					
						if(devContact.search('NONE') != -1){
							 HTMLcp = HTMLcp + '<td><div id="Motion' + ID + '"><i class="fa fa-circle" style="font-size:' + iconsize + 'px"></i></div></td>' + '<td></td> </tr>';
							}
						if(devContact.search('DETECTED') != -1){
							HTMLcp = HTMLcp + '<td><div id="Motion' + ID + '"><i class="fa fa-rss" style="font-size:' + iconsize + 'px;color:green"></i></div></td>' + '<td></td> </tr>';
							}

	}else if (device.search("Thermostat") != -1){

	}else if (device.search("Keyfob") != -1){

	}else if (device.search("Camera") != -1){
	HTMLcp = HTMLcp + '<a href="https://svp.irisbylowes.com/preview/' + placeID + '/' + ID + '"  class="image fit"><img src="https://svp.irisbylowes.com/preview/' + placeID + '/' + ID + '" ></a>';

	}else{
		//drawHTML(HTML);
	}
 	
}
function rememberfont(index) {
  if(localStorage!=null) {
    localStorage["fontsize"] = index;
  }
  ListDevices();
}