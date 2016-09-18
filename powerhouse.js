var wsUri = "wss://bc.irisbylowes.com/websocket";
var output;
var Devices = [];
var devIDlist = [];
var HTML = "";
var placeID;
var placesA = [];
var placeName;
var KeyFobEG = ['<div class="tooltip"><i class="fa fa-briefcase" style="font-size:72px"></i><br><span class="tooltiptext"> Work Sweet Work</span></div><br>',
'<div class="tooltip"><i class="fa fa-space-shuttle" style="font-size:72px"></i><br><span class="tooltiptext">Dave: Open the pod bay doors, HAL.<br>HAL: Im sorry, Dave. Im afraid I cant do that.<br>Dave: Whats the problem?<br>HAL: I think you know what the problem is just as well as I do. <br><B>This Fob is Now Away</b></span></div><br>',
'<div class="tooltip"><i class="fa fa-ship" style="font-size:72px"></i><br><span class="tooltiptext">IM ON A BOAT! <br> should be back soon.</span></div><br>',
'<div class="tooltip"><i class="fa fa-fax" style="font-size:72px"></i><br><span class="tooltiptext">Heading back in time to get a fax.</span></div><br>',
'<div class="tooltip"><i class="fa fa-binoculars" style="font-size:72px"></i><br><span class="tooltiptext">binoculars thats a fun word.</span></div><br>',
'<div class="tooltip"><i class="fa fa-rocket" style="font-size:72px"></i><br><span class="tooltiptext">One small step for man, One giant leap out the door!</span></div><br>',
'<div class="tooltip"><i class="fa fa-book" style="font-size:72px"></i><br><span class="tooltiptext">Off to read "War and Peace" this may take awhile.</span></div><br>']
function init() {
	output = document.getElementById("output");
	testWebSocket();
	setTimeout(freeRAM, 1200000);
}

function testWebSocket() {
	websocket = new WebSocket(wsUri);
	websocket.onopen = function (evt) {
		onOpen(evt)
	};
	websocket.onclose = function (evt) {
		onClose(evt);
		
	};
	websocket.onmessage = function (evt) {
		onMessage(evt)
	};
	websocket.onerror = function (evt) {
		onError(evt)
	};
}

function onOpen(evt) {
	writeLogToScreen("CONNECTED");	
}

function onClose(evt) {
	writeLogToScreen("DISCONNECTED");
	setTimeout(testWebSocket, 1000);
}

