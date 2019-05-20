var HTML = "";
var devices = [];

function onMdeviceinfo(evt) {
    eventMessage = JSON.parse(evt.data)
    if (eventMessage.type == 'base:GetAttributesResponse') {
        listdeviceinfo(eventMessage)
    }
}

function listdeviceinfo(evt) {
    document.getElementById("deviceinfo").innerHTML = document.getElementById("deviceinfo").innerHTML + '<pre>' + JSON.stringify(evt.payload.attributes, null, '  ') + '</pre><br>'
}
