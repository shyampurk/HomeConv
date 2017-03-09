export default (request) => {
    // Required modules
    const xhr = require("xhr");
    const basicAuth = require('codec/auth');
    const pubnub = require("pubnub"); // xmlHttp request module
    const db = require("kvstore"); //Database module
    
    
    var username = '700d1afb-465b-4814-aa85-c1c8dbf8ab1d'; // Username for the conversation api
    var password = 'HnXJIcPt8grA';                         // password for the conversation api
    var auth = basicAuth.basic(username,password);
    
    // variables for functional purpose.
    var intent = null;
    var message = null;
    var entity = null;
    var control = "control";
    var monitor = "monitor";
    var error = "error";
    var start = "start";


    // URL for the conversation api.
    const url = "https://gateway.watsonplatform.net/conversation/api/v1/workspaces/6fd364a5-748f-47c3-8071-3ccb3bff41a9/message?version=2017-02-03";

    // The field name to store the context of the message body.
    var fieldname = "context";

    // http options for the rest call.
    const http_options = {
        "method": "POST",
        
        "headers": {
                "Content-Type": "application/json",
                "Authorization":auth
    },
            "body":{}
    };

    // Pubnub Publish channel on which we will broadcast the messages.
    var pubchannel = "smarthome_response";

    // message body
    http_options.body = {"input":{"text":request.message.Command},"context":{}};


       

    // Checking for the initial message of the conversation. 
    if (request.message.Command == "start"){
        
        
        var context_value = {};
        db.set(fieldname,context_value);
                    
    }


    // Fetching value for the context field value from the database to update the message body.
    db.get(fieldname).then((database_value)=>{
    
    if (database_value)
        {
           

           http_options["body"] = {"input":{"text":request.message.Command},"context":database_value};
           // Calling the conv_call function.
           conv_call(http_options);
        }
    else
        {

          http_options["body"]["input"]["context"] = {};
          // call the conv_call function
          conv_call(http_options); 
        }    
    });// db call ending    

    /*
        Name - broadcastMessage
        Description - Function used to send message to users via pubnub
        Parameters - pubchannel : Channel for braodcasting the message
                     message : Message to be sent to users

    */
    function BroadcastMessage(pubchannel,message)

        {

            // Broadcasting the Message to the User.
                
                pubnub.publish({
                channel   : pubchannel,
                message   : message,
                callback  : function(e) { 
                    console.log( "SUCCESS!", e );
                },
                error     : function(e) { 
                    console.log( "FAILED! RETRY PUBLISH!", e );
                }
            }); 

        }


    /*
        Name - conv_call
        Description - Function used to invoke conversation api call and send replies to users
        Parameters - http_options : Options like username and password for api call                     

    */
    function conv_call(http_options){    
        xhr.fetch(url, http_options).then((x) => {
                const body = JSON.parse(x.body);
                console.log("CONVERSATION API REPLY ----->",body);
                
                // Updating the context field in the database with the new context from the message body.
                db.set(fieldname,body.context);
                
                
                if (body["intents"].length !==0)
                    
                {
                    // Extracting intents from the API reply.
                
                    intent = body.intents[0].intent;
                    console.log("THE INTENT ---->",intent);
                
                    // Checking for the turnon/turnoff conditions.
                    if (intent == "turnon" || intent == "turnoff")
                    {
                        
                        // Forming the control message - incase if user wants to turnon/turnoff the bulb in a room.
                        message = {"Type":control,"Intent":intent,"Entity":body.entities[0].value,"Message":body.output.text[0]};
                        // message publish function call
                        BroadcastMessage(pubchannel,message);
                        // Setting room state in the database ({"roomname":state} example {"bedroom":"on"})
                        db.set(body.entities[0].value,body.output.text[0].split(" ")[1]);              
                            
                    }
                    
                    
                    // Checking for the monitoring messages
                    if(intent == "is")
                    {
                       db.get(body.entities[0].value).then((database_value)=>{
                        console.log("FETCHED DATABASE VALUE IN MONITORING-->",database_value);
                        if (database_value)
                            {
                            // Forming monitoring message - in case if user asks for the bulb status in a room.
                            message = {"Type":monitor,"Entity":body.entities[0].value,"Status":database_value,"Message":body.output.text[0]};
                                  
                            }
                        else{
                            // Forming monitoring not available message - incase if the room status is not available in the database. 
                            message = {"Type":monitor,"Entity":body.entities[0].value,"Status":"Unknown","Message":body.output.text[0]};
                        }
                        // message publish function call.
                        BroadcastMessage(pubchannel,message);
                        });// db call ending    

                    }
                } 

                // Checking for the irrelevant(not related to the conversation) messages.
                else 
                {
                    console.log("INTENT",body.intents);    
                    if (body.output.nodes_visited[0] == "Start Node")
                    {
                        // Forming starting message - for the initial message.
                        message = {"Type":start,"Message":body.output.text[0]};
                        // message publish function call.
                        BroadcastMessage(pubchannel,message);    
                    }
                    else{
                        // Forming error message - in the case if input does not have related commands predefined
                        message = {"Type":error,"Message":body.output.text[0]};
                        // message publish function call.
                        BroadcastMessage(pubchannel,message);   
                    }
                    
                }

            });
    }

        

    return request.ok();
};
