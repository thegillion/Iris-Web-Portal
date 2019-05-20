var HTML = "";
var devicenames = [];
var deviceIDs = [];

function onMhubinfo(evt) {
    if (evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d") != -1) {
        listhubinfo(evt.data)
    }
}

function eventlog(evt) {
    if (evt.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1) {
        savedevices(evt)
        // document.getElementById("eventlog").innerHTML = document.getElementById("eventlog").innerHTML  + evt + "<br>";
    }
    devices = evt.split("},{");
    for (var i = 0; i < devices.length; i++) {
        // document.getElementById("eventlog").innerHTML = '';
        // document.getElementById("eventlog").innerHTML = document.getElementById("eventlog").innerHTML  + devices[i] + "<br>";

        var device = devices[i].split(",");
        for (var x = 0; x < device.length; x++) {
            if (document.getElementById("raw-data").checked) {
                HTML = HTML + device[x];
            } else {
                if (device[x].search('{"type":"base:ValueChange"') != -1) {
                    HTML = HTML + "Value Update from ";
                } else if (device[x].search('"source":"DRIV:dev:') != -1) {
                    var devName = deviceIDs.indexOf(device[x].replace('"source":"DRIV:dev:', '').replace('}}}', "").replace('}', "").replace('"', "").replace('"', "").replace('"', ""));
                    HTML = HTML + devicenames[devName];
                } else if (device[x].search('"attributes":{"') != -1) {
                    var attributes = device[x].replace('"attributes":{"', '').replace('}}}', "").replace('}', "").replace('"', "").replace('"', "").replace('"', "")
                    if (attributes.search('wifi:noise:') != -1) {
                        HTML = HTML + " " + attributes.replace('wifi:noise:', ' wifi noise floor ');
                    } else if (attributes.search('temp:temperature:') != -1) {
                        // HTML = HTML + " " + attributes.replace('temp:temperature:',' temperature ');
                        C = attributes.replace('temp:temperature:', '');
                        var Cf = parseInt(C);
                        F = Cf * 9 / 5 + 32;
                        HTML = HTML + " temperature " + F + "F";
                    } else if (attributes.search('hub4g:signalBars:') != -1) {
                        HTML = HTML + " " + attributes.replace('hub4g:signalBars:', ' 4G modem to ');
                        HTML = HTML + " " + " Bars";
                    } else if (attributes.search('swit:state:') != -1) {
                        HTML = HTML + " " + attributes.replace('swit:state:', ' switch state to ');
                    } else if (attributes.search('mot:motion:') != -1) {
                        HTML = HTML + " " + attributes.replace('mot:motion:', ' motion ');
                    } else if (attributes.search('devconn:signal:') != -1) {
                        HTML = HTML + " " + attributes.replace('devconn:signal:', ' signal ');
                    } else if (attributes.search('devpow:battery:') != -1) {
                        HTML = HTML + " " + attributes.replace('devpow:battery:', ' Battery  ');
                        HTML = HTML + " " + "%";
                    } else if (attributes.search('pow:cumulative:') != -1) {
                        HTML = HTML + " " + attributes.replace('pow:cumulative:', ' power used ');
                        HTML = HTML + " " + " Watt-Hours";
                    } else if (attributes.search('pow:instantaneous:') != -1) {
                        HTML = HTML + " " + attributes.replace('pow:instantaneous:', ' ');
                        HTML = HTML + " " + " Watts";
                    } else {
                        HTML = HTML + " " + device[x].replace('"attributes":{"', '').replace('}}}', "").replace('}', "").replace('"', "").replace('"', "").replace('"', "");
                    }
                } else {
                    // HTML = HTML + " " + device[x];
                }
            }

            // document.getElementById("eventlog").innerHTML = document.getElementById("eventlog").innerHTML  + device[x] + "~~<br>";

            //document.getElementById("eventlog").scrollTop = document.getElementById("eventlog").scrollHeight;
        }
        if (HTML != "") {
            document.getElementById("eventlog").innerHTML = document.getElementById("eventlog").innerHTML + HTML + "<br>";
            if (document.getElementById("follow-log").checked) {
                document.getElementById("eventlog").scrollTop = document.getElementById("eventlog").scrollHeight;
            }
            HTML = '';
        }
    }
}

function savedevices(data) {
    Devices = data.split("},{");
    for (var i = 0; i < Devices.length; i++) {
        var device = Devices[i].split(",");
        for (var x = 0; x < device.length; x++) {
            if (device[x].search("dev:name") != -1) {
                devicenames.push(device[x].replace('"dev:name":"', "").replace('"', '').replace('"', '').replace('"', ''));
            }
            if (device[x].search("DRIV:dev") != -1) {
                deviceIDs.push(device[x].replace('"base:address":"DRIV:dev:', '').replace('"', ''));
            }
        }
    }
}