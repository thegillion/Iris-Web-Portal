var HTML = "";
var devices = [];
function onMhubinfo(evt) {
	if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d") != -1){
		listhubinfo(evt.data)			
	}
}
function listhubinfo(evt) {
devices = evt.split("},{");
		for (var i = 0; i < devices.length; i++) {
			document.getElementById("hubinfo").innerHTML = '<span style="color: blue;">Hub:</span>';
			var device = devices[i].split(",");
			for (var x = 0; x < device.length; x++) {
				document.getElementById("hubinfo").innerHTML = document.getElementById("hubinfo").innerHTML + device[x] + '<br>';
			}
		}
}
