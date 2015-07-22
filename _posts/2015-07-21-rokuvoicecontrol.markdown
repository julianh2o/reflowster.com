---
layout: post
title:  "Controlling your Roku with a voice interface (via Amazon Echo)"
description: Using the Alexa Skills Kit and the Amazon Echo, we are able to control the Roku with nothing but a vocal command.
author: julian
categories: news
---

Amazon Echo is the Siri for your home. Named "Alexa", she sits in your living room and listens for her name followed by a command. As a new device, her default functionality is limited to managing todo and shopping lists, playing music on Pandora or TuneIn radio, and controlling a few of the Phillips Hue and Belkin WeMo smart lights and devices.

The power and value of the Amazon Echo is not, however, from it's default functionality. Amazon has recently opened the Echo up for developers through the <a href="https://developer.amazon.com/appsandservices/solutions/alexa/alexa-skills-kit">Alexa Skills Kit</a>. Using this, anyone can add their own functionality to Alexa, allowing you to control anything with your voice alone.

<div style="text-align: center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/fcn1gUd7Tbw" frameborder="0" allowfullscreen></iframe>
</div>

<!--more-->

Overview
--------

Before you go any further, the source code for all three modules mentioned below is available on Github: <a href="https://github.com/julianh2o/RokuAlexaLambdaSkill">https://github.com/julianh2o/RokuAlexaLambdaSkill</a>

In order to do this, we need to combine a few tools. Working backwards from our goal, we need to send commands to the Roku. For that we'll use the <a href="http://sdkdocs.roku.com/display/sdkdoc/External+Control+Guide">Roku External Control Protocol.</a>

Instead of controlling the Roku directly from Alexa or even AWS Lambda, I've decided to run a local <a href="https://nodejs.org/">Node JS</a> server that will respond to high level external network requests and handle interacting with the Roku on a button-by-button basis. The reason for this is that while Alexa connects to your local network, it doesn't seem to currently have any way of interacting with the local network. Instead, commands are processed by the Amazon cloud, passed to an AWS Lambda script which can then perform the required actions.

Next up the chain is the <a href="http://aws.amazon.com/lambda/">AWS Lambda</a> service. Most of your debugging will involve repeatedly uploading code bundles to the <a href="https://console.aws.amazon.com/lambda">AWS Lambda Dashboad</a>While perhaps a little unnecessary, this service is groomed to work well with the Amazon Echo. In the Alexa Skills Kit (ASK) dashboard, you can simply paste the ARN of your AWS Lambda function into the endpoint field for a skill and for the most part, things will just work. The alternative would be running your own service, acquiring an SSL key and pasting the key into the ASK dashboard.

The final link is the <a href="https://developer.amazon.com/edw/home.html">Alexa Skills Dashboard</a>. This allows you to configure the way that the Amazon Echo interprets commands you give it. The primary configuration here is a keyword that triggers your skill, a intent schema that describes the available actions and their required parameters, and a list of "Sample Utterances" or example phrases that help train Alexa to properly interpret vocal queries.

Controlling the Roku with Node JS
---------------------------------

Using the <a href="http://sdkdocs.roku.com/display/sdkdoc/External+Control+Guide">Roku External Control Protocol</a> as a reference, we can relatively easily write us some code that will activate the Netflix channel (channel ID 12) and make the desired menu selections. The first step is to discover the Roku via SSDP. Fortunately, this is made easily using the module "node-ssdp". 

        var Client = require('node-ssdp').Client;
        var ssdp = new Client();

        //null will cause the server to discover the Roku on startup, hard coding a value will allow for faster startups
        var rokuAddress = null;

        //handle the ssdp response when the roku is found
        ssdp.on('response', function (headers, statusCode, rinfo) {
            rokuAddress = headers.LOCATION;
            console.log("Found Roku: ",rokuAddress);
        });

        //this is called periodically and will only look for the roku if we don't already have an address
        function searchForRoku() {
            if (rokuAddress == null) {
                ssdp.search('roku:ecp');
            }
        }

        //start the MSEARCH background task to try every second (run it immediately too)
        setInterval(searchForRoku,1000);
        searchForRoku();

