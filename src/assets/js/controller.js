var brightness = "";
function turnonlight(ID) {
	if(window.location.href.indexOf("controlpanel.html") > -1) {
	document.getElementById("STATE" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnofflight(' + ID + ')"class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:yellow"></i>';
	}else{
	document.getElementById("SWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnofflight(' + ID + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
	}
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"790525f5-171f-4533-a952-0dcafb9b5310","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"ON"}}}';
	websocket.send(message);
}
function turnofflight(ID) {
	if(window.location.href.indexOf("controlpanel.html") > -1) {
	document.getElementById("STATE" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnonlight(' + ID + ')"class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:yellow"></i>';
	}else{
	document.getElementById("SWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnonlight(' + ID + ')" class="fa fa-toggle-on" style="font-size:24px"></i>';
	}
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"280df3eb-dd38-4e5b-959a-56584e204437","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"OFF"}}}';
	websocket.send(message);
}
function turnonrule(ID) {
	document.getElementById("RULE" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnoffrule(' + ID + ')"class="fa fa-check-circle-o" style="font-size:24px"></i>';
	var message = '{"type":"rule:Enable","headers":{"destination":"SERV:rule:' + devIDlist[(ID - 1)] + '","correlationId":"81e9e8ac-6acb-40e3-830d-b5664d8c8774","isRequest":true},"payload":{"messageType":"rule:Enable","attributes":{}}}';
	websocket.send(message);
}
function turnoffrule(ID) {
	document.getElementById("RULE" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnonrule(' + ID + ')" class="fa fa-circle-o" style="font-size:24px"></i>';
	var message = '{"type":"rule:Disable","headers":{"destination":"SERV:rule:' + devIDlist[(ID - 1)] + '","correlationId":"37303758-570c-4791-a307-708333fc23d7","isRequest":true},"payload":{"messageType":"rule:Disable","attributes":{}}}';
	websocket.send(message);
}
function turnondimmer(ID) {
	brightness =  document.getElementById('DIM' + devIDlist[(ID - 1)]).value;
	if(window.location.href.indexOf("controlpanel.html") > -1) {
	document.getElementById("DIMMER" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnoffdimmer(' + ID + ')"class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i>';
	}else{
	document.getElementById("DIMMER" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnoffdimmer(' + ID + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
	}
	document.getElementById("DIM" + devIDlist[(ID - 1)]).innerHTML = '<input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + ID + ')>';
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"790525f5-171f-4533-a952-0dcafb9b5310","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"dim:brightness":' + brightness +',"swit:state":"ON"}}}';
	websocket.send(message);
}
function turnoffdimmer(ID) {
	if(window.location.href.indexOf("controlpanel.html") > -1) {
	document.getElementById("DIMMER" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnondimmer(' + ID + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i>';
	}else{
	document.getElementById("DIMMER" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnondimmer(' + ID + ')" class="fa fa-toggle-on" style="font-size:24px"></i>';
	}
	document.getElementById("DIM" + devIDlist[(ID - 1)]).innerHTML = '<input id="DIM' + ID + '" type="range" min="0" value="' + brightness + '" max="100" data-show-value="true" onchange="turnondimmer(' + ID + ')>';
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"280df3eb-dd38-4e5b-959a-56584e204437","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"OFF"}}}';
	websocket.send(message);
}
function setfanspeed(ID,speed) {
	document.getElementById("FANSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnofffan(' + ID + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"cd872dba-549f-4e4f-bbf7-772efeeab9ce","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"fan:speed":'+ speed + ',"swit:state":"ON"}}}';
	websocket.send(message);
}
function turnonfan(ID) {
	if(window.location.href.indexOf("controlpanel.html") > -1) {
	document.getElementById("FANSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnofffan(' + ID + ')"class="fa fa-toggle-off" style="font-size:' + iconsize + 'px"></i>';
	}else{
	document.getElementById("FANSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnofffan(' + ID + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
	}
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"cd872dba-549f-4e4f-bbf7-772efeeab9ce","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"ON"}}}';
	websocket.send(message);
}
function turnofffan(ID) {
	if(window.location.href.indexOf("controlpanel.html") > -1) {
	document.getElementById("FANSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnonfan(' + ID + ')" class="fa fa-toggle-on" style="font-size:' + iconsize + 'px"></i>';
	}else{
	document.getElementById("FANSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="turnonfan(' + ID + ')" class="fa fa-toggle-on" style="font-size:24px"></i>';
	}
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"cd872dba-549f-4e4f-bbf7-772efeeab9ce","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"swit:state":"OFF"}}}';
	websocket.send(message);
}
function addtofav(ID) {
	if(window.location.href.indexOf("devices.html") > -1) {
	document.getElementById("FAV" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="removefromfav(' + ID + ')"class="fa fa-heart"></i>';
	}else{
	document.getElementById("FAV" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="removefromfav(' + ID + ')"class="fa fa-heart" style="font-size:24px"></i>';
	}
	var message = '{"type":"base:AddTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"908b2bc7-6c4a-4183-8830-50af23e653d4","isRequest":true},"payload":{"messageType":"base:AddTags","attributes":{"tags":["FAVORITE"]}}}';
	websocket.send(message);
}
function removefromfav(ID) {
	if(window.location.href.indexOf("devices.html") > -1) {
	document.getElementById("FAV" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="addtofav(' + ID + ')"class="fa fa-heart-o"></i>';
	}else{
	document.getElementById("FAV" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="addtofav(' + ID + ')"class="fa fa-heart-o" style="font-size:24px"></i>';
	}
	var message = '{"type":"base:RemoveTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"16d84879-bf56-4726-9060-6fbd5c96f66f","isRequest":true},"payload":{"messageType":"base:RemoveTags","attributes":{"tags":["FAVORITE"]}}}';
	websocket.send(message);
}
function addtocontrolpanel(ID) {
	if(window.location.href.indexOf("devices.html") > -1) {
	document.getElementById("CP" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="removefromcontrolpanel(' + ID + ')"class="fa fa-th" style="color:green"></i>';
	}else{
	document.getElementById("CP" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="removefromcontrolpanel(' + ID + ')"class="fa fa-th" style="color:green;font-size:24px"></i>';
	}
	var message = '{"type":"base:AddTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"908b2bc7-6c4a-4183-8830-50af23e653d4","isRequest":true},"payload":{"messageType":"base:AddTags","attributes":{"tags":["CONTROLPANEL"]}}}';
	websocket.send(message);
}
function removefromcontrolpanel(ID) {
	if(window.location.href.indexOf("devices.html") > -1) {
	document.getElementById("CP" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="addtocontrolpanel(' + ID + ')"class="fa fa-th" style="color:red"></i>';
	}else{
	document.getElementById("CP" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="addtocontrolpanel(' + ID + ')"class="fa fa-th" style="color:red;font-size:24px"></i>';
	}
	var message = '{"type":"base:RemoveTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"16d84879-bf56-4726-9060-6fbd5c96f66f","isRequest":true},"payload":{"messageType":"base:RemoveTags","attributes":{"tags":["CONTROLPANEL"]}}}';
	websocket.send(message);
}
function findDev(ID) {
	document.getElementById(ID).innerHTML = '<i onclick="addtofav(' + ID + ') "class="fa fa-magic"></i>';
	var message = '{"type":"base:RemoveTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"16d84879-bf56-4726-9060-6fbd5c96find","isRequest":true},"payload":{"messageType":"ident:Identify","attributes":{}}}';
	websocket.send(message);
}
function removeDev(ID) {
	if (confirm("This will remove this device \nThis can not be undone!") == true) {
		var message = '{"type":"base:RemoveTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"16d84879-bf56-4726-9060-6fbd5cremove","isRequest":true},"payload":{"messageType":"dev:ForceRemove","attributes":{}}}';
		websocket.send(message);
		location.reload();
	}
}
function updateDriver(ID) {
	if (confirm("You have found update driver \n Do this at your own risk!") == true) {
		// var message = '{"type":"base:RemoveTags","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"16d84879-bf56-4726-9060-6fbd5cremove","isRequest":true},"payload":{"messageType":"dev:ForceRemove","attributes":{}}}';
		var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"ea62c031-92a0-4053-a305-0597745c8971","isRequest":true},"payload":{"messageType":"devadv:UpgradeDriver","attributes":{}}}';
		websocket.send(message);
		// location.reload();
	}
}
function saveACFilterType(ID) {
var ACFilter = prompt("Enter your filter size and Iris will save it for you.");
	if (ACFilter != null) {
		var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID)] + '","correlationId":"e2c24c37-03f4-468e-ba1f-dde3f51b9e2a","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"therm:filtertype":"' + ACFilter + '"}}}';
		console.log(message);
		websocket.send(message);
		location.reload();
	}
}
function resetAC(ID) {
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"e2c24c37-03f4-468e-ba1f-dde3f51b9eac","isRequest":true},"payload":{"messageType":"therm:changeFilter","attributes":{}}}';
	websocket.send(message);
	console.log(message);
	location.reload();
}
function startIrrigation(ID) {
	var duration = prompt("How many minutes would you like to water ?", "5");
	var message = '{"type":"irrcont:WaterNowV2","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"548de878-d333-4248-8866-f08b757657ea","isRequest":true},"payload":{"messageType":"irrcont:WaterNowV2","attributes":{"zone":"z1","duration":' + duration +'}}}';
	websocket.send(message);
	document.getElementById("Irrigation" + devIDlist[(ID - 1)]).innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>';
	document.getElementById("IRRSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="stopIrrigation(' + ID + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
	console.log(message);
}
function stopIrrigation(ID) {
	var message = '{"type":"irrcont:CancelV2","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"548de878-d333-4248-8866-f08b757657ea","isRequest":true},"payload":{"messageType":"irrcont:CancelV2","attributes":{"zone":"z1"}}}';
	websocket.send(message);
	document.getElementById("IRRSWITCH" + devIDlist[(ID - 1)]).innerHTML = '<i onclick="startIrrigation(' + ID + ')"class="fa fa-toggle-on" style="font-size:24px"></i>';
	document.getElementById("Irrigation" + devIDlist[(ID - 1)]).innerHTML = '<i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>';
	console.log(message);
}
function renameDev(ID,oldName) {
	var newName = prompt("Please enter new device name.", oldName);
	if (newName != null) {
	var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + devIDlist[(ID - 1)] + '","correlationId":"419be102-c36f-4e4d-94d3-e51018800943","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"dev:name":"' + newName +' "}}}';
	websocket.send(message);
		if(window.location.href.indexOf("pair.html") > -1) {
			document.getElementById("NAME" + devIDlist[(ID - 1)]).innerHTML = newName;
		}else{
			location.reload();
		}
    }
}
