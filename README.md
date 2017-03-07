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
Click the menu icon in the upper-right corner of the tile for the imported workspace, and then select View details.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_workspacedetails.png)
Step 4.2 : Then copy the workspae id and then paste in the main.js code in line no.23.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_workspaceid.png)
Step 4.3 : Replace the highlighted id with your workspace.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_code.png)
		
Step 5 : Open the created workspace and click on Intents start entering the intents.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_7.png)	
Step 5.1 : You can enter the intents like following picture (following picture shown for the intent <br>"turnon")
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_8.png)		
Step 5.2 : You can follow the same procedure for the remaining intents.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_turnoff.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_is.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_offtopic.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_9.png)

Note : For "offtopic" intent give atleast one random choice, for example "asdf".

Step 6 : Click on the Entities and click on "Create new" and start entering the entities.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_10.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_11.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_12.png)
You have created an Entity.

Step 7 : Click on the Dialog 
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_13.png)
Step 7.1 : Start writing the Node 1 (start node)<br>
Step 7.2 : Write the name for the node<br>
Step 7.3 : Select "conversation_start(create new condition)" in the Trigger field.<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_14.png)	
Step 7.4 : In the responses write the introduction message.			   			   
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_15.png)
Your first node is created.


Step 8 : To create another node click on the plus symbol down the first node.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_16.png)
Step 8.1 : Write the Name.<br>
Step 8.2 : Under the Trigger field write "#turnon(create new condition)"
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_17.png)
Step 8.3 : Click on the plus next to the node write the name and write the "@room(create new condition)" and write "Turning ON @room" under the responses.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_18.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_19.png)
Step 8.4 : Then select the "Jumpto" symbol on "Turnon_Intent_node" and then click on "Room_on" node then select "Go to condition".	
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_20.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_21.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_22.png)
Step 8.5 : Click on plus symbol down the "Room_on" node
and enter name and select the "true(create new condition)" under Trigger and under responses write "$turnon(create new condition)" condition and write "room not identified" reponse.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_23.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_24.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_25.png)

Your "turnon" node is created
	
												

Step 9 : Follow the same procedure to create for "turnoff" and "is" intents
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_26.png)

Step 10 : Create one more node called the "offtopic".
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_27.png)
Step 11 : Create the anything else node for any other irrelevant messages.
Enter the name and select the condition "anything_else(create new condition)" under trigger and the response
will be "sorry i am not trained for this question".
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_28.png)


