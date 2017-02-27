export default (request) => {
    // Required modules
    const xhr = require("xhr");
    const basicAuth = require('codec/auth');
    const pubnub = require("pubnub"); // xmlHttp request module
    const db = require("kvstore"); //Database module
    
    
    var username = '4939be65-d9dc-434a-bc0b-1354edcaf65f'; // Username for the conversation api
    var password = '5yC8uRMgqkrD';                         // password for the conversation api
    var auth = basicAuth.basic(username,password);
    
    // variables for functional purpose.
    var intent = null;
    var message = null;
    var entity = null;
    var control = "control";
    var monitor = "monitor";
    var error = "error";


    // URL for the conversation api.
    const url = "https://gateway.watsonplatform.net/conversation/api/v1/workspaces/f4159120-5cd4-4c3f-9d72-9c763d42d059/message?version=2016-09-20";

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

    // Checking for the initial message of the conversation. 
    if (request.message.Command == "start"){
        
        
        request.message.Command = "turn on";            
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
        Name - conv_call
        Description - Function used to conversation api call and sending replies to users
        Parameters - http_options : Options like username and password for api call                     

    */
    function conv_call(http_options){    
        xhr.fetch(url, http_options).then((x) => {
                const body = JSON.parse(x.body);
                console.log("CONVERSATION API REPLY ----->",body);
                
                // Updating the context field in the database with the new context from the message body.
                db.set(fieldname,body.context);
                
                // Extracting intents from the API reply.
                intent = body.intents[0].intent;
                console.log("THE INTENT ---->",intent);
                
                // Checking for the turnon/turnoff conditions.
                if (intent == "turnon" || intent == "turnoff")
                {
                    // Extracting the Entities.
                    entity = body.entities;
                    if (entity.length!==0)
                        {
                            // Forming the control message - incase if user wants to turnon/turnoff the bulb in a room.
                            message = {"Type":control,"Intent":intent,"Entity":body.entities[0].value,"Message":body.output.text[0]};
                            // message publish function call
                            BroadcastMessage(pubchannel,message);
                            // Setting room state in the database ({"roomname":state} example {"bedroom":"on"})
                            db.set(body.entities[0].value,body.output.text[0].split(" ")[1]);              
                        }
                    else{
                        // Forming error message - If user enters a room that is not predefined or anyother irrelavant messages 
                        message = {"Type":error,"Intent":intent,"Entity":body.entities,"Message":body.output.text[0]};
                        // message publish function call.
                        BroadcastMessage(pubchannel,message);
                        
                    }    
                }
                
                
                // Checking for the monitoring messages
                if(intent == "is")
                {
                    // Extracting the entities. 
                   entity = body.entities;

                    if (entity.length !== 0)
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
                        message = {"Type":monitor,"Entity":body.entities[0].value,"Status":"Not available","Message":body.output.text[0]};
                    }
                    // message publish function call.
                    BroadcastMessage(pubchannel,message);
                    });// db call ending    

                    }
                   else{
                        // Forming error message - in the case if input does not contain any entity(means room name)
                        message = {"Type":error,"Entity":body.entities,"Status":"Not available","Message":body.output.text[0]};
                        // message publish function call.
                        BroadcastMessage(pubchannel,message);
                   }  

                    
                }

                // Checking for the offtopic(not related to the conversation) messages.
                if (intent == "offtopic")
                {
                    // Forming error message - in the case if input does not have related commands predefined
                    message = {"Type":error,"Message":body.output.text[0]};
                    // message publish function call.
                    BroadcastMessage(pubchannel,message);
                }

            });
    }

        

    return request.ok();
};