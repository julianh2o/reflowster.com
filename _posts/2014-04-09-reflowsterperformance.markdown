---
layout: post
title:  "Reflowster Performance"
categories: news
---


We've had some questions about what kind of performance you can expect from your Reflowster. There's a lot of experimentation left to do, but take at look at this plot that we collected yesterday.
<img alt="This chart shows the temperature inside the oven through a reflow soldering run" class="showcase" src="/resources/images/updates/update_04_09_2014_1.jpg">

<!--more-->

This temperature profile was collected with a thermocouple attached to the subject PCB using a paperclip. We've also tried a similar profile using a thermocouple hanging in free space. We're not sure which setup is going to produce better overall results, but we expect that it might depend somewhat on your exact application etc. We're going to ship Reflowster with two pre-programmed profiles and space for multiple custom profiles, so you'll be able to tinker with the settings even without touching the firmware.

Another question we've has is about how well Reflowster can hold a specific temperature. This question is somewhat complicated depending on what exactly you're trying to control, what your target temperature is, how long you want to hold it, etc, but we'll try to answer it anyway.

The plot below is an example of the Reflowster's ability to hold a steady temperature. In this test the toaster oven was rapidly heated and then controlled to a steady 102 C by pulsing the oven on for a few seconds every 30s. You can see that the air temperature in the oven stays pretty constant, and varies by about 1 C above and below the target. At this point, the type K thermocouple itself becomes the largest source of error. If you were trying to control something with more mass, it might fluctuate even less. If you were willing to let it take longer to heat up, you could also eliminate the overshoot.
<img alt="This chart shows the temperature inside the oven as Reflowster attempts to hold the temperature constant" class="showcase" src="/resources/images/updates/update_04_09_2014_2.jpg">

Now, a note of caution for those of you planning to use Reflowster in a "temperature hold" mode. The mechanical relay we chose to design into the Reflowster has a life of somewhere between 100,000 and 1,000,000 cycles. If you use it for reflow soldering only, it should last for well over 20,000 reflow operations. On the other hand, short cycles add up fast if you're running this thing 24/7 for some custom application. If you want temperature regulation like in the above graph, the relay might only last 1000 hours or so. Of course, this depends entirely on how frequently you turn it on and off. We're looking into ways to extend the life of our relay so it'll be more versatile, but for now please keep the 100,000 cycle estimate in mind.

