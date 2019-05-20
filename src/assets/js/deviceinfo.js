var HTML = "";
var devices = [];

function onMdeviceinfo(evt) {
    if (evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d") != -1) {
        listdeviceinfo(evt.data)
    }
}

function listdeviceinfo(evt) {
    devices = evt.split("},{");
    for (var i = 0; i < devices.length; i++) {
        document.getElementById("deviceinfo").innerHTML = '<span style="color: blue;">Device:</span>';
        var device = devices[i].split(",");
        for (var x = 0; x < device.length; x++) {
            document.getElementById("deviceinfo").innerHTML = document.getElementById("deviceinfo").innerHTML + device[x] + '<br>';
        }
    }
}
