var DeviceList = {};

function OnMhistorylistdevices(evt) {
    if (evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1) {
        listHistoryDevices(evt.data);
    }
}

function listHistoryDevices(devices) {
    var deviceList = JSON.parse(devices).payload.attributes.devices

    for (var i = 0; i < deviceList.length; i++) {
        DeviceList[deviceList[i]["dev:name"]] = deviceList[i]["base:address"].replace('DRIV:dev:', '')
    }

    deviceListHtml = '';
    for (device in DeviceList) {
        deviceListHtml += '<option value="' + DeviceList[device] + '">' + device + '</option>'
    }

    document.getElementById("Devices").innerHTML = deviceListHtml
}

function callDeviceHistory() {
    var deviceIDop = document.getElementById('Devices');
    var message = '{"type":"dev:ListHistoryEntries","headers":{"destination":"DRIV:dev:' + deviceIDop.options[deviceIDop.selectedIndex].value + '","correlationId":"5f7ecb79-ed92-4ef3-8b83-dd8729devhis","isRequest":true},"payload":{"messageType":"dev:ListHistoryEntries","attributes":{"limit":50}}}';
    websocket.send(message);
}