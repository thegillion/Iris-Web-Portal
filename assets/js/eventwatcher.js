var support = '';
function download(text, filename){
  var blob = new Blob([text], {type: "text/plain"});
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
function b64DecodeUnicode(str) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
function OnMevent(evt) {
console.log("Event watcher working data");
	if(evt.data.search("1236672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
	
	}else if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325getcam") != -1){
	console.log("Got camera adv data");
	cameraAvdData(evt.data);
	}else if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325dffddd") != -1){
	getHubInfo(evt.data);
	}else if(evt.data.search("19341945-b970-42a5-bda7-884c50abff8e") != -1){
	getAlarmState(evt.data);
	}else if(evt.data.search("c6c54d80-2f5c-4d5b-adf5-e85bca5d1278") != -1){
	
	}else if(evt.data.search("74cb2fe5-3c80-4294-bf36-e6a6a5faf08a") != -1){
	//Getting zip code for weather
	var message = evt.data.split(",");		
		for (var i = 0; i < message.length; i++) {
			if(message[i].search('"place:zipCode":"') != -1){
			console.log("zip found");
			ZipCodeG = message[i].replace('"place:zipCode":"','').replace('}}}',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
			console.log(ZipCodeG);
			}
		}
	}else if(evt.data.search("SetAttributesError") != -1){
	console.log("Set Attributes Error");
	console.log(evt.data);	
	}else if(evt.data.search('931588b4-deed-4d79-a48d-1e5109b725da') != -1){
		if(window.location.href.indexOf("pair.html") > -1) {
			document.getElementById("pairingSpin").innerHTML ='';
		}
	}else if(evt.data.search('54d63b37-cc68-4e63-ae1b-f66330065c6d') != -1){
	console.log("Found pairing");
		if(window.location.href.indexOf("pair.html") > -1) {
			document.getElementById("pairingSpin").innerHTML = '<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><br>Pairing...<br>';
		}
	}else if(evt.data.search('{"type":"base:Added"') != -1){
	console.log("Add command found sending for cleaning and checking.");
		if(window.location.href.indexOf("pair.html") > -1) {
			onMpair(evt.data);
		}
	}else if(evt.data.search("b1f9ad2d-6ee4-4aac-8a2e-41717d781ffc") != -1){
	console.log("Download data found");
	listDownloads(evt.data);
	}else if(evt.data.search("d979195c-42f7-45f5-a168-2ee0848fea58") != -1){
	console.log("Preview image data found");
	listPreviews(evt.data);
	}else if(evt.data.search("5f7ecb79-ed92-4ef3-8b83-dd8729devhis") != -1){
	console.log("Dev History Called");
	logFullHistory(evt.data);
	}else if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325camhub") != -1){
		console.log("Camhub called");
		onMhubinfo(evt);
	}else if(evt.data.search("f515b790-b476-46f3-82a2-b092df70457b") != -1){
	//This is for deleting videos
		// window.location.reload(true);
	}else if(evt.data.search("cc34075d-ef8f-4cd6-9cf0-f6a325setcam") != -1){
	// window.location.replace("/cameras.html");
	window.location.reload(true);
	// console.log(evt.data);
	}else{
		var message = evt.data.split(",");
		
		for (var i = 0; i < message.length; i++) {
			if(message[i].search('"source":"DRIV:dev') != -1){
			
				var tempDevID = message[i].replace('"source":"DRIV:','').replace('"}',"").replace('dev',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
				
				for (var x = 0; x < message.length; x++) {
				// document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + " " + message[x];
				try{
							if(message[x].search('temp:temperature') != -1){
								var Temp = message[x].replace('"attributes":{"temp:temperature":','').replace('}}}',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
								var Cf = parseFloat(Temp);
								Temp = Cf * 9 / 5 + 32;
								
								document.getElementById("TEMP" + tempDevID).innerHTML = "*Temp reported:" + Math.round(Temp) + "F";
								
							}
							if(message[x].search('devpow:battery') != -1){
								var Battery = message[x].replace('"attributes":{"devpow:battery":','').replace('}}}',"").replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");

								document.getElementById("BATT" + tempDevID).innerHTML = "*battery:" + Battery;

							}
							if(message[x].search('SUPP:suppcustsession') != -1){
								support = setInterval(SupportTimer, 30000);
								document.getElementById("support").innerHTML = '<i class="fa fa-medkit" style="font-size:25px;color:red">';
							}		
														
							if(message[x].search('"mot:motion":"') != -1){
								var State = message[x].replace('"mot:motion":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");

									if(State.search('DETECTED') != -1){
										if(window.location.href.indexOf("controlpanel.html") > -1) {
											document.getElementById("Motion" + tempDevID).innerHTML = '<i class="fa fa-rss" style="font-size:' + iconsize + 'px;color:green"><br>';
											}else{
											document.getElementById("Motion" + tempDevID).innerHTML = '<i class="fa fa-rss" style="font-size:24px;color:green"><br>';
											}
										

									}else{
									if(window.location.href.indexOf("controlpanel.html") > -1) {
											document.getElementById("Motion" + tempDevID).innerHTML = '<i class="fa fa-circle" style="font-size:' + iconsize + 'px"></i> <br>';
											}else{
											document.getElementById("Motion" + tempDevID).innerHTML = '<i class="fa fa-circle" style="font-size:24px"></i> <br>';
											}
									}															
							}
							if(message[x].search('irrcont:controllerState') != -1){
								var State = message[x].replace('"irrcont:controllerState":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");

									if(State.search('NOT_WATERING') != -1){

										document.getElementById("Irrigation" + tempDevID).innerHTML = '<i class="fa fa-tint" aria-hidden="true" style="color:red;font-size:24px"></i>';
										document.getElementById("IRRSWITCH" + tempDevID).innerHTML = '<i onclick="startIrrigation(' + (devIDlist.indexOf(tempDevID) + 1) + ')"class="fa fa-toggle-on" style="font-size:24px"></i>';
										// document.getElementById("IRRSWITCH" + tempDevID).innerHTML = 'NO WATER';
										console.log(devIDlist.indexOf(tempDevID) + 1);
										console.log("irr controller number");
									}else if(State.search('WATERING') != -1){

										document.getElementById("Irrigation" + tempDevID).innerHTML = '<i class="fa fa-tint" aria-hidden="true" style="color:blue;font-size:24px"></i>';
										document.getElementById("IRRSWITCH" + tempDevID).innerHTML = '<i onclick="stopIrrigation(' + (devIDlist.indexOf(tempDevID) + 1) + ')"class="fa fa-toggle-off" style="font-size:24px"></i>';
										console.log(devIDlist.indexOf(tempDevID) + 1);
										console.log("irr controller number");

									}															
							}
							if(message[x].search('"swit:state":"') != -1){
								var State = message[x].replace('"swit:state":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");
									if(State.search('ON') != -1){
									
										if(document.getElementById("STATE" + tempDevID) != null){
											document.getElementById("SWITCH" + tempDevID).innerHTML = document.getElementById("SWITCH" + tempDevID).innerHTML.replace("fa fa-toggle-on","fa fa-toggle-off").replace("turnonlight(","turnofflight(");
											if(window.location.href.indexOf("controlpanel.html") > -1) {
											document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-power-off" style="font-size:' + iconsize + 'px;color:green"></i>';
											}else{
											document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-power-off" style="font-size:24px;color:green"></i>';
											}
										}else{
											if(window.location.href.indexOf("controlpanel.html") > -1) {
											document.getElementById("FANSWITCH" + tempDevID).innerHTML = document.getElementById("FANSWITCH" + tempDevID).innerHTML.replace("fa fa-toggle-on","fa fa-toggle-off").replace("turnonfan(","turnofffan(");
											document.getElementById("FAN" + tempDevID).innerHTML = '<i class="fa fa-refresh fa-spin" style="font-size:' + iconsize + 'px;color:green"></i>';
											}else{
											document.getElementById("FANSWITCH" + tempDevID).innerHTML = document.getElementById("FANSWITCH" + tempDevID).innerHTML.replace("fa fa-toggle-on","fa fa-toggle-off").replace("turnonfan(","turnofffan(");
											document.getElementById("FAN" + tempDevID).innerHTML = '<i class="fa fa-refresh fa-spin" style="font-size:24px;color:green"></i>';
											}
										}
									}else{
									
										if(document.getElementById("STATE" + tempDevID) != null){
											document.getElementById("SWITCH" + tempDevID).innerHTML = document.getElementById("SWITCH" + tempDevID).innerHTML.replace("fa fa-toggle-off","fa fa-toggle-on").replace("turnofflight(","turnonlight(");
											if(window.location.href.indexOf("controlpanel.html") > -1) {
											document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-power-off" style="font-size:' + iconsize + 'px"></i>';
											}else{
											document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-power-off" style="font-size:24px"></i>';
											}
										}else{
											if(window.location.href.indexOf("controlpanel.html") > -1) {
											document.getElementById("FANSWITCH" + tempDevID).innerHTML = document.getElementById("FANSWITCH" + tempDevID).innerHTML.replace("fa fa-toggle-off","fa fa-toggle-on").replace("turnofffan(","turnonfan(");
											document.getElementById("FAN" + tempDevID).innerHTML = '<i class="fa fa-refresh" style="font-size:' + iconsize + 'px"></i>';
											}else{
											document.getElementById("FANSWITCH" + tempDevID).innerHTML = document.getElementById("FANSWITCH" + tempDevID).innerHTML.replace("fa fa-toggle-off","fa fa-toggle-on").replace("turnofffan(","turnonfan(");
											document.getElementById("FAN" + tempDevID).innerHTML = '<i class="fa fa-refresh" style="font-size:24px"></i>';
											}
										}
									}										
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
							if(message[x].search('"cont:contact":"') != -1){
								var State = message[x].replace('"cont:contact":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");
	
									if(State.search('OPENED') != -1){
									if(window.location.href.indexOf("controlpanel.html") > -1) {
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i>';
									}else{
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-ellipsis-v" style="font-size:24px"></i><i class="fa fa-ellipsis-v" style="font-size:24px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:24px;color:white"></i><i class="fa fa-ellipsis-v" style="font-size:24px"></i>';
										}
									}else{
									if(window.location.href.indexOf("controlpanel.html") > -1) {
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i><i class="fa fa-ellipsis-v" style="font-size:' + iconsize + 'px"></i>';
									}else{
										document.getElementById("STATE" + tempDevID).innerHTML = '<i class="fa fa-ellipsis-v" style="font-size:24px"></i><i class="fa fa-ellipsis-v" style="font-size:24px"></i>';
									}
									}										
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
							if(message[x].search('"fan:speed":') != -1){
								var State = message[x].replace('"fan:speed":','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"").replace('"',"");

								davFanSpeed = State;
								devFanSpeed = fanSpeeds[parseInt(State) -1];
								document.getElementById("FANSPEED" + tempDevID).innerHTML = '<i class="fa fa-minus-square"></i>' + devFanSpeed + '<i class="fa fa-plus-square"></i>';									
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
							if(message[x].search('therm:active') != -1){
								var State = message[x].replace('"therm:active":"','').replace('}}}',"").replace('"',"").replace('attributes',"").replace(':',"").replace(/'"'/g,"").replace('{',"");

									if(State.search('NOTRUNNING') != -1){
										document.getElementById("HVAC" + tempDevID).innerHTML = '<i class="fa fa-gear" style="font-size:24px"></i>';
									}									
									if(State.search('RUNNING') != -1){
										document.getElementById("HVAC" + tempDevID).innerHTML = '<i class="fa fa-gear fa-spin" style="font-size:24px"></i>';
									}									
								//document.getElementById("STATE" + tempDevID).innerHTML = "*Current state:" + State;						
							}
							}
							catch(err) {
							// document.getElementById("log").innerHTML = err.message;
						}
						}
						//make places HTML
						//document.getElementById("places").innerHTML = placesA.toString().replace(',',"");
				}
				if(message[i].search('hub:HubConnected') != -1){
								document.getElementById("hubStatus").innerHTML = '<h2>Hub back online</h2>';
							}
				if(message[i].search('graph') != -1){
					var graph = "";
					graph =  message[i].replace('"graph":"','').replace('"}}}',"").replace('"',"").replace(' ',"");
					
					var b64Data1     = graph;
					b64Data1 = b64Data1.replace(/\u003d/gi,"=")
					try{
					console.log(b64Data1 == "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");
					console.log(b64Data1);
					var data = new FormData();
					data.append("data" , b64Data1);
					var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
					xhr.open( 'post', '/assets/js/base64.php', true );
					xhr.send(data);
					if(email != ""){
					var data = new FormData();
					data.append("data" , email);
					var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
					xhr.open( 'post', '/assets/js/email.php', true );
					xhr.send(data);
					document.getElementById("zwaveStatus").innerHTML = "Check your email and don't forget your spam it will take about 1 to 2 minutes";
					}else{
					document.getElementById("zwaveStatus").innerHTML = "Did not enter an email so you get nothing. Good day sir!";
					}
					
					// var strData1     = atob(b64Data1);
					// var charData1    = strData1.split('').map(function(x){return x.charCodeAt(0);});
					// var binData1     = new Uint8Array(charData1);
					// var data1        = pako.inflate(binData1);
					// var strData     = String.fromCharCode.apply(null, new Uint16Array(data1));
					 // fileName = "zwave-map.gv";
					// download(strData, fileName);
					
					}
					catch(err) {
					document.getElementById("zwaveStatus").innerHTML = 'Okay so here is a patch for now. Take the encoded data below to <a href="https://jsfiddle.net/jcsgee18/" target="_blank">https://jsfiddle.net/jcsgee18/</a> DO NOT DOWNLOAD the first file <br> Replace the ENTER DATA HERE WITH NO SPACES then click run. This will give you the file needed. <textarea rows="4" cols="50">'
					+ b64Data1 + '</textarea>' + err.message;
					}					
				}
				// if(message[i].search('hubbackup:BackupResponse') != -1){	
				// for (var x = 0; x < message.length; x++) {
					if(message[i].search('data') != -1){
						var backup = "";
						backup =  message[i].replace('{"data":"','').replace('"}}}',"").replace('attributes":',"").replace('"',"").replace(' ',"");
						console.log(backup);
						 fileName = "hubback.iris";
						download(backup, fileName);
						document.getElementById("hubStatus").innerHTML = 'Done';
						}
					// }
				// }				
				
		}
	}
}
function SupportTimer() {
    document.getElementById("support").innerHTML = '';
	clearInterval(support);
}
