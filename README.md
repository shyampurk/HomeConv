# Home Automation Virtual Agent
A Chat Interface for sending commands to your home devices via the Watson Conversation API 

## Setup
Before you try out this application, you will need to setup your Watson conversation service workspace and a PubNub BLOCK.

PubNub BLOCK acts as the virtual agent and the code that runs within the BLOCK is [here](/block/main.js). Refer to this [README file](block/README.md) for setting up and executing your BLOCK. 

Follow the steps below to setup the conversation workspace and dialog.  

	- In the step description for conversation service, the word block refers to the dialog creation node. This is not to be confused with the word BLOCK which refers to the PubNub microservice.

	- Pay attention to the step 4.2 where you have to copy the conversation workspace credentials into your BLOCK code. This is required for the virtual agent to correctly invoke the conversation service and decipher the commands. 

## Watson Conversation Service



Step 1 : Log on to Bluemix with your IBM ID and go to catalog, and select "Conversation" under Watson services.
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
Step 4.2 : Then copy the workspace id and then paste in the main.js code [here](https://github.com/shyampurk/HomeConv/blob/master/block/main.js) in line number 24 <br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_wsid.png)<br>
Step 4.3 : Replace the highlighted id with your workspace.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_code.png)
		
Step 5 : Open the created workspace, Click on the Intents and start entering the intents.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_7.png)	
Step 5.1 : You can enter the intents like the following picture (following picture shown for the intent <strong>"turnon"</strong>)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_8.png)		
Step 5.2 : You can follow the same procedure for the remaining intents.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_turnoff.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_is.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_intents.png)
Step 6 : Open Entities tab, and click on "Create new" button then start entering the entities.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_10.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_11.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_12.png)
You have created an Entity.

Step 7 : Open the Dialog tab and click on the create button. 
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_13.png)
Step 7.1 : Start writing the initial Node<br>
Step 7.2 : Give a name to that node for example start Node like shown in the image. <br>
Step 7.3 : Select "conversation_start(create new condition)" in the Trigger field, and <br>In the response write the introduction message as shown in the image.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_startnode.png)	
			   			   
Your first node is created.


Step 8 : To create another node click on the plus symbol down the first node.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_16.png)
Step 8.1 : Write the Name for the node in the name field.<br>
Step 8.2 : In the Trigger field write "#turnon(create new condition)", then close the node.
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on1.png)
Step 8.3 : Click on the plus next to the node write the name in the name field, and write the "@room(create new condition)"  condition in the Trigger field, <br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on2.png)
Write "Turning ON @room" under the responses.<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on3.png)
Step 8.4 : Then select the "Jumpto" icon on "Turn on intent node"<br> 
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on4.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on5.png)
and then click on "Room_on" node, then select "Go to condition".<br>	
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on6.png)
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on7.png)

Your "turnon" node is created

Step 9 : In the similar way you can create blocks for the "turnoff" and "is" intents by repeating the steps from 8.2 to 8.4.<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_turnoffpic.png)<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_ispic.png)<br>


		 
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_dialogsblocks.png)


	

Step 10 : Anything else block is for any other <strong>irrelevant messages</strong>.<br>
Enter the name in the name field,condition will be predefined in the trigger field or else write "anything_else(create new condition)" in the trigger field, and the in the response
field write "sorry i am not trained to anwer this question" and "Command not identified".
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_anything2.png)

Note : Here you can see the response variations sequential and random, you can select any of the option.
sequential - Will give response in a sequence manner<br>
random - will give response in random


# API KEYS

Step 1 : Open the block code [here](https://github.com/shyampurk/HomeConv/blob/master/block/main.js)<br>
Step 2 : Open the conversation api service and goto the "Service Credentials".<br>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_servicecreds.png)  
Step 3 : Replace the username in line number 9 and password line number 10  with the credentials you got.



