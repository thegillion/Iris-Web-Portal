var HTML = "";
var HTMLtable = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
function onMscenes(evt) {
	if(evt.data.search("68c97150-d5d2-4717-ae94-bf9e2457ed5d") != -1){
		listScenes(evt.data);
	}
}
function listScenes(devices){
	document.getElementById("tbody").innerHTML = "";
	HTMLtable = '<table><thead><tr><th>Scene Action</th><th><i class="fa fa-sort"></i> Scene Name</th><th>Delete Scene</th></tr></thead><tbody>';
	Devices = devices.split("},{");
		var ruleSate = "";
		var ruleFiring = "";
		var sceneName = "";
		var sceneID = "";
		var ruleDescription = "";
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("scene:name") != -1){
					sceneName = device[x].replace('"scene:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					}
					if(device[x].search("base:id") != -1){
					sceneID = device[x].replace('"base:id":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
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
					if(device[x].search("scene:enabled") != -1){
					ruleDescription = device[x].replace('"rule:description":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					devIDlist.push(sceneID);
					HTML = HTML + '<tr><td><i onclick="fireScene(' + "'" + sceneID + "'" + ')" class="fa fa-play-circle-o" style="font-size:24px"></i> </td>'
					+ '<td>' + sceneName + '</td>'
					+ '<td> <i ondblclick="deleteScene(' + "'" + sceneID + "'" + ')" class="fa fa-trash" style="font-size:24px"></i> </td></tr>';
					HTMLtable = HTMLtable + HTML;
					HTML = "";
					// deviceType(devSignal,devType,devID,devState,devContact);
					// + '<div id="CONTACT' + devID + '">' + devContact + '</div>'
					ruleSate = "";
					ruleFiring = "";
					sceneName = "";
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
		
function deleteScene(RuleID){
var message = '{"type":"scene:Delete","headers":{"destination":"SERV:scene:' + RuleID + '","correlationId":"ceccc454-07e7-4da1-8708-9e202726f0b7","isRequest":true},"payload":{"messageType":"scene:Delete","attributes":{}}}';
websocket.send(message);
window.location.reload(true);
}
function fireScene(SceneID){
var message = '{"type":"scene:Fire","headers":{"destination":"SERV:scene:' + SceneID + '","correlationId":"0baf2727-0724-4b6e-81ce-0261226a6092","isRequest":true},"payload":{"messageType":"scene:Fire","attributes":{}}}';
websocket.send(message);
window.location.reload(true);
}