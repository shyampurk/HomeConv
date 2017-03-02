/************************************************************************
	SMART HOME APPLICATION - MONITOR & CONTROL 
*************************************************************************/	
var rooms = ["kitchen","livingroom","bedroom","childrenroom","portico"];

var pubnub = PUBNUB({
    publish_key : 'pub-c-578b72c9-0ca2-4429-b7d4-313bbdf9b335',
    subscribe_key : 'sub-c-471f5e36-e1ef-11e6-ac69-0619f8945a4f'
});

/************************************************************************
	FUNCTION NAME : home_init()
    DESCRIPTION   : Initialize the app - Get status of each bulbs in home
*************************************************************************/
function home_init(){
	for (var i = 0; i < 5; i++) {
		var messageCommand = "is "+rooms[i]+" on";
		console.log(messageCommand)
		var message ={"Command":messageCommand};
		pub_publish(message);		
		setTimeout(5000);
	};
};

/************************************************************************
	FUNCTION NAME : pub_subscribe()
    DESCRIPTION   : Subscribe's to the control channel
*************************************************************************/
function pub_subscribe(){
	pubnub.subscribe({
	    channel : "smarthome_response",
	    message : function(m){
	        console.log(m)
	        home_control(m);
	    },
	    error : function (error) {
	        console.log(JSON.stringify(error));
	    }
	});
}; 

/************************************************************************
	FUNCTION NAME : home_control()
    DESCRIPTION   : Turn's On/Off the bulb in the home according to 
    				Intent(on/off command) and Entity(rooms) 
*************************************************************************/
function home_control(m){

	if(m.Type == "control"){
		if(m.Entity == "kitchen"){
			if(m.Intent == "turnon"){
				$('#kitchenbulb').css({ fill: "#FFDB55" });
			}
			else{
				$('#kitchenbulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "livingroom"){
			if(m.Intent == "turnon"){
				$('#livingroombulb').css({ fill: "#FFDB55" });
			}else{
				$('#livingroombulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "bedroom"){
			if(m.Intent == "turnon"){
				$('#bedroombulb').css({ fill: "#FFDB55" });
			}else{
				$('#bedroombulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "childrenroom"){
			if(m.Intent == "turnon"){
				$('#childrenroombulb').css({ fill: "#FFDB55" });
			}else{
				$('#childrenroombulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "portico"){
			if(m.Intent == "turnon"){
				$('#porticobulb').css({ fill: "#FFDB55" });
			}else{
				$('#porticobulb').css({ fill: "#000000" });
			}
		}
	}else if(m.Type == "monitor"){
		if(m.Entity == "kitchen"){
			if(m.Status == "on" || m.Status == "ON"){
				$('#kitchenbulb').css({ fill: "#FFDB55" });
			}
			else{
				$('#kitchenbulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "livingroom"){
			if(m.Status == "on" || m.Status == "ON"){
				$('#livingroombulb').css({ fill: "#FFDB55" });
			}else{
				$('#livingroombulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "bedroom"){
			if(m.Status == "on" || m.Status == "ON"){
				$('#bedroombulb').css({ fill: "#FFDB55" });
			}else{
				$('#bedroombulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "childrenroom"){
			if(m.Status == "on" || m.Status == "ON"){
				$('#childrenroombulb').css({ fill: "#FFDB55" });
			}else{
				$('#childrenroombulb').css({ fill: "#000000" });
			}
		}else if(m.Entity == "portico"){
			if(m.Status == "on" || m.Status == "ON"){
				$('#porticobulb').css({ fill: "#FFDB55" });
			}else{
				$('#porticobulb').css({ fill: "#000000" });
			}
		}
	}else{
		console.log("Invalid message");
		console.log("Received message from block : ",m);
	}
};

/*********************************************************************************
	FUNCTION NAME : pub_publish()
    DESCRIPTION   : publish query command to block for welcome and status message 
**********************************************************************************/
function pub_publish(pub_msg){
	pubnub.publish({
	    channel : "smarthome_request",
	    message : pub_msg,
	    callback : function(m){
	        console.log(m)
	    }
	});
};

$(document).ready(function () {
	// Starts subscribing to response channel
	pub_subscribe();
	
	// To get current status of all bulbs when opening page
	home_init();
	
	// To set welcome message when opening page
	var welcome_pub_msg = {"Command":"start"}
	pub_publish(welcome_pub_msg);

});