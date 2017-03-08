/************************************************************************
	SMART HOME APPLICATION - MONITOR & CONTROL 
*************************************************************************/
	var pubnub = PUBNUB({
	    publish_key : 'pub-c-578b72c9-0ca2-4429-b7d4-313bbdf9b335',
	    subscribe_key : 'sub-c-471f5e36-e1ef-11e6-ac69-0619f8945a4f'
	});

/************************************************************************
	FUNCTION NAME : pub_subscribe()
    DESCRIPTION   : Subscribe's to the control channel
*************************************************************************/	
	function pub_subscribe(){
		pubnub.subscribe({
		    channel : "smarthome_response",
		    message : function(m){
		        console.log(m)
		        message_notification(m);
		    },
		    error : function (error) {
		        console.log(JSON.stringify(error));
		    }
		});
	}; 

/************************************************************************
	FUNCTION NAME : message_notification()
    DESCRIPTION   : Receives the notification from block and displays
*************************************************************************/
	function message_notification(m){
		
		$("#textInput").val('');
		
		if(m.Type == "monitor"){
			$("#respMsg").text(m.Entity +" light is "+m.Status);
		}else if(m.Type == "error"){
			$("#respMsg").text(m.Message);
		}else if(m.Type == "start"){
			$("#respMsg").text(m.Message);
		}else if(m.Type == "control"){
			$("#respMsg").text(m.Message +" bulb");
		}
	};

/*********************************************************************************
	FUNCTION NAME : pub_publish()
    DESCRIPTION   : publish control command to block  
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
		
	var welcome_pub_msg = {"Command":"start"}
	
	pub_publish(welcome_pub_msg);

	pub_subscribe();
	
	$("#textSubmit").click(function() {
		var controlMsg = $("#textInput").val();
		var pub_msg = {"Command":controlMsg}
		pub_publish(pub_msg);
		$("#textInput").val('');
	});
});