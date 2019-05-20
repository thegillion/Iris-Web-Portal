var portalVer = "V1.3.4";
//Do not forget the SQL database too.
var placeID;
var message;
var homepage = "false";
var placesA = [];
var wsUri = "wss://localhost:3000/websocket?v=2018.10.2"; // Change this URL to your server one.
// var _paq = _paq || [];
// /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
// _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
// _paq.push(["setCookieDomain", "*.iriswebportal.com"]);
// _paq.push(['trackPageView']);
// _paq.push(['enableLinkTracking']);
// (function() {
// var u="http://piwiki.thoroughbredcomputers.com/";
// _paq.push(['setTrackerUrl', u+'piwik.php']);
// _paq.push(['setSiteId', '2']);
// var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
// g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
// })();
function init() {

    testWebSocket();
    document.getElementById("portalVer").innerHTML = portalVer;
    document.getElementById("portalCON").innerHTML = '<i class="fa fa-connectdevelop" style="font-size:35px;color:yellow"></i> <br> Connecting';
    if (window.location.href.indexOf("index.html") > -1) {
    }
}

function checkUpdate() {
    window.location.reload(true);
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

        console.log("connecter working data");
        // $(document).ready(function () {
        console.log("Doc is ready");
        if (window.location.href.indexOf("index.html") > -1) {
            onMessage(evt);
            OnMfindFav(evt);
            OnMevent(evt);
            onMsystemstat(evt);
        } else if (window.location.href.indexOf("controlpanel.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            OnMfindCP(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("eventlog.html") > -1) {
            onMessage(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("switcheslights.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMswitches(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("irrigation.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMirrigation(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("recordings.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            OnMlistrecording(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("scenes.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMscenes(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("rules.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMrules(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("addrule.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMaddrules(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("signallevel.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMsignallevel(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("powerlevel.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMpowerlevel(evt);
            onUPpowerlevel(evt);
            console.log("Dating coming in from connect");
            homepage = "false"
        } else if (window.location.href.indexOf("energy.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMpowerlevel(evt);
            onUPpowerlevel(evt);
            console.log("Dating coming in from connect");
            homepage = "false"
        } else if (window.location.href.indexOf("temperature.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMtemperaturelevel(evt);
            onTemplevel(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("cameraadv.php") > -1) {
            onMessage(evt);
            OnMevent(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("device.html") > -1) {
            onMessage(evt);
            onMdeviceinfo(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("thermostat.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMthermostat(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("batterylevel.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMbatterylevel(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("fancontrols.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMfancontrols(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("keyfobs.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMkeyfobs(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("cameras.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            OnMlistcam(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("cameraset.php") > -1) {
            onMessage(evt);
            OnMevent(evt);
            OnMlistcamSettings(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("tstatsettings.php") > -1) {
            onMessage(evt);
            OnMevent(evt);
            OnMlistTstatSettings(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("sensors.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMsensors(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("devices.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMdeviceslevel(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("zwavelist.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            onMdeviceslevel(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("history.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            OnMhistorylistdevices(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("devbox.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("hubinfo.html") > -1) {
            onMessage(evt);
            onMhubinfo(evt);
            homepage = "false"
        } else if (window.location.href.indexOf("pair.html") > -1) {
            onMessage(evt);
            OnMevent(evt);
            homepage = "false"
        } else {
            onMessage(evt);
            OnMfindFav(evt);
            OnMevent(evt);
            onMsystemstat(evt);
            // placeID = placeIDG;
            homepage = "true";
        }
        // });

    };
    websocket.onerror = function (evt) {
        onError(evt)
    };
}

function onOpen(evt) {
    document.getElementById("portalCON").innerHTML = '<i class="fa fa-connectdevelop" style="font-size:35px;color:green"></i> <br> Connected';

}

function onClose(evt) {
    document.getElementById("portalCON").innerHTML = '<i class="fa fa-connectdevelop" style="font-size:35px;color:red"></i> <br> You need to <a href="https://proxy.iriswebportal.com/login.php">Login</a>';
}

function onError(evt) {
    document.getElementById("portalCON").innerHTML = '<i class="fa fa-connectdevelop" style="font-size:35px;color:red"></i> <br> You need to <a href="https://proxy.iriswebportal.com/login.php">Login</a>';
}

function onMessage(evt) {
    console.log("On MEssage connect working data");
    if (window.location.href.indexOf("eventlog.html") > -1) {
        eventlog(evt.data);
    }
    if (evt.data.search("2bf5a5e8-62d6-441e-b890-26151e2d72d9") != -1) {
        if (window.location.href.indexOf("history.html") > -1) {
            logFullHistory(evt.data);
        }
        try {
            logHistory(evt.data);
        } catch (err) {
            // document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + err.message;
        }
        // }


    } else {
        message = evt.data.split(",");
        for (var i = 0; i < message.length; i++) {
            if (window.location.href.indexOf("history.html") > -1) {
                console.log("On history page");
                if (message[i].search("personId") != -1) {
                    personID = message[i].replace('"personId":"', '').replace('placeId', "").replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "");
                    // var message = '{"type":"place:ListDashboardEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"c6c54d80-2f5c-4d5b-adf5-e85bca5d1278","isRequest":true},"payload":{"messageType":"place:ListDashboardEntries","attributes":{"limit":50}}}';
                    var message = '{"type":"sess:Tag","headers":{"destination":"SERV:sess:","correlationId":"3569d7c0-d395-45ed-9438-ed8f5259599d","isRequest":true},"payload":{"messageType":"sess:Tag","attributes":{"name":"history.filter.day.yesterday","context":{"person.id":"' + personID + '","place.id":"' + placeID + '"}}}}';
                    console.log(message);
                    websocket.send(message);
                    var message = '{"type":"place:ListHistoryEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"2bf5a5e8-62d6-441e-b890-26151e2d72d9","isRequest":true},"payload":{"messageType":"place:ListHistoryEntries","attributes":{"limit":1000}}}';
                    websocket.send(message);
                }
            }

            if (message[i].search("places") != -1) {
                for (var x = 0; x < message.length; x++) {
                    if (message[x].search("personId") != -1) {
                        console.log("Found personID");
                        personID = message[x].replace('"personId":"', '').replace('placeId', "").replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "");
                    }
                    if (message[x].search('placeName":"') != -1) {
                        placeName = message[x].replace('"placeName":"', '').replace('placeId', "").replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "");
                        placesA.push('<option value="' + placeID + '">' + placeName + '</option>');

                    }
                    if (message[x].search('{"placeId":"') != -1) {
                        placeID = message[x].replace('"places":[{"placeId', '').replace('placeId', "").replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "");

                    }
                }
                document.getElementById("places").innerHTML = placesA.toString().replace(',', "");
                if (localStorage != null) {
                    if (localStorage["places"] != null) {
                        document.getElementById("places").selectedIndex = localStorage["places"];
                    }
                }

                var e = document.getElementById("places");
                placeID = e.options[e.selectedIndex].value;
                placeIDG = e.options[e.selectedIndex].value;
                if (window.location.href.indexOf("device.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"base:GetAttributes","headers":{"destination":"DRIV:dev:' + devIDweb + '","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("recordings.html") > -1) {
                    console.log("Sending recording command");
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"video:PageRecordings","headers":{"destination":"SERV:video:","correlationId":"b1a56f26-99fb-4423-b493-528c6065a7ed","isRequest":true},"payload":{"messageType":"video:PageRecordings","attributes":{"all":false,"type":"RECORDING","limit":100,"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("rules.html") > -1) {
                    console.log("Sending recording command");
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"rule:ListRules","headers":{"destination":"SERV:rule:","correlationId":"90704a94-ba52-4252-816b-e5680e7999a0","isRequest":true},"payload":{"messageType":"rule:ListRules","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("cameraset.php") > -1) {
                    console.log("Found page Camera Settings");
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"base:GetAttributes","headers":{"destination":"DRIV:dev:' + camID + '","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                    websocket.send(message);
                    // var message = '{"type":"base:GetAttributes","headers":{"destination":"DRIV:dev:'+ camID +'","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';

                } else if (window.location.href.indexOf("tstatsettings.php") > -1) {
                    console.log("Found page Camera Settings");
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"base:GetAttributes","headers":{"destination":"DRIV:dev:' + tStatID + '","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("powerlevel.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"1237772e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("energy.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"1237772e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("temperature.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"1237772e-57f8-47d1-8002-5fe59d341234","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);

                } else if (window.location.href.indexOf("addrule.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"rule:ListRuleTemplates","headers":{"destination":"SERV:rule:","correlationId":"f6f7829b-ab0f-4223-b649-41f1fd7609ab","isRequest":true},"payload":{"messageType":"rule:ListRuleTemplates","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("index.html") > -1) {
                    // { MAY NEED TO RE-ADD
                    // var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    // websocket.send(message);
                    // var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    // websocket.send(message);
                    // }
                    // var message = '{"type":"place:ListDashboardEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"c6c54d80-2f5c-4d5b-adf5-e85bca5d1278","isRequest":true},"payload":{"messageType":"place:ListDashboardEntries","attributes":{"limit":50}}}';
                    var message = '{"type":"place:ListHistoryEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"2bf5a5e8-62d6-441e-b890-26151e2d72d9","isRequest":true},"payload":{"messageType":"place:ListHistoryEntries","attributes":{"limit":25}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("history.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    // var message = '{"type":"place:ListDashboardEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"c6c54d80-2f5c-4d5b-adf5-e85bca5d1278","isRequest":true},"payload":{"messageType":"place:ListDashboardEntries","attributes":{"limit":50}}}';
                    var message = '{"type":"sess:Tag","headers":{"destination":"SERV:sess:","correlationId":"3569d7c0-d395-45ed-9438-ed8f5259599d","isRequest":true},"payload":{"messageType":"sess:Tag","attributes":{"name":"history.filter.day.yesterday","context":{"person.id":"' + personID + '","place.id":"' + placeID + '"}}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListHistoryEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"2bf5a5e8-62d6-441e-b890-26151e2d72d9","isRequest":true},"payload":{"messageType":"place:ListHistoryEntries","attributes":{"limit":1000}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                } else if (window.location.href.indexOf("scenes.html") > -1) {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                    websocket.send(message);
                    var message = '{"type":"scene:ListScenes","headers":{"destination":"SERV:scene:","correlationId":"68c97150-d5d2-4717-ae94-bf9e2457ed5d","isRequest":true},"payload":{"messageType":"scene:ListScenes","attributes":{"placeId":"' + placeID + '"}}}';
                    console.log(message);
                    websocket.send(message);
                    var message = '{"type":"place:ListHistoryEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"2bf5a5e8-62d6-441e-b890-26151e2d72d9","isRequest":true},"payload":{"messageType":"place:ListHistoryEntries","attributes":{"limit":1000}}}';
                    websocket.send(message);
                } else {
                    var message = '{"type":"sess:SetActivePlace","headers":{"destination":"SERV:sess:","correlationId":"78f7d29a-222e-4976-9d2b-d1f553cf8881","isRequest":true},"payload":{"messageType":"sess:SetActivePlace","attributes":{"placeId":"' + placeID + '"}}}';
                    websocket.send(message);
                    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
                    websocket.send(message);
                    // var message = '{"type":"place:ListDashboardEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"c6c54d80-2f5c-4d5b-adf5-e85bca5d1278","isRequest":true},"payload":{"messageType":"place:ListDashboardEntries","attributes":{"limit":100}}}';
                    var message = '{"type":"place:ListHistoryEntries","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"2bf5a5e8-62d6-441e-b890-26151e2d72d9","isRequest":true},"payload":{"messageType":"place:ListHistoryEntries","attributes":{"limit":200}}}';
                    websocket.send(message);
                    var message = '{"type":"base:GetAttributes","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"74cb2fe5-3c80-4294-bf36-e6a6a5faf08a","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                    websocket.send(message);
                }
                var message = '{"type":"place:GetHub","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"78cd5c7c-f5f7-4dba-9032-99ad183e64be","isRequest":true},"payload":{"messageType":"place:GetHub","attributes":{}}}';
                websocket.send(message);
                // var message = '{"type":"rule:ListRules","headers":{"destination":"SERV:rule:","correlationId":"90704a94-ba52-4252-816b-e5680e7999a0","isRequest":true},"payload":{"messageType":"rule:ListRules","attributes":{"placeId":"' + placeID + '"}}}';
                // websocket.send(message);

            }
            if (message[i].search("GetHubResponse") != -1) {
                console.log("GetHubResponse");
                for (var x = 0; x < message.length; x++) {
                    if (message[x].search('"base:id":"') != -1) {
                        HubID = "Hub ID:" + message[x].replace('"base:id":"', '').replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "") + '<br>';
                        HubIDclean = message[x].replace('"base:id":"', '').replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "");
                        if (window.location.href.indexOf("devbox.html") > -1) {
                            hubID = HubIDclean;
                        }
                    }
                    if (message[x].search('"hubadv:bootloaderVer":"') != -1) {
                        HubFW = "Hub FW:" + message[x].replace('"hubadv:bootloaderVer":"', '').replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "") + '<br>';
                        HubFWclean = message[x].replace('"hubadv:bootloaderVer":"', '').replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "");
                        if (window.location.href.indexOf("hubinfo.html") > -1) {
                            var message = '{"type":"base:GetAttributes","headers":{"destination":"SERV:' + HubIDclean + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                            websocket.send(message);
                        }
                        if (homepage == "true") {

                            HubIDG = HubIDclean;
                            var message = '{"type":"base:GetAttributes","headers":{"destination":"SERV:' + HubIDclean + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffddd","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                            websocket.send(message);
                            var message = '{"type":"subs:ListSubsystems","headers":{"destination":"SERV:subs:","correlationId":"19341945-b970-42a5-bda7-884c50abff8e","isRequest":true},"payload":{"messageType":"subs:ListSubsystems","attributes":{"placeId":"' + placeID + '"}}}';
                            websocket.send(message);
                            console.log(message);
                            console.log("Sub System command sent");
                        }
                        if (window.location.href.indexOf("cameraadv.php") > -1) {
                            HubIDG = HubIDclean;
                        }
                        if (window.location.href.indexOf("cameraset.php") > -1) {
                            HubIDG = HubIDclean;
                            var message = '{"type":"base:GetAttributes","headers":{"destination":"SERV:' + HubIDclean + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325camhub","isRequest":true},"payload":{"messageType":"base:GetAttributes","attributes":{}}}';
                            websocket.send(message);
                        }
                        // writeLogToScreen(HubID);
                    }
                    if (message[x].search('"hub:state":"') != -1) {
                        HubState = "Hub State:" + message[x].replace('"hub:state":"', '').replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "") + '<br>';
                        // writeLogToScreen(HubID);
                    }
                    if (message[x].search('"hub:name":"') != -1) {
                        HubName = "Hub Name :" + message[x].replace('"hub:name":"', '').replace('"', "").replace('{', "").replace(':', "").replace('"', "").replace('"', "").replace('"', "") + '<br>';
                        // writeLogToScreen(HubID);
                    }
                }
                document.getElementById("fmVer").innerHTML = HubFW;
                console.log("Check portal vs");
                //This code is to check the portal for updates
                //If you uncomment this code it will reload loop the page is not setup right.
                // if(localStorage["autoupdate"] == "true") {
                // $.get("portalcheck.php", function(data){
                // if( portalVer == data){
                // }else{
                // document.getElementById("portalVer").innerHTML = "Updating portal";
                // window.location.reload(true);
                // }
                // });
                // }
                var something = $('.input').val();
                $.ajax({
                    url: '/updatefw.php',
                    type: 'POST',
                    data: 'FW=' + HubFWclean + '&HUBID=' + HubIDclean + '&key=HMNBNjdfgs826sghws',
                    success: function (data) {
                        $('.display_div').html(data);
                    }
                });
            }
        }
    }
}

function remember(index) {
    ListDevices();
    if (localStorage != null) {
        localStorage["places"] = index;
    }
}

function autoUpdate(boolen) {


}

function ListDevices() {
    var e = document.getElementById("places");
    placeID = e.options[e.selectedIndex].value;
    var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"6606672e-57f8-47d1-8002-5fe59d34c1d8","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
    websocket.send(message);
}

window.addEventListener("load", init, false);