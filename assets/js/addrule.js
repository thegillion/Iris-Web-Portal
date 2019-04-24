var HTML = "";
var HTMLtable = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function onMaddrules(evt) {
// document.getElementById("log").innerHTML = "logging";
	if(evt.data.search("f6f7829b-ab0f-4223-b649-41f1fd7609ab") != -1){
	document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "message received";
		listaddrules(evt.data);
	}
	if(evt.data.search("fee68dff-3041-4d2f-94c0-d5fce612069a") != -1){
		document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "Template message received";
		makeRuleTemplate(evt.data);
		
	}
}
function makeRuleTemplate(devices){
	document.getElementById("ruletemplate").innerHTML = "";
	document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "processing GRRRR!S";
	HTMLtable = '<table><thead><tr><th>Add</th><th>Rule Name</th><th>Rule Description</th></tr></thead><tbody><tr>';
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var ruleSate = "";
		var ruleTemplate = "";
		var ruleName = "";
		var ruleID = "";
		var ruleDescription = "";


		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
		
			var device = Devices[i].split('},');
				for (var x = 0; x < device.length; x++) {
					document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>  <br>" + device[x];
				}
							
			}
			document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "template draw on screen";
			document.getElementById("tbody").innerHTML = HTMLtable + "</tr></tbody></table>";
		}
function getRuleTemplate(ID,ruleTemplateN){
document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "Hiding table";
document.getElementById("tbody").style.display = 'none';
document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "Asking for template " + devIDlist[(ID - 1)];
document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "Full template <Br>" + ruleTemplates[(ruleTemplateN - 1)];
var message = '{"type":"ruletmpl:Resolve","headers":{"destination":"SERV:ruletmpl:' + devIDlist[(ID - 1)] + '","correlationId":"fee68dff-3041-4d2f-94c0-d5fce612069a","isRequest":true},"payload":{"messageType":"ruletmpl:Resolve","attributes":{"placeId":"7f2e6ee6-b695-4820-8846-9fcba70059f9"}}}';
websocket.send(message);
document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + message;

}
function listaddrules(devices){
	// document.getElementById("deviceSwitch").innerHTML = "";
	document.getElementById("tbody").innerHTML = "";
	document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "processing";
	HTMLtable = '<table><thead><tr><th>Add</th><th>Rule Name</th><th>Rule Description</th></tr></thead><tbody><tr>';
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var ruleSate = "";
		var ruleTemplate = "";
		var ruleName = "";
		var ruleID = "";
		var ruleDescription = "";

		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("ruletmpl:description") != -1){
					ruleDescription = device[x].replace('"ruletmpl:description":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("base:id") != -1){
					ruleID = device[x].replace('"base:id":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					devIDlist.push(ruleID);
					}
					if(device[x].search("ruletmpl:template") != -1){
					ruleTemplate = device[x].replace('"ruletmpl:template":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					ruleTemplates.push(ruleTemplate);
					}
					if(device[x].search("rule:state") != -1){
					
					ruleSate = device[x].replace('"rule:state":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
						
					}
					if(device[x].search("ruletmpl:name") != -1){
					ruleName = device[x].replace('"ruletmpl:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					HTML = HTML + '<tr><td><i onclick="getRuleTemplate(' + devIDlist.length +','+ ruleTemplates.length +')" class="fa fa-plus-circle"></i></td>'
					+ '<td>' + ruleName + '</td>'
					+ '<td>' + ruleDescription + '</td></tr>';
					HTMLtable = HTMLtable + HTML;
					HTML = "";
					// deviceType(devSignal,devType,devID,devState,devContact);
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
					ruleSate = "";
					ruleTemplate = "";
					ruleName = "";
					ruleID = "";
					ruleDescription = "";
					//HTML = HTML + "devtype" + device[x] + "<br>";
					}
				}
							
			}
			document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + "<br>" + "rules draw on screen";
			document.getElementById("tbody").innerHTML = HTMLtable + "</tr></tbody></table>";
		}