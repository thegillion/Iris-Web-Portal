function OnMlistrecording(evt) {
	if(evt.data.search("b1a56f26-99fb-4423-b493-528c6065a7ed") != -1){		
		listRecordings(evt.data)		
	}
}
function listRecordings(devices){
	document.getElementById("recordings").innerHTML = "";
	Devices = devices.split("},{");
		//writeLogToScreen('<span style="color: blue;">Devices: ' + devices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		// writeLogToScreen('Device arry built');
		var videoTimeStamp = "";
		var videoDuration = "";
		var videoSize = "";
		var videoFramerate = "";
		var videoID = "";
		
		for (var i = 0; i < Devices.length; i++) {
			var device = Devices[i].split(",");
				for (var x = 0; x < device.length; x++) {
					if(device[x].search("video:timestamp") != -1){
					videoTimeStamp = device[x].replace('"video:timestamp":','').replace('"',"");
					videoTimeStamp = moment(parseInt(videoTimeStamp)).format("MM-DD-YYYY h:mm:ss a") + "<br>";
					}
					if(device[x].search("video:duration") != -1){
					videoDuration = device[x].replace('"video:duration":','').replace('"',"");
					if (parseInt(videoDuration) < 1){
					videoDuration = "Duration : " + 	Math.floor(parseInt(videoDuration) / 60) + " minutes <br>";
					}else{
					videoDuration = "Duration : " + 	Math.floor(parseInt(videoDuration) / 60) + " minute <br>";
					}
					}
					if(device[x].search("video:size") != -1){
					videoSize = device[x].replace('"video:size":','').replace('"',"") + "<br>";
					}
					if(device[x].search("base:id") != -1){
					videoID = device[x].replace('"base:id":"','').replace('"',"");
					}
					if(device[x].search("video:framerate") != -1){
					videoFramerate = "Framerate : " + device[x].replace('"video:framerate":','').replace('"',"") + "<br>";
					}
					if(device[x].search('"video:cameraid":') != -1){
					document.getElementById("recordings").innerHTML = document.getElementById("recordings").innerHTML + '<article><span id="preview' + videoID + '"><a href="#" class="image"><img src="images/pic01.jpg" alt="" /></a></span><center><span id="Download'+ videoID + '"></span> <br>' + videoTimeStamp + videoDuration + videoFramerate +"</center></article>";
					var message = '{"type":"video:Download","headers":{"destination":"SERV:video:' + videoID + '","correlationId":"b1f9ad2d-6ee4-4aac-8a2e-41717d781ffc","isRequest":true},"payload":{"messageType":"video:Download","attributes":{}}}';
					websocket.send(message);
					var message = '{"type":"video:View","headers":{"destination":"SERV:video:' + videoID + '","correlationId":"d979195c-42f7-45f5-a168-2ee0848fea58","isRequest":true},"payload":{"messageType":"video:View","attributes":{}}}';
					websocket.send(message);
					//Need to do a webstocket send to get the preview here
					}
				}				
			}	
					
}
function listDownloads(previews){
Previews = previews.split("},{");
		var videoMP4URL = "";
		var videoDownloadID = "";
		
		for (var i = 0; i < Previews.length; i++) {
			var preview = Previews[i].split(",");
				for (var x = 0; x < preview.length; x++) {
					if(preview[x].search('"source":"SERV:video:') != -1){
					videoDownloadID = preview[x].replace('"source":"SERV:video:','').replace('"',"").replace('}',"");
					}
					if(preview[x].search('"attributes":{"mp4"') != -1){
					videoMP4URL = preview[x].replace('"attributes":{"mp4":"','').replace('"',"");
					}
					if(preview[x].search('"mp4SizeEstimate":') != -1){
					document.getElementById("Download" + videoDownloadID).innerHTML = '<a href="' + videoMP4URL + '"><i class="fa fa-download"></i></a> <i onclick="deleteVideo(' + "'" + videoDownloadID + "'" + ')"class="fa fa-trash">';
					}
				}				
			}
}
function listPreviews(previews){
Previews = previews.split("},{");
		var videoPreviewURL = "";
		var videoPreviewID = "";
		
		for (var i = 0; i < Previews.length; i++) {
			var preview = Previews[i].split(",");
				for (var x = 0; x < preview.length; x++) {
					if(preview[x].search('"source":"SERV:video:') != -1){
					videoPreviewID = preview[x].replace('"source":"SERV:video:','').replace('"',"").replace('}',"");
					console.log(videoPreviewID);
					}
					if(preview[x].search('"attributes":{"preview":"') != -1){
					videoPreviewURL = preview[x].replace('"attributes":{"preview":"','').replace('"',"");
					}
					if(preview[x].search('"hls":"') != -1){
					console.log("Preview image URL " + videoPreviewURL);
					document.getElementById("preview" + videoPreviewID).innerHTML = '<a href="#" class="image"><img src="' + videoPreviewURL + '" /></a>';
					}
				}				
			}
}
function deleteVideo(clipID){
document.getElementById("preview" + clipID).innerHTML = '<a href="#" class="image"><img src="images/trash720p.png" /></a>';
var message = '{"type":"video:Delete","headers":{"destination":"SERV:video:' + clipID + '","correlationId":"f515b790-b476-46f3-82a2-b092df70457b","isRequest":true},"payload":{"messageType":"video:Delete","attributes":{}}}';
websocket.send(message);
}