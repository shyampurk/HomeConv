# HomeConv
A Chat Interface for sending Commands to Your Home via the Watson Conversation API 

# Conversation api


Step 1 : Open your Bluemix with valid credentials and goto catalog, and Select the Conversation under Watson services.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_1.png)

Step 2 : Enter the service name and make the connect to field "leave unbound" and scroll down and select the Free pricing plan, then click on Create button.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_2.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_3.png)


Step 3 : Open the "Home Automation" service then click on the "Launch tool" button.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_4.png)
		
Step 4 : Click on the create button, then enter the name for the workspace
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_5.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_6.png)

Step 4.1 : Once the workspace is created.<br>
Click the menu icon in the upper-right corner of the tile for the created workspace, and then select View details.<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_workspacedetails.png)<br>
Step 4.2 : Then copy the workspae id and then paste in the main.js code [here](https://github.com/shyampurk/HomeConv/blob/master/block/main.js) in line number 24 <br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_wsid.png)
Step 4.3 : Replace the highlighted id with your workspace.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_code.png)
		
Step 5 : Open the created workspace and click on Intents start entering the intents.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_7.png)	
Step 5.1 : You can enter the intents like following picture (following picture shown for the intent <br>"turnon")
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_8.png)		
Step 5.2 : You can follow the same procedure for the remaining intents.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_turnoff.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_is.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_intents.png)
Step 6 : Click on the Entities and click on "Create new" and start entering the entities.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_10.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_11.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_12.png)
You have created an Entity.

Step 7 : Click on the Dialog 
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_13.png)
Step 7.1 : Start writing the Node 1 (start node)<br>
Step 7.2 : Write the name for the node<br>
Step 7.3 : Select "conversation_start(create new condition)" in the Trigger field, and <br>In the responses write the introduction message.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_startnode.png)	
			   			   
Your first node is created.


Step 8 : To create another node click on the plus symbol down the first node.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_16.png)
Step 8.1 : Write the Name for the block in the name field.<br>
Step 8.2 : In the Trigger field write "#turnon(create new condition)", then close the block.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on1.png)
Step 8.3 : Click on the plus next to the block write the name in the name field, and write the "@room(create new condition)"  condition under the Trigger field and write "Turning ON @room" under the responses.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on2.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on3.png)
Step 8.4 : Then select the "Jumpto" symbol on "Turn on Intent node" and then click on "Room_on" node then select "Go to condition".	
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on4.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on5.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on6.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on7.png)

Your "turnon" node is created

Step 9 : In the similar way you can create blocks for the "turnoff" and "is" <br>intents by repeating the steps from 8.2 to 8.4 by doing the following changes in those steps.

Step 9.1 : "turnoff" intent <br>
	step 8.2  turnon(create new condition)  - turnoff(create new condition)<br>
	step 8.3  "Turning ON @room"            - "Turning OFF @room"<br>
	step 8.4  "Turnon_intent_node"          - "Turnoff_intent_node"<br>
			  "Room_on"                     - "Room_off"<br>
	
Step 9.2 : "is" intent	<br>
	step 8.2  turnon(create new condition)  - is(create new condition)<br>
	step 8.3  "Turning ON @room"            - "Status @room"<br>
	step 8.4  "Turnon_intent_node"          - "status_query_node"<br>
			  "Room_on"                     - "is"<br>
		 
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_dialogsblocks.png)


	

Step 10 : In the anything else block for any other irrelevant messages.
Enter the name in the name field and condition will be predefined in the trigger field or else write "anything_else(create new condition)" in the trigger field, and the in the response
field write "sorry i am not trained to anwer this question" and "Command not identified".
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_anything2.png)

Note : Here you can see the response variations either sequential or random, you can select any of the option.


# API KEYS

Step 1 : Open the block code [here](https://github.com/shyampurk/HomeConv/blob/master/block/main.js)<br>
Step 2 : Open the conversation api service and goto the "Service Credentials".<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_servicecreds.png)  
Step 3 : Replace the username in line number 9 and password line number 10  with the credentials you got.



