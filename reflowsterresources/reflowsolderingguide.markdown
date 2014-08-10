---
layout: default
title: Reflow Soldering Guide
author: Julian Hartline
navigation:
    exclude: true
---

Reflow Soldering Guide
======================

Introduction
------------
Many hobbyists avoid reflow soldering like the plague. Some have never heard about it, others have written it off as too difficult, too much hassle, or unnecessary for their small projects. After diving head first into reflow soldering and surface mount parts, however, we assure you, it is well worth it. After a bit of practice, we actually find that populating and soldering a PCB with surface mounts and reflow soldering is actually faster than it would be for an equivalent through-hole board. In the following sections, we'll share with you the tips, tricks, and techniques that we've picked up through our experience with reflow soldering. It should be noted that we are by no means experts, we are humble hobbyists like yourself and while we have found these things to work for us, they should not be considered to be the "one true way" and that you will very be best served by refining your technique on your own based on your observations.

Selecting components
--------------------

We've used DigiKey as our primary vendor for our surface mount parts, but there are a number of companies with a large selection of surface mount components. We tend to keep returning to DigiKey (www.digikey.com) because although austere, their site offers some very powerful searching and filtering tools that are simple and reliable. Another good choice for hunting down parts, especially if you're looking to get the best price for a single part is Octopart (octopart.com) which offers aggregate results from a number of vendors.

Most parts that you are used to getting in SIP, DIP, and other through-hole packages will also come in a variety of surface mount packages. In fact, there are some parts that can only be found in surface mount packaging. When selecting parts, you'll want to double check the land pattern recommended by the part and in particular, the package's pitch, or the spacing between the pins. If you get a part with too small of a pitch, you may have a hard time soldering it depending on what methods you are using and your skill and experience with the method. The SOIC package, which is large enough to be hand-soldered, might be a good choice for a beginner.

<img class="showcase" src="reflowguide/smtparts.jpg" />

Many passive parts like resistors and capacitors for can be found in a standard 603 package that we've found to be a very good combination of being small enough to allow for very compact circuitry and large enough to be manageable without too much difficulty. If the 603 seems too small too you, try an 805.

Designing a custom printed circuit board
----------------------------------------

There are a variety of different programs available out there for helping you design your own printed circuit board. They range from the industrial behemoth Altium to the browser-based 123D Circuits by Autodesk. We recommend you choose one that suits your experience, applications, and budget.

Eagle is one of the more popular design programs and offers a free light version for non-commercial use. While powerful, Eagle has a bit of a learning curve to it. If you're looking for the fastest way to get an idea into a PCB with no experience, give 123D Circuits a try.

Fabricating a custom printed circuit board
------------------------------------------

Once you've designed your circuit board and checked it thrice, it's time to get it fabricated. Where a few years ago our options were limited to hand-etching your own circuit board, these days you can submit Gerber files to a service online and have your custom circuit board in the mail a few days or weeks later (depending on how much you want to spend).

<img class="showcase" src="reflowguide/gerbv.jpg" />

Sometimes exporting Gerber files can be a little tricky, so we've been using a nifty program called "gerbv" (gerbv.sourceforge.net) to verify our Gerber and NC Drill files. It's lightweight and free, and it's a good sanity check to make sure all your layers are lined up.

We've been using Seeed Studio (www.seeedstudio.com) for our circuit boards and have been very pleased with the quality and price of the circuit boards. They are, however, located in China and will often take a few weeks to arrive here in the US.

Regardless of which service you use, be sure to double check the manufacturer specifications for your chosen provider. Each manufacturer will have slightly different minimum trace, silkscreen, and hole sizes. Usually getting this wrong simply means that they'll email you asking for a resubmission that fits the constraints.

Applying solder paste by hand
-----------------------------

Solder paste is a viscous suspension of solder particles in flux. It typically comes in tubes or small tubs. While most high-volume production lines will apply solder paste using a stencil, for a hobbyist, it is quite reasonable to apply the paste by hand.

When applying solder paste by hand, you'll want to try to aim for as much consistency as possible for the amount of solder paste per square millimeter of pad (or contact). While that may sound intimidating, usually this means sorta smearing a glob of solder paste across a pad or briefly dabbing a drop of paste against it. The amount of solder paste you'll want to apply will vary slightly based on the footprint of the component you are trying to solder. 603s and 805s  will not only sustain, but benefit from having slightly more solder paste on each contact where a dense package like a QFN will solder best when a very thin smear of solder paste is used.

<img class="showcase" src="reflowguide/pcbpaste.png" />

