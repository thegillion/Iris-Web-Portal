function logHistory(History) {
// History
var histSubjectName = "";
var histLongMessage = "";
var histDivID = "";
var histTimestamp = "";
devices = History.split("},{");
	for (var i = 0; i < devices.length; i++) {
		//writeLogToScreen('<span style="color: blue;">History:</span>');
		var device = devices[i].split(",");
		for (var x = 0; x < device.length; x++) {
			if(device[x].search('"timestamp":') != -1){
					histTimestamp = device[x].replace('"timestamp":','').replace('"',"").replace('attributes":{"results":[{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
					// writeLogToScreen(histTimestamp);
					var d = moment(parseInt(histTimestamp)).format("MM-DD-YYYY h:mm:ss a");
					// writeLogToScreen(d);
					histTimestamp = d + " ";
					
				}
			if(device[x].search('"subjectAddress":"DRIV:dev:') != -1){
					histDivID = device[x].replace('"subjectAddress":"DRIV:dev:','').replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
					//writeLogToScreen("histID" + histDivID);
				}
				if(device[x].search('"subjectName":"') != -1){
					histSubjectName = device[x].replace('"subjectName":"','').replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
					//writeLogToScreen(histSubjectName);
				}
				if(device[x].search('"longMessage":"') != -1){
					histLongMessage = device[x].replace('"longMessage":"','').replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
					//writeLogToScreen("histID " + histDivID + histLongMessage);
					try{
					document.getElementById("history").innerHTML = document.getElementById("history").innerHTML + histTimestamp + histSubjectName + " " + histLongMessage + "<br>";
					}catch(err) {
							// document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + err.message;
						}
					// writeHistoryToScreen(histTimestamp + histSubjectName + " " + histLongMessage)
					if(histDivID != ""){
					try{
						 document.getElementById("HIST" + histDivID).innerHTML = document.getElementById("HIST" + histDivID).innerHTML.replace('No History Found.',"") + histTimestamp + histSubjectName + " " + histLongMessage + "<br>";
					}catch(err) {
							// document.getElementById("log").innerHTML = document.getElementById("log").innerHTML + err.message + histSubjectName + " " + histLongMessage + "<br>";
						}
					}
					
							
					
					
				}
				
			//writeLogToScreen('<span style="color: red;"> ' + device[x] + '</span>');
			
		}
	}
}