var HTMLstat = "";
var HTMLtable = "";
var HTMLweather = "";
var fanSpeeds = ['<i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle" style="color:white"></i>','<i class="fa fa-circle"><i class="fa fa-circle"><i class="fa fa-circle"></i></i></i>'];
var StopIrrigation = "";
var HouseTemp = "";
var irrigationID = "";
var noOneHome = "";
var Smoke = "";
function onMsystemstat(evt) {
console.log("System Stats called");
	if(evt.data.search("6606672e-57f8-47d1-8002-5fe59d34c1d8") != -1){
		listsystemstat(evt.data);
		console.log("Checking for system stats");		
	}
}
function calcDate(date1,date2) {
    var diff = Math.floor(date1.getTime() - date2);
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff/day);
    var months = Math.floor(days/31);
    var years = Math.floor(months/12);

    var message = days 

    return message
    }
function listsystemstat(devSices){

	document.getElementById("tbody").innerHTML = "";
	console.log("Reading device list.");	
	HTMLtable = '<table><thead><tr><th>Name</th><th>Problem</th></tr></thead><tbody>';
	devSices = devSices.split("},{");
		//writeLogToScreen('<span style="color: blue;">devSices: ' + devSices.replace(/","/g,"<br>").replace(/"},{"/g,"<p>") + '</span>');
		var devSBatteryNum = "";
		var devSID = "";
		var devSFav = "";
		var devSBrightness = "";
		var devSState = "";
		var devSName = "";
		var devSNamePassed = "";
		var devSThermState = "";
		var devSMotionState = "";
		var devSVendor = "";	
		var filtertype = "";	
		var lastTestDate = "";	
		var devSBattery = "N/A";
		var devSSource = "";
		var devSOnlineStatus = "";
		var devSModel = "";
		var devSSignal = "N/A";
		var devSProtocol = "";
		var devSType = "";
		var devSCoolSetPoint = "";
		var devSHeatSetPoint = "";
		var devSTemp = "";
		var devSSmoke = "";
		var devSPresence = "";
		var devSContact = "";
		var devSPower = "N/A";
		var devSDriverVersion = "";
		var devSUpdateStatus = "N/A";
		var devSCurrentDriver = "";
		var devSTargetDriver = "";
		var acFilterTime = "";
		var acID = "";
		var filterLifeSpanDays = "";
		var devIrrigationState = "";
		
		// devSIDlist = [];
		 var width = 0;
		 var id = 1;
		for (var i = 0; i < devSices.length; i++) {
			var devSice = devSices[i].split(",");
				for (var x = 0; x < devSice.length; x++) {
				
					if(devSice[x].search("dev:name") != -1){
					devSName = devSice[x].replace('"dev:name":"',"").replace('"','').replace('"','').replace('"','');
					devSName = devSName.replace('\u0027',"'");
					}
					if(devSice[x].search("therm:coolsetpoint") != -1){
					C = devSice[x].replace('"therm:coolsetpoint":',"").replace('"','').replace('"','').replace('"','');
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						
						devSCoolSetPoint = '<span class="fa-stack fa-2x"><i class="fa fa-gear fa-stack-1x" style="font-size:55px;color:blue"></i>  <i class="fa fa-circle fa-stack-1x" style="font-size:35px;color:white"></i>  <i class="fa-stack-2x" style="font-size:15px;color:blue">' + Math.round(F) + 'F</i></span>';
					}	
					if(devSice[x].search("therm:heatsetpoint") != -1){
					C = devSice[x].replace('"therm:heatsetpoint":',"").replace('"','').replace('"','').replace('"','');
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						devSHeatSetPoint = '<span class="fa-stack fa-2x"><i class="fa fa-gear fa-stack-1x" style="font-size:55px;color:red"></i>  <i class="fa fa-circle fa-stack-1x" style="font-size:35px;color:white"></i>  <i class="fa-stack-2x" style="font-size:15px;color:red">' + Math.round(F) + 'F</i></span>';
					}						
					if(devSice[x].search("therm:active") != -1){
					devSThermState = "HVAC Status:" + devSice[x].replace(/'"'/g,'').replace('"therm:active":"',"").replace('"',"") + "<br>";
						if(devSThermState.search('NOTRUNNING') != -1){
							devSThermState = '<i class="fa fa-gear" style="font-size:72px"></i></i> <br>';
							}
						if(devSThermState.search('RUNNING') != -1){
							devSThermState = '<i class="fa fa-gear fa-spin" style="font-size:72px"></i><br>';
							}
						}
					if(devSice[x].search("devadv:driverversion") != -1){
					devSDriverVersion = "Driver Version:" + devSice[x].replace(/'"'/g,'').replace('"devadv:driverversion":"',"").replace('"',"") + "<br>";
					
					}
					if(devSice[x].search("irrcont:controllerState") != -1) {
						devIrrigationState = devSice[x].replace('"irrcont:controllerState":"','').replace('"',"");
						if(devIrrigationState != "RAIN_DELAY"){
						StopIrrigation = "True";
						}
					}
					if(devSice[x].search('"mot:motion":"') != -1){
					devSMotionState = "Motion Status:" + devSice[x].replace(/'"'/g,'').replace('"mot:motion":"',"").replace('"',"") + "<br>";
					
						if(devSMotionState.search('NONE') != -1){
							devSMotionState = '<i class="fa fa-circle" style="font-size:13px"></i> <br>';
							}
						if(devSMotionState.search('DETECTED') != -1){
							devSMotionState = '<i class="fa fa-rss" style="font-size:48px;color:green"><br>';
							}
						}				
					if(devSice[x].search('pres:presence":"') != -1){
						devSPresence = devSice[x].replace('pres:presence":"','').replace('"',"").replace('"',"");
						if(devSPresence.search('ABSENT') != -1){
						// devSPresence = KeyFobEG[Math.floor(Math.random()*KeyFobEG.length)] +'<br>';
						}
						if(devSPresence.search('PRESENT') != -1){
						devSPresence = '<i class="fa fa-home" style="font-size:72px"></i> <br>';
						}
						
					}
					if(devSice[x].search('devadv:protocol"') != -1) {
						devSProtocol = "Protocol:" + devSice[x].replace('devadv:protocol":','').replace('"',"") + "<br>"; 
					}
					if(devSice[x].search('devpow:source"') != -1) {
						devSSource = devSice[x].replace('"devpow:source":"','').replace('"',""); 
					}
					
					if(devSice[x].search('"dim:brightness":') != -1) {
						devSBrightness = devSice[x].replace('"dim:brightness":','').replace('"',""); 
					}
					if(devSice[x].search('fan:speed') != -1) {
						devSFanSpeed = devSice[x].replace('"fan:speed":','').replace('"',"");
						devSFanSpeed = fanSpeeds[parseInt(devSFanSpeed) -1];
					}
					if(devSice[x].search("dev:vendor") != -1) {
						devSVendor = devSice[x].replace('"','').replace(':','').replace('devvendor":"',"").replace('"',''); 
					}
					if(devSice[x].search("devota:currentVersion") != -1) {
						devSCurrentDriver = devSice[x].replace('"devota:currentVersion":"','').replace('"',"");
						// writeLogToScreen("CD:" + devSCurrentDriver);
					}
					if(devSice[x].search('"smoke:smoke":"DETECTED"') != -1) {
					devSSmoke = "true";
					console.log("I see smoke!");
					}
					if(devSice[x].search("devota:targetVersion") != -1) {
						devSTargetDriver = devSice[x].replace('"devota:targetVersion":"','').replace('"',"");
						// writeLogToScreen("TD:" +devSTargetDriver);						
					}
					if(devSice[x].search("test:lastTestTime") != -1) {
						lastTestDate = devSice[x].replace('"test:lastTestTime":','').replace('"',"");
						
						//lastTestDate = moment(parseInt(lastTestDate)).format("YYYY,MM,DD");
						//var past = Date(lastTestDate)
						var today = new Date()
						lastTestDate = calcDate(today,lastTestDate)
						// console.log(lastTestDate);
						// writeLogToScreen("TD:" +devSTargetDriver);						
					}
					if(devSice[x].search("devpow:battery") != -1) {
						devSBattery = devSice[x].replace('"devpow:','').replace('"',"").replace('battery:','');
						devSBatteryNum = devSice[x].replace('"devpow:','').replace('"',"").replace('battery:','');
						var B = parseInt(devSBatteryNum);
						devSBattery = devSBattery;
						if(B >= 0){
							devSBatteryNum = '<i class="fa fa-battery-empty" style="color:red" aria-hidden="true"></i>';
						}
						if(B >= 25){
							devSBatteryNum = '<i class="fa fa-battery-quarter" style="color:orange" aria-hidden="true"></i>';
						}
						if(B >= 50){
							devSBatteryNum = '<i class="fa fa-battery-half" aria-hidden="true"></i>';
						}
						if(B >= 75){
							devSBatteryNum = '<i class="fa fa-battery-three-quarters" aria-hidden="true"></i>';
						}	
						if(B >= 95){
							devSBatteryNum = '<i class="fa fa-battery-full" style="color:green" aria-hidden="true"></i>';
						}						
					}				
					if(devSice[x].search('cont:contact":"') != -1) {
						devSContact = devSice[x].replace('cont:contact','').replace('"',"").replace('":"',"").replace('"',"");
						//writeToScreen(devSContact);
					}				
					if(devSice[x].search('pow:instantaneous') != -1) {
						devSPower = devSice[x].replace('"attributes":{"pow:instantaneous":','').replace('"',"").replace('pow:',"").replace('instantaneous',"").replace(':',"").replace('"',"").replace('}}}',"");
					}
					if(devSice[x].search("devconn:signal") != -1) {
						devSSignal = devSice[x].replace('"devconn:','').replace('"',"").replace('signal:',""); 
					}
					if(devSice[x].search('devadv:protocol"') != -1) {
						devSProtocol = devSice[x].replace('devadv:protocol":','').replace('"',"") + '<br>'; 
					}
					if(devSice[x].search('devota:currentVersion') != -1) {
						devSUpdateStatus = devSice[x].replace('"devota:currentVersion":"','').replace('"',"") + '<br>'; 
					}
					if(devSice[x].search('"swit:state"') != -1) {
						devSState =  "Stated reported:" + devSice[x].replace('"swit:state":"','').replace('"',"") + "<br>"; 
					}
					if(devSice[x].search('temp:temperature') != -1) {
						C = devSice[x].replace('"temp:temperature":','').replace('"',"");
						var Cf = parseFloat(C);
						F = Cf * 9 / 5 + 32;
						devSTemp = Math.round(F);
					}
					if(devSice[x].search("DRIV:dev") != -1) {
						devSID = devSice[x].replace('"base:address":"DRIV:dev:','').replace('"','').replace(' ','');
						devIDlist.push(devSID);
						//writeToScreen(devSID);
					}
					if(devSice[x].search("dev:model") != -1) {
						devSModel = devSice[x].replace('"dev:model":"','').replace('"','');
						//writeToScreen(devSID);
					}
					if(devSice[x].search("therm:filterlifespandays") != -1) {
						filterLifeSpanDays = devSice[x].replace('"therm:filterlifespandays":','').replace('"','');
						
						console.log("FilterLife" + filterLifeSpanDays);
						//writeToScreen(devSID);
					}
					if(devSice[x].search('"therm:dayssincefilterchange"') != -1) {
						acFilterTime = devSice[x].replace('"therm:dayssincefilterchange"','').replace('"',"").replace(':',"");
							
						// devIDlist.push(devSID);
						console.log(acFilterTime);
					}
					if(devSice[x].search('"devconn:state":"') != -1) {
						devSOnlineStatus = devSice[x].replace('"devconn:state":"','').replace('"','');
						// if(devSOnlineStatus.search('OFFLINE') != -1){
						// devSOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:red"></i> <span class="tooltiptext">Offline</span></div>';
						// }
						// if(devSOnlineStatus.search('ONLINE') != -1){
						// devSOnlineStatus = '<div class="tooltip"><i class="fa fa-exchange" style="color:green"></i> <span class="tooltiptext">Online</span></div>';
						// }
						//writeToScreen(devSID);
					}
					if(devSice[x].search("dev:devtypehint") != -1) {
						devSType = devSice[x];
						
						//writeToScreen(devSType);
					}
					if(devSice[x].search("therm:filtertype") != -1) {
					// devIDlist.push(devSID);
						filtertype = devSice[x].replace('"therm:filtertype":"','').replace('"','');
						if(filtertype == ""){
						filtertype = 'Click to save size <i onclick="saveACFilterType('  + devIDlist.length +  ')" class="fa fa-bookmark"></i>';
						}
					}
					if(devSice[x].search("FAVORITE") != -1) {
						devSFav= "true";
					}
					if(devSice[x].search('"devadv:added":') != -1){
					if(devSSmoke != ""){
						Smoke = devSName;
						console.log("I see smoke!");
						devSSmoke = "";
					}
					if(filterLifeSpanDays == ""){
						filterLifeSpanDays = "60";
						}
						if(devSTargetDriver != ""){
							if(devSCurrentDriver == devSTargetDriver){
								devSTargetDriver = "Driver up to date <br>";
							}else{
								devSTargetDriver = "Driver update needed! <br>";
							}
						}
						var devSInfoLink =  devSID + "'";
						devSInfoLink = "'device.php?devSid=" + devSInfoLink + '"';
						if(devSFav == "true"){
						// devIDlist.push(devSID);
						devSFav = '<span id="FAV' + devSID + '">' + '<i onclick="removefromfav(' + devIDlist.length + ')"class="fa fa-heart"></i>' + '</span>';
						}else{
						// devIDlist.push(devSID);
						devSFav = '<span id="FAV' + devSID + '">' + '<i onclick="addtofav(' + devIDlist.length + ')" class="fa fa-heart-o" ></i>' + '</span>';
						}
						
					if (devSType.search("Irrigation") != -1){
						irrigationID = devSID;
					}
					if (devSType.search("Thermostat") != -1){
						console.log(acFilterTime);
						HouseTemp = devSTemp;
					}
					if ( parseInt(devSSignal) < 30 ){
						if(devSModel != "iQBR30"){
							devSNamePassed = "'" + devSName + "'";
							HTMLstat = HTMLstat + '<tr><td>' + devSName + '</td>'  
							+ '<td>Low Signal current level: '+ devSSignal +'%</td></tr>';
							HTMLtable = HTMLtable + HTMLstat;
							HTMLstat = "";
						}
					}
					if(parseInt(acFilterTime) > parseInt(filterLifeSpanDays)){
						acID = devIDlist.length;
						devSNamePassed = "'" + devSName + "'";
						HTMLstat = HTMLstat + '<tr><td>' + devSName + '</td>' 
						+ '<td>AC filter needs to be replaced <div class="tooltip"> <i onclick="resetAC(' + devIDlist.length + ')" class="fa fa-history"></i><span class="tooltiptext"> Reset AC filter timer</span></div>. Days since last reset ' + acFilterTime + '. Filter size: ' + filtertype + '</td></tr>'; 
						HTMLtable = HTMLtable + HTMLstat;
						HTMLstat = "";
					}
					if(parseInt(lastTestDate) > 90){
						if(devSVendor != "Halo"){
							devSNamePassed = "'" + devSName + "'";
							HTMLstat = HTMLstat + '<tr><td>' + devSName + '</td>'  
							+ '<td>The last test was more than 90 days</td></tr>';
							HTMLtable = HTMLtable + HTMLstat;
							HTMLstat = "";
						}
					}
					if(devSOnlineStatus.search('OFFLINE') != -1){
						devSNamePassed = "'" + devSName + "'";
						HTMLstat = HTMLstat + '<tr><td>' + devSName + '</td>'  
						+ '<td>Device Offline</td></tr>';
						HTMLtable = HTMLtable + HTMLstat;
						HTMLstat = "";
					}
					if( parseInt(devSBattery) < 40 ){
					if(devSSource != "LINE"){
						// if(devSModel != "ZW????"){
							devSNamePassed = "'" + devSName + "'";
							HTMLstat = HTMLstat + '<tr><td>' + devSName + '</td>'  
							+ '<td>Low Battery current level: ' + devSBattery + '% ';
							if((devSModel == "MotionSensor") || (devSModel == "ContactSensor")){
							 HTMLstat = HTMLstat + '<a href="https://www.amazon.com/gp/product/B00004TDSA/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=new-iris-portal-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B00004TDSA&linkId=4201baf30a14063388f2ab3ab3b7b052" target="_blank"><i class="fa fa-shopping-cart"></i></a></td></tr>';
							}else if(devSModel == "KeyPad"){
							HTMLstat = HTMLstat + '<a href="https://www.amazon.com/gp/product/B01D7KJTJW/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=new-iris-portal-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01D7KJTJW&linkId=d7f46e8dc53dca0de3bb4e654c16f830" target="_blank"><i class="fa fa-shopping-cart"></i></a></td></tr>';
							}else if(devSModel == "KeyFob"){
							HTMLstat = HTMLstat + '<a href="https://www.amazon.com/gp/offer-listing/B06VT4TX46/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B06VT4TX46&linkCode=am2&tag=new-iris-portal-20&linkId=34f266f334b8ccca972d65d56d8710ea" target="_blank"><i class="fa fa-shopping-cart"></i></a></td></tr>';
							}else{
							HTMLstat = HTMLstat + '</td></tr>';
							}
							HTMLtable = HTMLtable + HTMLstat;
							HTMLstat = "";
							// }
						}
					}
					// + '<div id="CONTACT' + devSID + '">' + devSContact + '</div>'
							lastTestDate = '';
							devSPresence = "";
							devSBrightness = "";
							devSSource = "";
							devSFav = "";
							devSName = "";
							devSNamePassed = "";
							devSThermState = "";
							devSVendor = "";
							devSModel = "";
							devSBattery = "N/A";
							devSBatteryNum = "";
							devSMotionState = "";
							devSOnlineStatus = "";
							devSSignal = "N/A";
							devSProtocol = "";
							devSState = "";
							devSType = "";
							acFilterTime = "";
							devSTemp = "N/A";
							devSContact = "";
							devSPower = "N/A";
							devSDriverVersion = "";
							devSUpdateStatus = "N/A";
							devSCurrentDriver = "";
							devSTargetDriver = "";
							devSCoolSetPoint = "";
							devSHeatSetPoint = "";
							filtertype = "";
							filterLifeSpanDays = "";
					//HTMLstat = HTMLstat + "devStype" + devSice[x] + "<br>";
					}
				}				
			}
	
	
	// $( document ).ready(function() {
    // console.log( "Getting sorttable!" );
			// $("table").tablesorter({debug: true})
		// $("a.append").click(appendData);
	// $.getScript('assets/js/jquery.tablesorter.js');
// });
}
function runHeal(){
if(zwaveInProgress == "True"){
	alert("Zwave heal is already running.")
}else{
	if (confirm("This will start a Zwave heal on your network taking 30 mins to 2 hours.") == true) {
		var message = '{"type":"hubzwave:Heal","headers":{"destination":"SERV:' + HubIDG + ':hub","correlationId":"d96a7666-ed4d-477d-86d5-506cf6e0a866","isRequest":true},"payload":{"messageType":"hubzwave:Heal","attributes":{"block":false}}}';
		websocket.send(message);
	}
}
}
function getHubInfo(Info){
	var serviceBars = "";
	var healPercent = "";
	var hubBattery = "";
	Info = Info.split(",");
	for (var i = 0; i < Info.length; i++) {
		if(Info[i].search('"hubzwave:healRecommended":true') != -1) {
			HTMLstat = HTMLstat + '<tr><td> Zwave</td>'  
			+ '<td>Zwave heal Recommended <i onclick="runHeal()" class="fa fa-medkit"></i></td></tr>';
			HTMLtable = HTMLtable + HTMLstat;
			HTMLstat = "";
		}
		if(Info[i].search('"hubzwave:healPercent"') != -1) {
			healPercent = Info[i].replace('"hubzwave:healPercent"','').replace('"',"").replace(':',"");
			healPercent = parseFloat(healPercent);
			healPercent = Math.floor(healPercent * 100);
			
		}
		if(Info[i].search('"hubzwave:healInProgress":true') != -1) {
			HTMLstat = HTMLstat + '<tr><td> Zwave</td>'  
			+ '<td>Zwave heal is running ' + healPercent + ' percent complete.</td></tr>';
			HTMLtable = HTMLtable + HTMLstat;
			HTMLstat = "";
			zwaveInProgress = "True";
		}
		if(Info[i].search('"hubzwave:healInProgress":false') != -1) {
			zwaveInProgress = "";
		}
		if(Info[i].search('"hubpow:Battery":') != -1) {
			hubBattery = parseInt(Info[i].replace('"hubpow:Battery":','').replace('"',"").replace(':',""));
			if(hubBattery <= 0){
				
			}
			if(hubBattery <= 25){
				HTMLstat = "";
				HTMLstat = HTMLstat + '<tr><td>Hub Batties VERY Low less than 25%</td>'  
				+ '<td> You need to replace your hub batteries 4 AAs</td></tr>';
				
			}
			if(hubBattery <= 50){
				HTMLstat = "";
				HTMLstat = HTMLstat + '<tr><td>Hub Batties Low less than 50%</td>'  
				+ '<td> You need to replace your hub batteries 4 AAs</td></tr>';
				
			}
			if(hubBattery <= 75){
				HTMLstat = "";
				HTMLstat = HTMLstat + '<tr><td>Hub Batties less than 75%</td>'  
				+ '<td> You need to replace your hub batteries 4 AAs</td></tr>';				
			}
			HTMLtable = HTMLtable + HTMLstat;
			HTMLstat = "";
		}
		if(Info[i].search('"hubnet:type":"3G"') != -1) {
			HTMLstat = HTMLstat + '<tr><td>Backup Cellular</td>'  
				+ '<td> Hub is running on backup cellular</td></tr>';
				HTMLtable = HTMLtable + HTMLstat;
				HTMLstat = "";
		}
		if(Info[i].search('"hub4g:signalBars"') != -1) {
			serviceBars = Info[i]
			// serviceBars =  parseInt(serviceBars.replace('"hub4g:signalBars":','').replace('"',"")); 

		}
		if(Info[i].search('"hub4g:present":true') != -1) {
			serviceBars =  parseInt(serviceBars.replace('"hub4g:signalBars":','').replace('"',"")); 
			if(serviceBars == 0){
			document.getElementById("4gSignal").innerHTML = ' <div class="tooltip"><i class="fa fa-signal" style="color:red"></i><span class="tooltiptext"> Signal Level 0 </span></div> ';
			}
			if(serviceBars == 1){
			document.getElementById("4gSignal").innerHTML = ' <div class="tooltip"><i class="fa fa-signal" style="color:red"></i><span class="tooltiptext"> Signal Level 1 </span></div> ';
			}
			if(serviceBars == 2){
			document.getElementById("4gSignal").innerHTML = ' <div class="tooltip"><i class="fa fa-signal" style="color:orange"></i><span class="tooltiptext"> Signal Level 2 </span></div> ';
			}
			if(serviceBars == 3){
			document.getElementById("4gSignal").innerHTML = ' <div class="tooltip"><i class="fa fa-signal" style="color:orange"></i><span class="tooltiptext"> Signal Level 3 </span></div> ';
			}
			if(serviceBars == 4){
			document.getElementById("4gSignal").innerHTML = ' <div class="tooltip"><i class="fa fa-signal" style="color:green"></i><span class="tooltiptext"> Signal Level 4 </span></div> ';
			}
			if(serviceBars == 5){
			document.getElementById("4gSignal").innerHTML = ' <div class="tooltip"><i class="fa fa-signal" style="color:green"></i><span class="tooltiptext"> Signal Level 5 </span></div> ';
			}
			if(serviceBars <= 1){
				HTMLstat = HTMLstat + '<tr><td>4G Signal low</td>'  
				+ '<td>4G Signal is low. Current level: ' + serviceBars + '</td></tr>';
				HTMLtable = HTMLtable + HTMLstat;
				HTMLstat = "";
			}
		}
	}
		HTMLtable = HTMLtable + HTMLstat;
	HTMLstat = "";
	document.getElementById("tbody").innerHTML = HTMLtable + "</tbody></table>";
	HTMLtable = "";	
	SHANE();
	 
}
function SHANE(){
SHANEtable = '<a href="http://shane.smarthomeportal.net/" target="_blank">SHANE</a><table><thead><tr><th>Name</th><th>Suggestion</th></tr></thead><tbody>';
 $.simpleWeather({
    location: ZipCodeG,
    woeid: '',
    unit: 'f',
    success: function(weather) {
      // HTMLweather = weather.currently+' '+weather.temp+'&deg;'+weather.units.temp+' in '+weather.city+', '+weather.region;
		HTMLweather = 'Today '+weather.forecast[0].text+' High '+weather.forecast[0].high+'&deg;'+weather.units.temp+' Low '+weather.forecast[0].low+'&deg;'+weather.units.temp+' <br> Tomorrow '+weather.forecast[1].text+' High '+weather.forecast[1].high+'&deg;'+weather.units.temp+' Low '+weather.forecast[1].low+'&deg;'+weather.units.temp+' in '+weather.city+', '+weather.region;
		// HTMLweather = 'Today '+weather.forecast[0].text+' High '+weather.forecast[0].high+'&deg;'+weather.units.temp+' Low '+weather.forecast[0].low+'&deg;'+weather.units.temp+' <br> Tomorrow '+weather.forecast[1].text+' High '+weather.forecast[1].high+'&deg;'+weather.units.temp+' Low '+weather.forecast[1].low+'&deg;'+weather.units.temp+' in City, State';
        // html = '<p>'+weather.currently+'</p>';
		SHANEtable = SHANEtable + '<tr><td>Weather</td>'
		+ '<td>' + HTMLweather + '</td></tr>';
		//Check temp and weather for good weather to open doors Scattered Showers
		if(HouseTemp != ""){
			if(weather.currently != "Rain"){
				if(weather.currently != "Thunderstorms"){
				  if( (parseInt(HouseTemp)+2) >= parseInt(weather.temp)){
					  if( (parseInt(HouseTemp)-2) <= parseInt(weather.temp)){
						console.log("SHANE weather " + weather.currently + " Temp " + weather.temp + " House temp " + HouseTemp);
						SHANEtable = SHANEtable + '<tr><td>SHANE</td>'
						+ "<td>It is currently nice out open up some windows and doors to save some money.</td></tr>";
						}
					}
				}
			}
		}
		if(Smoke != ""){
			SHANEtable = SHANEtable + '<tr><td>SHANE</td>'
			+ '<td> Oh no it looks like ' + Smoke + ' is getting a reading of smoke. If you believe this is in error call support or remove and re-add the device. </td></tr>';
		}
      // Check weather to stop for Irrigation
	  if(StopIrrigation == "True"){
		if(weather.forecast[0].text == "Rain"){
			SHANEtable = SHANEtable + '<tr><td>SHANE</td>'
			+ '<td> Looks like you are going to get rain today, would you like to delay your irrigation? <a href="#" onclick="rainDelay(' + "'" + irrigationID + "'"+ ')">YES</a> or <a href="#" onclick="alert(' + "'Still working on this.'" + ')">NO</a> </td></tr>';
		}
		if(weather.forecast[0].text == "Thunderstorms"){
			SHANEtable = SHANEtable + '<tr><td>SHANE</td>'
			+ '<td> Looks like you are going to get thunderstorms today, would you like to delay your irrigation for 24 hours? <a href="#" onclick="rainDelay(' + "'" + irrigationID + "'"+ ')">YES</a> or <a href="#" onclick="alert(' + "'Still working on this.'" + ')">NO</a> </td></tr>';
		}
	  }
	  document.getElementById("shane-tbody").innerHTML = SHANEtable + "</tbody></table>";
	  SHANEtable = "";	
    },
    error: function(error) {
      // $("#weather").html('<p>'+error+'</p>');
      HTMLweather = error;
    }
  });
}
function rainDelay(ID){
var message = '{"type":"sublawnngarden:Skip","headers":{"destination":"SERV:sublawnngarden:' + placeIDG + '","correlationId":"1fdc400d-dc0f-462d-bce2-07948b26a096","isRequest":true},"payload":{"messageType":"sublawnngarden:Skip","attributes":{"hours":24,"controller":"DRIV:dev:' + ID + '"}}}';
websocket.send(message);
alert("This will take minute or two to show up");
window.location.reload(true);
}
function getAlarmState(Info){
	var alarmState = "";
	var alarmLocal = "";
	Info = Info.split(",");
	for (var i = 0; i < Info.length; i++) {
		if(Info[i].search('subalarm:alarmProvider') != -1) {
		console.log(Info[i]);
		alarmLocal = Info[i].replace('"subalarm:alarmProvider":"','').replace('"',"");
			console.log("Alarm Provider Found " + alarmState);	
			if(alarmLocal == "HUB"){
			// document.getElementById("alarmStatus").innerHTML = '<i class="fa fa-bell"></i>';
			document.getElementById("alarmProvider").innerHTML = '<div class="tooltip"><i class="fa fa-hdd-o"></i><span class="tooltiptext"> Local </span></div>';
			}
			if(alarmLocal == "PLATFORM"){
			// document.getElementById("alarmStatus").innerHTML = '<i class="fa fa-bell-slash"></i>';
			document.getElementById("alarmProvider").innerHTML = '<div class="tooltip"><i class="fa fa-cloud" ></i><span class="tooltiptext"> Cloud </span></div>';
			}
		}
		if(Info[i].search('subsecurity:alarmState') != -1) {
			alarmState = Info[i].replace('"subsecurity:alarmState":"','').replace('"',"");
			console.log("Alarm State Found " + alarmState);	
			if(alarmState == "ARMED"){
			// document.getElementById("alarmStatus").innerHTML = '<i class="fa fa-bell"></i>';
			document.getElementById("alarmStatus").innerHTML = '<div class="tooltip"><i class="fa fa-bell" style="color:red"></i><span class="tooltiptext"> Alarm Armed </span></div>';
			}
			if(alarmState == "DISARMED"){
			// document.getElementById("alarmStatus").innerHTML = '<i class="fa fa-bell-slash"></i>';
			document.getElementById("alarmStatus").innerHTML = '<div class="tooltip"><i class="fa fa-bell-slash" style="color:green"></i><span class="tooltiptext"> Alarm Disarmed </span></div>';
			}
		}
	}
}