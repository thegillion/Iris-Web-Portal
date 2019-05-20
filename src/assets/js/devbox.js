var i = 0;
var myVar;
var soundArray = ["ARMED","ARMING","INTRUDER","LOW_BATTERY","UNPAIRED","PAIRED","SAFETY","SUCCESS_TRIPLE","SUCCESS_SINGLE","SUCCESS_REMOVAL","STARTUP","FAILED","FAILED"];
function backupHub() {
    if (confirm(hubID + "This action will take about 2 to 5 mins. \nThe hub will be out of service for this time \nDO NOT POWER DOWN THE HUB!") == true) {
	var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325backup","isRequest":true},"payload":{"messageType":"hubbackup:Backup","attributes":{"type":"V2"}}}';
	websocket.send(message);
	console.log(message);
	document.getElementById("hubStatus").innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <P> Backing up hub <B> DO NOT LEAVE THIS PAGE!!'	
    }
}
function restoreHub() {
    if (confirm(hubID + "\nThis action will take about 2 to 5 mins. \nThe hub will be out of service for this time \nDO NOT POWER DOWN THE HUB!") == true) {
	
	document.getElementById("hubStatus").innerHTML = 'Select a backup file <br> <form id="myform"><input id="myfile" name="files[]" multiple="" type="file" /></form>'	
    	  // This is for uploading a restore to the hub.
		 document.forms['myform'].elements['myfile'].onchange = function(evt) {
		if(!window.FileReader) return; // Browser is not compatible
		// debugger;
		var reader = new FileReader();
		reader.onload = function(evt) {
			if(evt.target.readyState != 2) return;
			if(evt.target.error) {
				alert('Error while reading file');
				return;
			}
			filecontent = evt.target.result;
			document.getElementById("hubStatus").innerHTML = document.getElementById("hubStatus").innerHTML + '<p>' + '<i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <P> Restoring hub **</B> DOES NOT WORK YET</B>**';
			// document.forms['myform'].elements['text'].value = evt.target.result;
		};
		reader.readAsText(evt.target.files[0]);
	};
	}
}
function soundCheck() {
myVar = setInterval(playSounds, 7000);
var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"hubsounds:PlayTone","attributes":{"tone":"' + soundArray[i] +'","durationSec":5}}}';
websocket.send(message);
document.getElementById("hubStatus").innerHTML = 'Playing ' + soundArray[i] + " on " + hubID + "<br><br>" + '<input class="button" type="button" value="Stop Sound Check" onclick="stopSoundCheck();">';
i = i + 1;
}
function stopSoundCheck() {
var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"hubsounds:PlayTone","attributes":{"tone":"' + soundArray[i] +'","durationSec":5}}}';
websocket.send(message);
clearTimeout(myVar);
document.getElementById("hubStatus").innerHTML = 'Sound check stopped';
}
function setHubLocal() {
var message = '{"type":"subalarm:SetProvider","headers":{"isRequest":true,"destination":"SERV:subalarm:' + placeID + '","correlationId":"cbda79aa-d41c-4e9d-9aca-83e2fb8bbf61"},"payload":{"messageType":"subalarm:SetProvider","attributes":{"provider":HUB}}}';
websocket.send(message);
document.getElementById("hubStatus").innerHTML = 'Hub Has Been Set To Local';
}
function zwaveMap(){
email = prompt("Please enter you're email so the server can email the file to you.", "Someone@somewhere.net");
var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffmap","isRequest":true},"payload":{"messageType":"hubzwave:NetworkInformation","attributes":{}}}';
websocket.send(message);
document.getElementById("zwaveStatus").innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <P> Building map'	

}
function playSounds() {
	if( i < soundArray.length){
			var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"hubsounds:PlayTone","attributes":{"tone":"' + soundArray[i] +'","durationSec":5}}}';
			websocket.send(message);
			document.getElementById("hubStatus").innerHTML = 'Playing ' + soundArray[i] + " on " + hubID + "<br><br>" + '<input class="button" type="button" value="Stop Sound Check" onclick="stopSoundCheck();">';
			// document.getElementById("hubStatus").innerHTML = 'Playing ' + soundArray[i];
			i = i + 1;
		}else{
		i = 0;
		clearTimeout(myVar);
		var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dffb9d","isRequest":true},"payload":{"messageType":"hubsounds:Quiet","attributes":{}}}';
		websocket.send(message);
		document.getElementById("hubStatus").innerHTML = 'Sound check stopped'	
		}
}
function restartHub() {
    if (confirm("This will restart the service on the hub \nThis will take about 2 mins") == true) {
	document.getElementById("hubStatus").innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <P> Restarting hub <B><br>!! CAUTION !! CAUTION !! CAUTION !!</B> <br> Back to back restarts can cause the Zigbee network to unbuild and will take over an hour to rebuild'
	var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dchime","isRequest":true},"payload":{"messageType":"hubchime:chime","attributes":{}}}';
	websocket.send(message);
	var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a32restart","isRequest":true},"payload":{"messageType":"hubadv:Restart","attributes":{}}}';
	websocket.send(message);		
    }
}
function rebootHub() {
    if (confirm("This will reboot the the hub \nThis will take about 5 mins \nThis is like taking the batties out and unpluging it.") == true) {
	document.getElementById("hubStatus").innerHTML = '<i class="fa fa-spinner fa-spin" style="font-size:78px"></i> <P> Rebooting hub'	
    var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a325dchime","isRequest":true},"payload":{"messageType":"hubchime:chime","attributes":{}}}';
	websocket.send(message);
	var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"cc34075d-ef8f-4cd6-9cf0-f6a32restart","isRequest":true},"payload":{"messageType":"hubadv:Reboot","attributes":{}}}';
	websocket.send(message);	
	}	
}
function zwaveRebuild() {
    if (confirm("This will start the rebuild on the zwave network \nDo not reboot or power down the hub do not know what will happen.	") == true) {
	document.getElementById("zwaveStatus").innerHTML = 'Rebuilding Zwave network. WARNING: This interferes with normal operation of the Z-Wave controller for the duration of the healing process.'	
    var message = '{"type":"hubdebug:hubchime","headers":{"destination":"SERV:' + hubID + ':hub","correlationId":"d96a7666-ed4d-477d-86d5-506cf6e0a866","isRequest":true},"payload":{"messageType":"hubzwave:Heal","attributes":{"block":false}}}';
	websocket.send(message);	
	}	
}