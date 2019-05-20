function showValue(ID) {
		var x = document.getElementById(ID).value;
		document.getElementById(ID + "Value").innerHTML = x;
}
function saveSettings() {
	var IRLEDMODE = document.getElementById('IRLEDMODE');
	var LEDLuminance = document.getElementById('LED-Luminance');
	var MDmode = document.getElementById('MDmode');
	var mdThreshold =  document.getElementById('mdThreshold').value;
	var mdSensitivity =  document.getElementById('mdSensitivity').value;
	var message = '{"type":"hubsercomm:setCustomAttrs","headers":{"destination":"SERV:' + HubIDG + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325setcam","isRequest":true},"payload":{"messageType":"hubsercomm:setCustomAttrs","attributes":{"mac":"'+ camMac + '","irLedMode":' + IRLEDMODE.options[IRLEDMODE.selectedIndex].value + ',"irLedLuminance":' + LEDLuminance.options[LEDLuminance.selectedIndex].value + ',"mdMode":' + MDmode.options[MDmode.selectedIndex].value + ',"mdThreshold":' + mdThreshold + ',"mdSensitivity":' + mdSensitivity + ',"mdWindowCoordinates":"84,38,562,424"}}}';
	websocket.send(message);
	document.getElementById("Loading").innerHTML = '<br><i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <br><br> Saving...';
}
function camReboot() {
	var message = '{"type":"hubsercomm:setCustomAttrs","headers":{"destination":"SERV:' + HubIDG + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325setcam","isRequest":true},"payload":{"messageType":"hubsercomm:reboot","attributes":{"mac":"'+ camMac + '"}}}';
	websocket.send(message);
	document.getElementById("Loading").innerHTML = '<br><i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <br><br> Rebooting...';
}