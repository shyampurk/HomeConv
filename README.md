# Home Automation Virtual Agent
A Chat Interface for sending commands to your home devices via the Watson Conversation API 

## Setup
Before you try out this application, you will need to setup your Watson conversation service workspace and a PubNub BLOCK.

PubNub BLOCK acts as the virtual agent and the code that runs within the BLOCK is [here](/block/main.js). Refer to this [README file](block/README.md) for setting up and executing your BLOCK. 

Follow the steps below to setup the conversation workspace and dialog.  

	- In the step description for conversation service, the word block refers to the dialog creation node. 
	  This is not to be confused with the word BLOCK (in all caps) which refers to the PubNub microservice.

	- Once the conversation service is created, you need to copy some credentials from your conversation workspace
	  to the BLOCK code. This is required for the virtual agent to correctly invoke the conversation service and 
	  decipher the commands. There are three parameters to be copied
	  
	  a. Pay attention to the step 4.2 where you have to copy the conversation workspace credentials into your BLOCK code.
	  b. Refer to the "Conversation API Credentials" section below to copy your conversation workspace's username and password
	     to the BLOCK code.
	  
	  

## Watson Conversation Service



## Step 1 : 
Log on to Bluemix with your IBM ID and go to catalog, and select "Conversation" under Watson services.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_1.png)

## Step 2 : 
Enter the service name and make the connect to field "leave unbound" and scroll down and select the Free pricing plan, then click on Create button.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_2.png)

<hr>

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_3.png)


## Step 3 : 
Open the "Home Automation" service then click on the "Launch tool" button.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_4.png)
		
## Step 4 : 
Click on the create button, then enter the name for the workspace

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_5.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_6.png)

### Step 4.1 : 
Once the workspace is created.Click the menu icon in the upper-right corner of the tile for the created workspace, and then select View details.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_workspacedetails.png)

### Step 4.2 : 
Then copy the workspace id and then paste in the main.js code [here](https://github.com/shyampurk/HomeConv/blob/master/block/main.js) in line number 24 .

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_wsid.png)<br>

### Step 4.3 : 
Replace the highlighted id with your workspace.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_code.png)
		
## Step 5 : 
Open the created workspace, Click on the Intents and start entering the intents.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_7.png)	

### Step 5.1 : 
You can enter the intents like the following picture (following picture shown for the intent <strong>"turnon"</strong>)

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_8.png)		

### Step 5.2 : 
You can follow the same procedure for the remaining intents.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_turnoff.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_is.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_intents.png)

## Step 6 : 
Open Entities tab, and click on "Create new" button then start entering the entities.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_10.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_11.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_12.png)

You have created an Entity.

## Step 7 : 
Open the Dialog tab and click on the create button. 

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_13.png)

### Step 7.1 : 
Start writing the initial Node

### Step 7.2 : 
Give a name to that node for example start Node like shown in the image.

### Step 7.3 : 
Select "conversation_start(create new condition)" in the Trigger field, and In the response write the introduction message as shown in the image.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_startnode.png)	
			   			   
Your first node is created.


## Step 8 : 
To create another node click on the plus symbol down the first node.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_16.png)

### Step 8.1 : 
Write the Name for the node in the name field.

### Step 8.2 : 
In the Trigger field write "#turnon(create new condition)", then close the node.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on1.png)

### Step 8.3 : 
Click on the plus next to the node. Write the name in the name field as shown and write the "@room(create new condition)"  condition in the Trigger field,

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on2.png)

Write "Turning ON @room" under the responses.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on3.png)

### Step 8.4 : 
Then select the "Jumpto" icon on "Turn on intent node"

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on4.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on5.png)

and then click on "Room_on" node, then select "Go to condition".	

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on6.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_on7.png)

Your "turnon" node is created

## Step 9 : 
In the similar way you can create blocks for the "turnoff" and "is" intents by repeating the steps from 8.2 to 8.4.

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_turnoffpic.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_ispic.png)
<hr>
![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_dialogsblocks.png)

## Step 10 : 
Anything else block is for any other <strong>irrelevant messages</strong>.Enter the name in the name field,condition will be predefined in the trigger field or else write "anything_else(create new condition)" in the trigger field, and the in the response field write "sorry i am not trained to anwer this question" and "Command not identified".

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_anything2.png)

### Note : 
Here you can see the response variations as sequential and random.You can select any of the option.

	1.sequential - Will give response in a sequence manner
	2.random - Will give response in random


## Conversation API Credentials

### Step 1 : 
Open the block code [here](https://github.com/shyampurk/HomeConv/blob/master/block/main.js)

### Step 2 : 
Open the conversation api service and goto the "Service Credentials".

![alt-tag](https://github.com/shyampurk/HomeConv/blob/master/screenshots/conv_api/conv_api_servicecreds.png)  

### Step 3 : 
Replace the username in line number 9 and password line number 10  with the credentials you got.



