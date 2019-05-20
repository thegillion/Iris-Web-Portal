var DeviceList = [];
function OnMhistorylistdevices(evt) {
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){		
		listHistoryDevices(evt.data);
	}
}
function listHistoryDevices(devices){
	// document.getElementById("cameras").innerHTML = "";
	Devices = devices.split("},{");
		var devID = "";
		var devName = "";
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
						if(device[x].search("DRIV:dev") != -1) {
							devID = device[x].replace('"base:address":"DRIV:dev:','').replace('"','');
						
						}
						if(device[x].search("dev:name") != -1){
						devName = device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
						
						}
						if(device[x].search('"devadv:added":') != -1){
							DeviceList.push('<option value="' + devID + '">' + devName + '</option>');
							devID = "";
							devName = "";					
						}			
							
					}
				}
				document.getElementById("Devices").innerHTML = DeviceList.toString().replace(',',"");
}
function callDeviceHistory(){
var deviceIDop = document.getElementById('Devices');
var message = '{"type":"dev:ListHistoryEntries","headers":{"destination":"DRIV:dev:'  + deviceIDop.options[deviceIDop.selectedIndex].value + '","correlationId":"5f7ecb79-ed92-4ef3-8b83-dd8729devhis","isRequest":true},"payload":{"messageType":"dev:ListHistoryEntries","attributes":{"limit":50}}}';
websocket.send(message);
}