I've set up a 1s polling function that repeatedly searches for the Roku if there isn't one configured. This could be enhanced later to handle losing connection of the Roku after the server has started, but for now it simply handles the fact that the the Roku, for whatever reason, doesn't seem to respond consistently to the first SSDP search.

Once we have the endpoint url of the Roku, it's fairly straight forward to send commands to it. All of the commands that we'll be using involve simply posting to a URL. Here is a list of URIs that we'll be using.

        /keypress/home   //returns to the home screen
        /launch/12       //launches the netflix channel
        /keypress/up     //simulates the respective arrow on the remote to move the cursor around
        /keypress/down 
        /keypress/left
        /keypress/right
        /keypress/Select //Chooses the currently selected menu option, used for selecting a show
        /keypress/Play   //The play/pause button will start or stop the active show
        /keypress/Lit_* (where * is a letter) //types into the currently active text field

Through a bit of trial and error, it was fairly easy to come up with a sequence of keypresses to get to various parts of the Netflix channel. In order to make sure that the Netflix channel is in a predictable state, we always return to the home screen before trying to perform any action. This is unfortunately a little timeconsuming, but without a way of retrieving state information from the Roku, we don't really have any better options.

Here is the snippet that performs the "search and play" action. First we navigate to the search window, then we generate the sequence of keyboard presses for our desired show, and then we perform the search, select the resulting show, and play. You can find the implementation for these helper methods in the full code listing.

			var sequence = [].concat([
				rokuAddress+"keypress/home",    //wake roku
				rokuAddress+"keypress/home",    //reset to home screen
				3000,
				rokuAddress+"launch/12",        //launch netflix app
				7000,
				rokuAddress+"keypress/down",    //navigate to search
				1000,
				rokuAddress+"keypress/Select",  //select search
				2000,
			],createTypeSequence(text),[        //enter the text
				1000,
				rokuAddress+"keypress/right",   //go to search selections (right of the keyboard)
				100,
				rokuAddress+"keypress/right",
				100,
				rokuAddress+"keypress/right",
				100,
				rokuAddress+"keypress/right",
				100,
				rokuAddress+"keypress/right",
				100,
				rokuAddress+"keypress/right",
				500,
				rokuAddress+"keypress/Select", //selected the top result and returns to the main screen
				3000,                          //wait for main menu
				rokuAddress+"keypress/right",  //goto searched item
				rokuAddress+"keypress/Select", //drill into show
				3000,
				rokuAddress+"keypress/Play",   //play when loaded
			]); 
            postSequence(sequence);

<img class="showcase" src="/resources/images/blog/rokuScreens.png" />

Making your server accessible to Alexa
--------------------------------------
Before working with Alexa (if you are following along with these instructions), you'll need to make sure that your Node JS server is accessible from outside of your home network. Now, before doing this, be aware that this can pose a security risk if done irresponsibly. I would recommend taking a few extra precautions that I do not show in my code for securing your server such as using SSL or an access token of some sort. Under most home topologies, you should be able to access your router and add a rule for forwarding a port to a static IP address (where your Node JS server runs). Choose an arbitrary and non-standard port to maximize your security through obscurity. (Note: Obscurity is NOT security, while this may help, you should not consider it by any means sufficient.)


Programming and testing the Alexa Skill
---------------------------------------
If you've never programmed an Alexa Skill before, you'll want to make sure that you have the appropriate accounts for accessing both the <a href="https://console.aws.amazon.com/lambda">AWS Lambda Dashboad</a> and the <a href="https://developer.amazon.com/edw/home.html">Alexa Skills Dashboard</a>. If both of these links bring up the appropriate dashboard, you're ready to go.

