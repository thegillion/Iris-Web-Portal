setInterval(updatePower, 120000);
var devTotalPower1 = 0;
var devTemp = 0;
var devTempTrue = "";
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);


var time = new Date();
var temptime = time.getHours() + ":" + time.getMinutes();
var timeA = [temptime];
var tWatts = [];
var tempChart = [];
var options = {
	  title: 'Device Temperature',
	  curveType: 'function',
	  legend: { position: 'bottom' }
	};

function onTemplevel(evt) {
console.log("power UPpower Called");
	if(evt.data.search("1237772e-57f8-47d1-8002-5fe59d341234") != -1){
	console.log("Build chart message found");	
		drawChart(evt.data);
			
	}else if(evt.data.search("1236672e-57f8-47d1-8002-5fe59d34c123") != -1){
	console.log("Add data message found");	
		chartpowerlevel(evt.data);
			
	}
	
}

function drawChart(devices){
console.log("working data");	
var time = new Date();
temptime = "";
temptime = time.getHours() + ":" + time.getMinutes();
var deviceInfo = new Array();
deviceInfo.push('Time');
  var data = new google.visualization.DataTable();
	Devices = devices.split("},{");
		var devID1 = "";
		var devName1 = "";
		var devPower1 = "";
		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		 // Getting Device Name
	for (var i = 0; i < Devices.length; i++) {
		var device = Devices[i].split(",");
			for (var x = 0; x < device.length; x++) {
				if(device[x].search('temp:temperature') != -1) {
						devTempTrue = device[x].replace('"temp:temperature":','').replace('"',"");
						
					}
				if(device[x].search("dev:name") != -1){
				devName1 = device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"','');
					if(devTempTrue != ""){
							deviceInfo.push(devName1);
							console.log("Adding Device " + devName1);
							}
				// deviceInfo.push(device[x].replace('"dev:name":"',"").replace(/'\u0027'/g,"").replace('"','').replace('"','').replace('"',''));
				}
				
			}
			 devTempTrue = "";
			
		}
		//Dumping data to power chart
	tempChart.push(deviceInfo);
	var deviceInfo = new Array();
	//Dumping deviceInfo array
	deviceInfo.push(temptime);
	//Getting power level
	for (var i = 0; i < Devices.length; i++) {
	var device = Devices[i].split(",");
		for (var x = 0; x < device.length; x++) {
				// if(device[x].search('pow:instantaneous') != -1) {
					// deviceInfo.push(parseInt(device[x].replace('"attributes":{"pow:instantaneous":','').replace('"',"").replace('pow:',"").replace('instantaneous',"").replace(':',"").replace('"',"").replace('}}}',"")));
					// devTotalPower1 = devTotalPower1 + parseInt(device[x].replace('"attributes":{"pow:instantaneous":','').replace('"',"").replace('pow:',"").replace('instantaneous',"").replace(':',"").replace('"',"").replace('}}}',""));
				// }
				if(device[x].search('temp:temperature') != -1) {
						C = device[x].replace('"temp:temperature":','').replace('"',"");
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						//writeToScreen(Cf * 9 / 5 + 32);
						devTemp = Math.round(F);
						deviceInfo.push(devTemp);
						console.log("Adding Temp " + devTemp);
					}
			}
	}
	// deviceInfo.push(devTotalPower1);
	tempChart.push(deviceInfo);
	var numRows = tempChart.length;
    var numCols = tempChart[0].length;
	 // in this case the first column is of type 'string'.
	data.addColumn('string', tempChart[0][0]);
	console.log("Adding first column " + tempChart[0][0]);
	
	// all other columns are of type 'number'.
		for (var i = 1; i < numCols; i++){
		try{
		data.addColumn('number', tempChart[0][i]);
		}
		catch(err) {
				// document.getElementById("demo").innerHTML = err.message;
			}	
		console.log("Adding names column " + tempChart[0][i]);			
		}
 // now add the rows.
          for (var i = 1; i < numRows; i++){
            data.addRow(tempChart[i]);
			console.log("Adding number column " + tempChart[i]);
			}			
// redraw the chart.
 var chart = new google.visualization.LineChart(
 document.getElementById('chart_div'));
          chart.draw(data, options); 			
	devTotalPower1 = 0;
	}
	
function chartpowerlevel(devices){
console.log("working data Power chart");	
console.log("working data");	
var time = new Date();
temptime = "";
temptime = time.getHours() + ":" + time.getMinutes();
var deviceInfo = new Array();
deviceInfo.push('Time');
timeA.push(temptime);
  var data = new google.visualization.DataTable();
	Devices = devices.split("},{");
		var devID1 = "";
		var devName1 = "";
		var devPower1 = "";
		
		// devIDlist = [];
		 var width = 0;
		 var id = 1;
		 // Getting Device Name

  var data = new google.visualization.DataTable();
		var deviceInfo = new Array();
	//Dumping deviceInfo array
	deviceInfo.push(temptime);
	//Getting power level
	for (var i = 0; i < Devices.length; i++) {
	var device = Devices[i].split(",");
	var devPower = 0;
		for (var x = 0; x < device.length; x++) {
				// if(device[x].search('pow:instantaneous') != -1) {
					// devPower = parseInt(device[x].replace('"attributes":{"pow:instantaneous":','').replace('"',"").replace('pow:',"").replace('instantaneous',"").replace(':',"").replace('"',"").replace('}}}',""));
					// console.log(devPower);
					// deviceInfo.push(devPower);
					// devTotalPower1 = devTotalPower1 + devPower;
				// }
				if(device[x].search('temp:temperature') != -1) {
						C = device[x].replace('"temp:temperature":','').replace('"',"");
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						//writeToScreen(Cf * 9 / 5 + 32);
						devTemp = Math.round(F);
						deviceInfo.push(devTemp);
						//writeToScreen(devTemp);
					}
			}
	}
	// deviceInfo.push(devTotalPower1);
	tempChart.push(deviceInfo);
	var numRows = tempChart.length;
    var numCols = tempChart[0].length;
	 // in this case the first column is of type 'string'.
	data.addColumn('string', tempChart[0][0]);
	console.log("Adding first column" + tempChart[0][0]);
	
	// all other columns are of type 'number'.
		for (var i = 1; i < numCols; i++){
		data.addColumn('number', tempChart[0][i]);
		console.log("Adding number column" + tempChart[0][i]);		
		}
 // now add the rows.
          for (var i = 1; i < numRows; i++){
            data.addRow(tempChart[i]);
			console.log("Adding number column " + tempChart[i]);
			}	
// redraw the chart.
 var chart = new google.visualization.LineChart(
 document.getElementById('chart_div'));
          chart.draw(data, options);
		  devTotalPower1 = 0;
	}


function drawBasic() {

  // Create and populate the data table.

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'time');
  data.addColumn('number', 'Temp');
console.log(timeA.toString());

  for(i = 0; i < timeA.length; i++)
    data.addRow([timeA[i], tWatts[i]]);
	
	var options = {
          title: 'Power Usage',
          curveType: 'function',
          legend: { position: 'bottom' }
        };
      var chart = new google.visualization.LineChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }
	
function updatePower( )
{
var message = '{"type":"place:ListDevices","headers":{"destination":"SERV:place:' + placeID + '","correlationId":"1236672e-57f8-47d1-8002-5fe59d34c123","isRequest":true},"payload":{"messageType":"place:ListDevices","attributes":{}}}';
websocket.send(message);
console.log("firing timer");
console.log(message);

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
