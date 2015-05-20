disable = false;

setTimeout(function() { //disable constant reloading of page
	if (!disable) window.reload = false;	
},500);

function handleClick() {
	if (!$(this).hasClass("toggle")) return true;
	var action = $(this).data("action");
	var value = $(this).data("value");
	var key = $(this).parent().data("key");
	var keyParts = key.split(" ");
	var newValue = value == 1 ? 0 : 1;
	var url = "/"+action+"/"+(parseInt(keyParts[1])+1)+"/"+newValue;
	var $el = $(this);
	$el.addClass("busy");
	$.get(url).success(function() {
		$el.removeClass("busy");
		var info = pinData[keyParts[0]][keyParts[1]];
		if (action == "set") info.pinValue = newValue;
		if (action == "mode") info.pinMode = newValue;
		if (action == "pullup") info.pinPullup = newValue;
		updateValues();
	});
	return false;
}

function createPin(key,name) {
	var $pin = $("<div class='pin' />");
	$pin.data("key",key)
	if (key.startsWith("io")) {
		$pin.append($("<span class='pinName bubble'></span>").text(name));
		$pin.append($("<span data-action='mode' class='pinMode bubble toggle'></span>").click(handleClick));
		$pin.append($("<span data-action='set' class='pinValue bubble toggle'></span>").click(handleClick));
		$pin.append($("<span data-action='pullup' class='pinPullup bubble toggle'></span>").click(handleClick));
	} else if (key.startsWith("adc")){
		$pin.append($("<span class='pinName bubble'></span>").text(name));
		$pin.append($("<span class='pinValue adc'></span>"));
	}
	
	return $pin;
}

var pinData = {};

function updatePin($el) {
	var key = $el.data("key");
	var keyParts = key.split(" ");
	var info = pinData[keyParts[0]][keyParts[1]];
	$el.data("info",info);
	if (key.startsWith("io")) {
		$el.find(".pinMode").data("value",info["pinMode"])
			.text(info["pinMode"] == 1 ? "OUT" : "IN")
			.toggleClass("ON",info["pinMode"] == 1);
		
		$el.find(".pinValue")
			.data("value",info["pinValue"])
			.text(info["pinValue"] == 1 ? "HIGH" : "LOW")
			.toggleClass("ON",info["pinValue"] == 1)
			.toggleClass("toggle",info["pinMode"] == 1);
			
		$el.find(".pinPullup")
			.data("value",info["pinPullup"])
			.text(info["pinPullup"] == 1 ? "PULLUP" : "FLOAT")
			.toggleClass("ON",info["pinPullup"] == 1)
			.toggle(info["pinMode"] == 0);
		
	} else if (key.startsWith("adc")) {
		$el.find(".pinValue").text(info.pinValue);
	}
}

function loadPinData() {
	pinData = {io:[],adc:[]};
	$.get("/api").success(function(data) {
		var lines = data.split("\n");
		for (var i=0; i<lines.length; i++) {
			var line = lines[i];
			if (i < 12) {
				pinData.io.push({
					pinMode:line[0]==1,
				    pinValue:line[1]==1,
				    pinPullup:line[2]==1 
				});
			} else {
				pinData.adc.push({
				    pinValue:line
				});
			}
		}
		updateValues();
	});
}

function updateValues() {
	$(".pin").each(function() {
		updatePin($(this));
	})
}

function main() {
	$(document.body).empty();
	
	var $el = $("<div />");
	$(document.body).prepend($el);
	for (var i=0; i<12; i++) {
		var name = i < 8 ? "Port "+i : "Relay "+(i-7);
		var $pin = createPin("io "+i,name);
		$el.append($pin);
	}
	
	for (var i=0; i<7; i++) {
		var name = "ADC "+i;
		var $pin = createPin("adc "+i,name);
		$el.append($pin);
	}
	
	setInterval(loadPinData,500);
	
	$("a").click(function() {
		console.log("clicked");
		$.get($(this).attr("href"));
		return false;
	});
}

if (!disable) {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.onload = function() {
		main();
	};
	
	s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js";
	
	document.head.appendChild(s);
}