1. In each interface, create a new entity. (Lambda function and Alexa Skill respectively).
2. In the AWS Lambda dashboard, skip the blueprint step and name your function. Ignore the code upload for now by filling it with some junk, you'll need to edit the app ID first. Lastly, use the Basic Execution role before clicking next.
3. Once the Lambda Function is created, you'll need to add Alexa as an event source through the event sources tab.
4. In the first screen of the Alexa Skill creation wizard, you'll select the Lambda ARN as the endpoint. Use the Lambda ARN in the top right corner of the Lamda function interface.
<img class="showcase" src="/resources/images/blog/createSkill.png" />
5. Hit next and paste the Intent Schema and Sample Utterances from <a href="https://github.com/julianh2o/RokuAlexaLambdaSkill/blob/master/RokuSkill/IntentSchema.json">IntentSchema.json</a> and <a href="https://github.com/julianh2o/RokuAlexaLambdaSkill/blob/master/RokuSkill/SampleUtterances.txt">SampleUtterances.txt</a> respectively. (You may want to edit the Sample Utterances in the future to ensure that Alexa understands your favorite Netflix choices)
6. Test your configuration in the AWS Lambda dashboard by using one of the examples in <a href="https://github.com/julianh2o/RokuAlexaLambdaSkill/blob/master/RokuLambda/sample.json">sample.json</a>. If your Roku server is running, your port forwarding is set up correctly, and your host name is configured correctly, you will be able to see the Roku instructions logged to the console.
7. Once you get your service working from AWS Lambda, test using Alexa using one of these commands:
"Alexa, tell Roku to play the next episode"
"Alexa, tell Roku to search and play Futurama"
"Alexa, tell roku to play"
"Alexa, tell roku to pause"
"Alexa, tell roku to type cosmos"


Anatomy of the Alexa Skill and AWS Lambda Function
--------------------------------------------------
Almost surprisingly, the Alexa Skill and AWS Lambda configurations are both almost entirely boilerplate. In all honesty, both of these are just slight modifications of one of the sample skills that Amazon released. On the Alexa Skill Kit side, the Intent Schema simply lists the names of the intents (or actions) that this skill is capable of. In addition, we provide information about the variables that need to be collected. In this case, we use a simple literal field to represent the show name for the Type and SearchPlay intents.

The Sample Utterances file is a training file to help Alexa understand commands a bit better. Each line is implicitly prefixed by the invocation phrase (in this case "Alexa, tell Roku to.."). The first token is the Intent name and should correspond to the Intent Schema above. Variables are encoded with an example variable and the name of the variable separated by a pipe and enclosed by curly braces: {example|Text}

You can add as much training data here as you like to give Alexa a better understanding of the phrases that "she" should respond to.

The AWS Lambda Function is almost as simple, I'm using the AlexaSkill.js file that is consistently used in a number of Amazon's examples. It provides a basic interface with Alexa that is more than sufficient for our needs.

In the index.js file, we're simply importing this functionality, wrapping our simple method of posting commands to the server, and invoking them in response to different intents. The most important part of this code is how we extract the intent slots and instruct Alexa with how to respond.

        SearchPlay: function (intent, session, response) {
            sendCommand("/roku/searchplay",intent.slots.Text.value,function() {
                response.tellWithCard("Playing: "+intent.slots.Text.value,"Roku","Playing: "+intent.slots.Text.value);
            });
        },


Going Further
-------------
As mentioned earlier, the biggest thing that is omitted from this code is some semblance of security. Before deploying this, I'd strongly recommend at least requiring a unique token with each request. It certainly wont be bulletproof, but it will keep the average hacker from being able to play Netflix movies on your TV while you're away.

Next up on deck may be to add some more functionality. This proof of concept only has 4 different actions that it can perform. In many cases, this is enough, but you may find that there are other things you do on your Roku that are not covered. Support for other channels could be added, or even just support for navigating through episodes and seasons.

If you do think of any other cool modifications or improvements, feel free to fork the <a href="https://github.com/julianh2o/RokuAlexaLambdaSkill">project on Github</a> and make pull requests. I'll try to take a look at all requests that come in!


<hr/>

If you liked this, check out the post on <a href="http://reflowster.com/blog/2015/05/11/esp8266.html">The internet of things and the ESP8266</a> a powerful little Wi-fi module that lets you connect your electronics projects to the internet for control via smart phone or Alexa!
