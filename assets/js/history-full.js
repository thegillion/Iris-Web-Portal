var headerArray = [];
var historyArray = [];
var HTML = "";
var HTMLtable = "";
function logFullHistory(History) {
console.log("Got command logfullHistory");
// History
var histSubjectName = "";
var histLongMessage = "";
var histDivID = "";
var histTimestamp = "";
devices = History.split("},{");
headerArray = [];
historyArray = [];
HTMLtable = '';
headerArray.push("Date and Time");
headerArray.push("History Event");
historyArray.push(headerArray);
document.getElementById("tbody").innerHTML = "";
HTMLtable = '<table class="tablesorter"><thead><tr><th> Date and Time</th><th>History</th></tr></thead><tbody>';
	for (var i = 0; i < devices.length; i++) {
		//writeLogToScreen('<span style="color: blue;">History:</span>');
		var device = devices[i].split(",");
		var lineHistory = new Array();
		for (var x = 0; x < device.length; x++) {		
			if(device[x].search('"timestamp":') != -1){
					histTimestamp = device[x].replace('"timestamp":','').replace('"',"").replace('attributes":{"results":[{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
					// writeLogToScreen(histTimestamp);
					var d = moment(parseInt(histTimestamp)).format("MM-DD-YYYY h:mm:ss a");
					lineHistory.push(d);
					// writeLogToScreen(d);
					histTimestamp = d + " ";
				}
			if(device[x].search('"subjectName":"') != -1){
				histSubjectName = device[x].replace('"subjectName":"','').replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
				//writeLogToScreen(histSubjectName);
			}
			if(device[x].search('"longMessage":"') != -1){
				histLongMessage = device[x].replace('"longMessage":"','').replace('"',"").replace('{',"").replace(':',"").replace('"',"").replace('"',"").replace('"',"");
				lineHistory.push(histSubjectName + " " + histLongMessage);
				//writeLogToScreen("histID " + histDivID + histLongMessage);
				HTML = HTML + '<tr><td>' + histTimestamp + '</td>'
				+ '<td>' + histSubjectName + " " + histLongMessage + '</td></tr>';
				HTMLtable = HTMLtable + HTML;
				historyArray.push(lineHistory);
				HTML = "";
			}
			
		}
	}
	document.getElementById("tbody").innerHTML = HTMLtable + "</tr></tbody></table>";
	// $( document ).ready(function() {
		// console.log( "Getting sorttable!" );
				// $("table").tablesorter({debug: true})
			// $("a.append").click(appendData);
		// $.getScript('assets/js/jquery.tablesorter.js');
	// });
}
function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
}