function onMessage(evt) {
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
		listDevices(evt.data)		
	}else{
		var message = evt.data.split(",");
		writeLogToScreen('<span style="color: blue;">RESPONSE:</span>');
		
		for (var i = 0; i < message.length; i++) {
			if(message[i].search("places") != -1){
				for (var x = 0; x < message.length; x++) {
							if(message[x].search('placeName":"') != -1){
								placeName = message[x].replace('"placeName":"','').replace('placeId',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
								placesA.push('<option value="' + placeID + '">' + placeName + '</option>');
								writeLogToScreen("placeName:" + placeName);
								
							}
							if(message[x].search('{"placeId":"') != -1){
								placeID = message[x].replace('"places":[{"placeId','').replace('placeId',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
								
								writeLogToScreen("placeID:" + placeID);
								
							}
						}
						document.getElementById("places").innerHTML = placesA.toString().replace(',',"");
				}
			if(message[i].search('"source":"DRIV:dev') != -1){
				var tempDevID = message[i].replace('"source":"DRIV:','').replace('"}',"").replace('dev',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
				for (var x = 0; x < message.length; x++) {
							if(message[x].search('temp:temperature') != -1){
								var Temp = message[x].replace('"attributes":{"temp:temperature":','').replace('}}}',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
								var Cf = parseFloat(Temp);
								Temp = Cf * 9 / 5 + 32;
								writeLogToScreen("New temperature info :" + tempDevID + " " + Math.round(Temp));
								document.getElementById("TEMP" + tempDevID).innerHTML = "*Temp reported:" + Math.round(Temp) + "F";
								
							}
							if(message[x].search('devpow:battery') != -1){
								var Battery = message[x].replace('"attributes":{"devpow:battery":','').replace('}}}',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
								writeLogToScreen("New Battery info :" + tempDevID + " " + Battery);	
								document.getElementById("BATT" + tempDevID).innerHTML = "*battery:" + Battery;						
							}							
							if(message[x].search('"mot:motion":"') != -1){
								var State = message[x].replace('"mot:motion":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");
								writeLogToScreen("New Motion info :" + tempDevID + " " + State);	
									if(State.search('DETECTED') != -1){
										document.getElementById("Motion" + tempDevID).innerHTML = '<i class="fa fa-rss" style="font-size:48px;color:green"><br>';
									}else{
										document.getElementById("Motion" + tempDevID).innerHTML = '<i class="fa fa-circle" style="font-size:13px"></i> <br>';
									}															
							}
							if(message[x].search('"swit:state":"') != -1){
								var State = message[x].replace('"swit:state":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");
								writeLogToScreen("New State info :" + tempDevID + " " + State);	
									if(State.search('ON') != -1){
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-power-off" style="font-size:72px;color:green"></i>';
									}else{
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-power-off" style="font-size:72px"></i>';
									}										
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
							if(message[x].search('"cont:contact":"') != -1){
								var State = message[x].replace('"cont:contact":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");
								writeLogToScreen("New Contact state :" + tempDevID + " " + State);	
									if(State.search('OPENED') != -1){
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-ellipsis-v" style="font-size:48px"></i><i class="fa fa-ellipsis-v" style="font-size:48px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:48px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:48px"></i>';
									}else{
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-ellipsis-v" style="font-size:48px"></i><i class="fa fa-ellipsis-v" style="font-size:48px"></i>';
									}										
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
							if(message[x].search('therm:active') != -1){
								var State = message[x].replace('"therm:active":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");
								writeLogToScreen("New therm info :" + tempDevID + " " + State);
									if(State.search('NOTRUNNING') != -1){
										document.getElementById("HVAC" + tempDevID).innerHTML = '<i class="fa fa-gear" style="font-size:72px"></i><br>';
									}									
									if(State.search('RUNNING') != -1){
										document.getElementById("HVAC" + tempDevID).innerHTML = '<i class="fa fa-gear fa-spin" style="font-size:72px"></i><br>';
									}									
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
						}
						//make places HTML
						//document.getElementById("places").innerHTML = placesA.toString().replace(',',"");
				}
				writeLogToScreen('<span style="color: blue;">' + message[i].replace(/","/g,"<br>").replace(/"},{"/g,"") + '</span>');
			}
		
		}
	//writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
	}
function listDevices(devices){
	document.getElementById("deviceSwitch").innerHTML = "";
	document.getElementById("deviceUnknown").innerHTML = "";
	document.getElementById("deviceContact").innerHTML = "";
	document.getElementById("deviceKeyfob").innerHTML = "";
	document.getElementById("deviceCamera").innerHTML = "";
	document.getElementById("deviceThermostat").innerHTML = "";
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		writeLogToScreen('Device arry built');
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
		var devTemp = "";
		var devPresence = "";
		var devContact = "";
		var devDriverVersion = "";
		devIDlist = [];
		var elem = document.getElementById("myBar");
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			if (width >= 100) {
			  clearInterval(id);
			} else {
			  width = i/Devices.length * 100;
			  elem.style.width = width + '%';
			  document.getElementById("label").innerHTML = width * 1  + '%';
			}
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("dev:name") != -1){
					devName = device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}					
					if(device[x].search("therm:active") != -1){
					devThermState = "HVAC Status:" + device[x].replace(/'"'/g,'').replace('"therm:active":"',"").replace('"',"") + "<br>";
					writeLogToScreen(devThermState);
					if(devThermState.search('NOTRUNNING') != -1){
						devThermState = '<i class="fa fa-gear" style="font-size:72px"></i></i> <br>';
						}
					if(devThermState.search('RUNNING') != -1){
						devThermState = '<i class="fa fa-gear fa-spin" style="font-size:72px"></i><br>';
						}
					}
					if(device[x].search("devadv:driverversion") != -1){
					devDriverVersion = "Driver Version:" + device[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"") + "<br>";
					writeLogToScreen(devDriverVersion);
					}					
					if(device[x].search('"mot:motion":"') != -1){
					devMotionState = "Motion Status:" + device[x].replace(/'"'/g,'').replace('"mot:motion":"',"").replace('"',"") + "<br>";
					writeLogToScreen(devMotionState);
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
						devPresence = KeyFobEG[Math.floor(Math.random()*KeyFobEG.length)] +'<br>';
						}
						if(devPresence.search('PRESENT') != -1){
						devPresence = '<i class="fa fa-home" style="font-size:72px"></i> <br>';
						}
						
					}
					if(device[x].search('devadv:protocol"') != -1) {
						devProtocol = "Protocol:" + device[x].replace('devadv:protocol":','').replace('"',"") + "<br>"; 
					}
					if(device[x].search("dev:vendor") != -1) {
						devVendor = "Vendor" + device[x].replace(/'"'/g,'').replace(/"dev:vendor"/g,"") + "<br>"; 
					}
					if(device[x].search("devpow:battery") != -1) {
						devBattery = device[x].replace('"devpow:','').replace('"',"");
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
						devOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:red"></i><span class="tooltiptext"> Offline</span></div><br>';
						}
						if(devOnlineStatus.search('ONLINE') != -1){
						devOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:green"></i><span class="tooltiptext"> Online</span></div><br>';
						}
						//writeToScreen(devID);
					}
					if(device[x].search("dev:devtype") != -1) {
						devType = device[x] + "<br>";
						//writeToScreen(devType);
					}
					if(device[x].search('"devadv:added":') != -1){
					HTML = HTML + "<div id=" + devID + "><div>" + devName 
					+ '<br> <div class="tooltip"><i class="fa fa-info-circle" style="color:blue"></i><span class="tooltiptext">' 
						+ devVendor  
						+ '<div id="TEMP' + devID + '">' + devTemp + '</div>' 
						+ '<div id="BATT' + devID + '">' + devBattery + '</div>' 
						+ devSignal + devProtocol + devModel + devDriverVersion
					+'</span></div> ' + devOnlineStatus
					+ devPresence 
					+ '<div id="HVAC' + devID + '">' + devThermState + '</div>'
					+ '<div id="Motion' + devID + '">' + devMotionState + '</div>';
					deviceType(devType,devID,devState,devContact);
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
							devPresence = "";
							devName = "";
							devThermState = "";
							devVendor = "";
							devModel = "";
							devBattery = "";
							devMotionState = "";
							devOnlineStatus = "";
							devSignal = "";
							devProtocol = "";
							devState = "";
							devType = "";
							devTemp = "";
							devContact = "";
							devDriverVersion = "";
					//HTML = HTML + "devtype" + device[x] + "<br>";
					}
				}				
			}
	myProgress.style.visibility = "hidden";
    systemlog();	
					
}
function deviceType(device,ID,state,devContact){
	if (device.search("Switch") == -1){
		if (device.search("Contact") == -1){
			if (device.search("Keyfob") == -1){
				if (device.search("Camera") == -1){
					if (device.search("Motion") == -1){
						if (device.search("Thermostat") == -1){
							document.getElementById("deviceUnknown").innerHTML = document.getElementById("deviceUnknown").innerHTML + HTML + "<P>";
							HTML = "";
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
			 HTML = HTML	 + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:72px;color:green"></i></div>'
			 HTML = HTML + '<div id="SWITCH' + ID + '" ><i onclick="turnofflight(' + devIDlist.length + ')" class="fa fa-toggle-off" style="font-size:24px"></i></div>';
		 }		 
		 if(state.search("OFF") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-power-off" style="font-size:72px"></i></div>'
			 HTML = HTML + '<div id="SWITCH' + ID + '"><i onclick="turnonlight(' + devIDlist.length + ')" class="fa fa-toggle-on" style="font-size:24px"></i></div>';
		 }
		//HTML = HTML + '<input id="ON' + ID + '" type="button" value="Turn on switch" onclick="turnonlight(' + devIDlist.length + ');">';
		//HTML = HTML + '<input id="OFF' + devIDlist.length + '" type="button" value="Turn off switch" onclick="turnofflight(' + devIDlist.length + ');"> <br>';
		document.getElementById("deviceSwitch").innerHTML = document.getElementById("deviceSwitch").innerHTML + HTML + "<P>";
		HTML = "";
	}else if (device.search("Contact") != -1){
		if(devContact.search("CLOSED") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-ellipsis-v" style="font-size:48px"></i><i class="fa fa-ellipsis-v" style="font-size:48px"></i></div>';
		 }		 
		 if(devContact.search("OPENED") != -1){
			 HTML = HTML + '<div id="STATE' + ID + '"><i class="fa fa-ellipsis-v" style="font-size:48px"></i><i class="fa fa-ellipsis-v" style="font-size:48px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:48px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:48px"></i></div>'
		 }
		//writeToScreen(state);
		document.getElementById("deviceContact").innerHTML = document.getElementById("deviceContact").innerHTML + HTML + "<P>";
		HTML = "";
	}else if (device.search("Motion") != -1){
		//writeToScreen(ID);
		document.getElementById("deviceContact").innerHTML = document.getElementById("deviceContact").innerHTML + HTML + "<P>";
		HTML = "";
	}else if (device.search("Thermostat") != -1){
		//writeToScreen(ID);
		document.getElementById("deviceThermostat").innerHTML = document.getElementById("deviceThermostat").innerHTML + HTML + "<P>";
		HTML = "";
	}else if (device.search("Keyfob") != -1){
		//writeToScreen(ID);
		document.getElementById("deviceKeyfob").innerHTML = document.getElementById("deviceKeyfob").innerHTML + HTML + "<P>";
		HTML = "";
	}else if (device.search("Camera") != -1){
		//writeToScreen(ID);
		document.getElementById("deviceCamera").innerHTML = document.getElementById("deviceCamera").innerHTML + '<img src="https://svp.irisbylowes.com/preview/' + placeID + '/' + ID + '" width="100%" height="200">' + HTML + "<P>";
		HTML = "";
	}else{
		//drawHTML(HTML);
	}
 	
}
function turnonlight(ID) {
	writeLogToScreen(devIDlist[(ID - 1)]);
	document.getElementById("SWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnofflight(' + ID + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"790525f5-171f-4533-a952-0dcafb9b5310","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"ON"}}}';
	websocket.send(message);
	writeLogToScreen("SENT: " + message);
}
function turnofflight(ID) {
	writeLogToScreen(devIDlist[(ID - 1)]);
	document.getElementById("SWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnonlight(' + ID + ')" class="fa fa-toggle-on" style="font-size:24px"></i>';
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"280df3eb-dd38-4e5b-959a-56584e204437","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"OFF"}}}';
	websocket.send(message);
	writeLogToScreen("SENT: " + message);
}

function onError(evt) {
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data  + 'You have not logged into iris. <a href="https://bc.irisbylowes.com/login">Login</a>');
}
function drawHTML(html) {
	document.getElementById("deviceUnknown").innerHTML = html;
}
function freeRAM() {
	setTimeout(freeRAM, 30000);
	ListDevices();
	document.getElementById("log").innerHTML = "";
	writeLogToScreen("Cleaned RAM");
}

function doSend(message) {
	websocket.send(message);
	writeLogToScreen("SENT: " + message);
}
function checkUpdate() {
window.location.reload(true);
}

function sendAdd(symbol) {
	var message = '{"command":"add", "tickerSymbol":"' + symbol + '"}';
	websocket.send(message);
	writeLogToScreen("SENT: " + message);
}
function ListDevices() {
	myProgress.style.visibility = "visible";	
	var e = document.getElementById("places");
	placeID = e.options[e.selectedIndex].value;
	var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
	websocket.send(message);
	writeLogToScreen("LDSENT: " + message);
}
function systemlog(placeId) {
	var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
	websocket.send(message);
	writeLogToScreen("SENT: " + message);
}

function sendRemove(symbol) {
	var message = '{"command":"remove", "tickerSymbol":"' + symbol + '"}'
	websocket.send(message);
	writeLogToScreen("SENT: " + message);
}


function writeToScreen(message) {
	var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = message;
	output.appendChild(pre);
}
function showBugs() {
    alert("This is the known bugs on the page \n Device protocol not showing up right \n Keyfob showing home.");
}
function partyTime() {
    alert("Coming soon.");
	
}
function showCameras() {
    window.location.href = '/iris_portal/cameras.html';
	
}
function writeLogToScreen(message) {
	document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
	document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + message;
}

window.addEventListener("load", init, false);
