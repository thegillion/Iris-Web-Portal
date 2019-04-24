var HTML = "";
var HTMLtable = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function onMrules(evt) {
	if(evt.data.search("90704a94-ba52-4252-816b-e5680e7999a0") != -1){
		listrules(evt.data);
	}
}
function listrules(devices){
	// document.getElementById("deviceSwitch").innerHTML = "";
	document.getElementById("tbody").innerHTML = "";
	// document.getElementById("deviceUnknown").innerHTML = "";
	// document.getElementById("deviceContact").innerHTML = "";
	// document.getElementById("deviceKeyfob").innerHTML = "";
	// document.getElementById("deviceCamera").innerHTML = "";
	// document.getElementById("deviceThermostat").innerHTML = "";
	// document.getElementById("deviceFanControl").innerHTML = "";
	HTMLtable = '<table class="tablesorter"><thead><tr><th>Rule State</th><th><i class="fa fa-sort"></i> Rule Name</th><th><i class="fa fa-sort"></i> Rule Description</th><th>Delete Rule</th></tr></thead><tbody>';
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var ruleSate = "";
		var ruleFiring = "";
		var ruleName = "";
		var ruleID = "";
		var ruleDescription = "";

		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("rule:name") != -1){
					ruleName = device[x].replace('"rule:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("base:id") != -1){
					ruleID = device[x].replace('"base:id":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("_firing") != -1){
					ruleFiring = device[x].replace('"_firing":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
						if(ruleFiring.search('false') != -1){
							ruleFiring = '<i class="fa fa-gear"></i></i>';
							}
						if(ruleFiring.search('true') != -1){
							ruleFiring = '<i class="fa fa-gear fa-spin"></i>';
							}
						}
					if(device[x].search("rule:state") != -1){
					
					ruleSate = device[x].replace('"rule:state":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
						
					}
					if(device[x].search("rule:description") != -1){
					ruleDescription = device[x].replace('"rule:description":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					devIDlist.push(ruleID);
					if(ruleSate.search('DISABLED') != -1){
							ruleSate = '<span id="RULE' + ruleID + '"><i onclick="turnonrule(' + devIDlist.length + ')" class="fa fa-circle-o" style="font-size:24px"></i></span>';
							}
						if(ruleSate.search('ENABLED') != -1){
							ruleSate = '<span id="RULE' + ruleID + '"><i onclick="turnoffrule(' + devIDlist.length + ')" class="fa fa-check-circle-o" style="font-size:24px"></i></span>';
							}
					HTML = HTML + '<tr><td>' + ruleSate + ' </td>'
					+ '<td>' + ruleName + '</td>'
					+ '<td>' + ruleDescription + '</td>'
					+ '<td> <i ondblclick="deleteRule(' + "'" + ruleID + "'" + ')" class="fa fa-trash" style="font-size:24px"></i></td></tr>';
					HTMLtable = HTMLtable + HTML;
					HTML = "";
					// deviceType(devSignal,devType,devID,devState,devContact);
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
					ruleSate = "";
					ruleFiring = "";
					ruleName = "";
					ruleID = "";
					ruleDescription = "";
					//HTML = HTML + "devtype" + device[x] + "<br>";
					}
				}
							
			}
			document.getElementById("tbody").innerHTML = HTMLtable + "</tbody></table>";
			$( document ).ready(function() {
				console.log( "Getting sorttable!" );
				$("table").tablesorter({sortList: [[1,0]]})
				// $("a.append").click(appendData);
				$.getScript('assets/js/jquery.tablesorter.js');
				});
		}
		
function deleteRule(RuleID){
var message = '{"type":"rule:Delete","headers":{"destination":"SERV:rule:' + RuleID + '","correlationId":"ceccc454-07e7-4da1-8708-9e202726f0b7","isRequest":true},"payload":{"messageType":"rule:Delete","attributes":{}}}';
websocket.send(message);
window.location.reload(true);
}