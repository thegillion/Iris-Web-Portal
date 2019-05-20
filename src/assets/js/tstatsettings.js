var HTMLcam = "";
var filterSize = "";
var daysSinceFilterChange = "";
var runTimeSinceFilterChange = "";
var filterLifeSpanDays = "";


function OnMlistTstatSettings(evt) {
	if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d") != -1){		
		listTstatSettings(evt.data);
	}
}
function listTstatSettings(devices){
	Devices = devices.split("},{");
		var devID = "";
		var devName = "";
		var devName = "";
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("dev:name") != -1){
					devName = device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("therm:filtertype") != -1){
					filterSize = device[x].replace('"therm:filtertype":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("therm:dayssincefilterchange") != -1){
					daysSinceFilterChange = device[x].replace('"therm:dayssincefilterchange":',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("therm:filterlifespandays") != -1){
					filterLifeSpanDays = device[x].replace('"therm:filterlifespandays":',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("therm:runtimesincefilterchange") != -1){
					runTimeSinceFilterChange = device[x].replace('"therm:runtimesincefilterchange":',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}	
					if(device[x].search('"devadv:added":') != -1){
					document.getElementById("tStatName").innerHTML = devName;				
					document.getElementById("filterSize").value = filterSize;			
					document.getElementById("filterlifespandays").value = filterLifeSpanDays;			
					document.getElementById("dayssincefilterchange").innerHTML = daysSinceFilterChange;			
					document.getElementById("runtimesincefilterchange").innerHTML = runTimeSinceFilterChange;			
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
							devName = "";
							devID = "";
					//HTMLcam = HTMLcam + "devtype" + device[x] + "<br>";
					}
				}				
			}	
					
}
function saveTstatSettings() {
var message = '{"type":"base:SetAttributes","headers":{"destination":"DRIV:dev:' + tStatID + '","correlationId":"e2c24c37-03f4-468e-ba1f-dde3f51b9e2a","isRequest":true},"payload":{"messageType":"base:SetAttributes","attributes":{"therm:filterlifespandays":"' + document.getElementById("filterlifespandays").value + '","therm:filtertype":"' + document.getElementById("filterSize").value + '"}}}';
console.log(message);
websocket.send(message);
// window.location.reload(true);
}