With experience, you'll get a better feeling for the optimal amount of solder paste for different components, but our general advice is to err on the side of too little solder paste than too much solder paste.

Applying solder paste using a stencil
-------------------------------------

For larger quantities or more delicate footprints, applying solder paste with a stencil is often desirable. Seeedstudio offers a stencil fabrication service for $70 per laser cut stainless steel stencil. The advantage to this is you get a robust stencil that can be washed and reused many times. The downside, is that the price is rather steep considering that you'll need to pay this each time you make any adjustments to your footprints, paste volume, or schematic.

As an alternative, we've been using a Silhouette Cameo to cut stencils out of transparency. You can pick one of these up for under $300 and it is surprisingly versatile for cutting stickers out of vinyl, shapes out of construction paper, and these stencils out of transparencies. We certainly feel like our purchase was well worthwhile seeing as we've gone through several different versions of our PCB and have made a number of minor tweaks to the stencil to get our smaller footprints to work as well as we want them to.

Cutting your own stencils may seem like a daunting task, but using the Silhouette Cameo we've been able to get good and repeatable results without too much heartache. This setup is made possible by a fantastic script called "gerber2graphtec" that you can get from github. There is a thread on DangerousPrototypes that describes how to install and use this script. In our experience, 3M brand PP2500 transparencies work pretty well but we've have the best results using 3mil Polyester film from McMaster Carr. This film comes in a variety of thicknesses including 3, 4, and 5 mils and can you buy a huge roll for as little as $15. The 3mil film seems to cut more cleanly than the transparency. As for cutting this film, we set our Cameo for 1 pass at minimum speed and a force of about 13. In any case, the ability to cut your own stencils straight from gerber files in minutes and using less than $1 of materials is pretty great. The polyester stencils don't last as long and are difficult to clean, so we usually cut a new one each day we use it.

<img class="showcase" src="reflowguide/gerber2graphtec.png" />

Once you're happy with your stencil, it's time to put it to use. We're guilty of using a fairly primitive setup to hold the stencil over the circuit board while we apply the solder paste. We took a simple plexiglass sheet and taped a few spare PCBs of the same thickness as our target board in a configuration such that there is a space inside that perfectly fits the board we are trying to populate. Once this is all taped into place, the stencil is carefully positioned over the target board and taped into place on one side. The target board is not taped so that the stencil can be peeled back and the board, once covered in paste, can easily be removed and replaced with the next.

<img class="showcase" src="reflowguide/stencilpaste.jpg" />

When applying the paste, we've found that a putty scraper, a razor blade, or even another PCB all make suitable tools for spreading the solder paste over your stencil. You'll want to place a copious amount of solder paste just beyond the last hole on one corner of your stencil at a 45 degree angle from your PCB (or the majority of your pads). Doing this will let you scrape the solder paste over the holes in the stencil such that you are never pushing solder paste directly into the edge of a hole.

<img class="showcase" src="reflowguide/stencilpastediagram.png" />

Spread the solder paste in a single smooth motion over your stencil. You'll want to keep a shallow angle to the stencil and push hard enough on your stencil so that there is little to no residual solder left as your scraper passes.

Populating a circuit board with components
------------------------------------------

Once the solder paste is applied, populating the circuit board is actually quite easy. We recommend getting a nice pair of tweezers to help you place the components on your board if you're doing it manually.

Another thing that we've found to be very helpful is having your parts well organized and for each circuit board, putting together an "assembly guide"" that contains all of the important information that someone placing components needs to know such as resistor values, part numbers, or where to find the part you need.

Reflow soldering the populated circuit board
--------------------------------------------

Now that your board is populated, it's time to put your Reflowster to good use. First, you'll want to install the thermocouple probe into your toaster oven. Placing this correctly will affect how accurately Reflowster is able to hold the soldering profile. You'll want to try to place the thermocouple probe in such a way that the tip of the probe is as close to the temperature of the surface of the PCB as possible. We've found that simply suspending the probe in the air slightly above the PCB is quite effective even though the temperature of the PCB seems to lag a bit behind that of the air. Another alternative that may work for you is to clip the thermocouple probe directly to your PCB using either a binder clip or paper clip.

At the minimum, you'll want to choose a profile to match your solder paste. To do this, choose "set profile" from the main menu and then select the profile that matches your paste best. If you'd prefer to configure your profile manually, choose "custom" and set the parameters as desired. Most solder pastes will have a datasheet and a suggested temperature profile, but you'll also want to be aware that certain components may have notes about their temperature tolerance.


