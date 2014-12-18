---
layout: post
title:  "Powering your Electronics Project Part I"
categories: disabled
---

Powering a hobby project can be somewhat of a project in itself. Most digital circuits require a power supply capable of providing 3 to 6 volts DC. Your projects may have requirements beyond the voltage and power such as portability, or very low power consumption. As a hobbyist, it is extremely helpful to have a variety of power supplies in your repetoire so that when your next project has a unique need, you have a unique solution to suit it.

<!--more-->

The following methods of powering your project are by no means exhaustive and can, in some cases, be cleverly combined to even further suit your project. I've ordered these roughly from the most simple and easy to implement to the slightly more complicated. In part I, I'll cover some basic and common methods that will get your project up and running quickly. In part II, I'll cover some more advanced techniques that may offer a particular type of utility that fits well with some of your projects.

I'll be covering an overview of different methods and will avoid going into specifics of each method in favor of discussing their pros and cons and how they might fit into your project. If you're very new to electronics and you're looking for a more detailed and introductory article, check out Sparkfun's article <a href="https://learn.sparkfun.com/tutorials/how-to-power-a-project">How to Power a Project</a>.

Standard Replaceable Batteries
------------------------------

By far the easiest method of powering a microcontroller is by using some combination of batteries that give you exactly the voltage you need. If you need a 3v power supply, 1.5v AA or AAA batteries in a readily available battery holder will do the trick. Using AA and AAA batteries you can easily get 1.5v, 3v, 4.5v, and 6v. Most 5v microcontrollers will happily run at 3v, 4.5v, and 6v without too much trouble. However, before plugging your batteries in, be sure to double check each component to make sure that it'll safely run at the voltage you plan on powering it at. For example, the Atmega32u4 lists an operating voltage of 2.7 to 5.5 volts. It further specifies that the maximum operating frequency at 2.7v is 8Mhz and that to bump the speed up to 16 Mhz, the chip requires at least 4.5v. For this chip, your optimal power supply is probably 5v, and you wouldn't be able to run it at 16 Mhz for long with 3 AA batteries.

<img class="showcase" src="/resources/images/blog/batteries.jpg" />

Most ICs will provide a minimum, maximum, and optimal operating voltage. While you should at the very least adhere to the minimum and maximum voltages listed, for microcontrollers and other components that may be more sensitive, you should double check the datasheet for notes about operating the IC near the limits of it's range. For example, some microcontrollers may not run above a certain clock speed if they are being operated at a lower voltage.

<span class="note">Note: Bonus points for using rechargable AA or AAA batteries that are both readily available and extremely useful not just for hobby projects, but for your collection of power hungry devices around the house.</span>

Non-standard Replaceable Batteries
----------------------------------

A quick search for batteries on Ebay may surprise you. As it turns out, there are a myriad of different batteries available in all sorts of different shapes and sizes. You may be able to find a battery that eerily fits your requirements better than you expected. The specs to look out for are the voltage, the maximum current, and the size of the battery (often measured in mAh). Unfortunately, the quitessential 5 volts is a bit harder to find and if you are having trouble finding a precise voltage, you may want to add a voltage regulator that is capable of dropping the voltage off of a 6v battery down to 5v.

<img class="showcase" src="/resources/images/blog/nimh1.jpg" />

If your project has components that are likely to draw a lot of power (such as motors, LED strips, relays, and speakers) you'll want to make sure that your circuit is never going to be drawing more current than your battery can provide. For that matter, for any power supply you end up settling on, make sure you are keeping track of how much power your circuit is likely to draw relative to how much your power supply can provide.

Once you've figured out how current your circuit is going to be drawing, take the time to do a quick computation to figure out how long a batter of a given size will last or to figure out how large a battery you need to run your circuit for X number of hours. For example, a typical 2000mAh AA battery can run a 400mA stepper motor constantly for 5 hours.

Wall power using an adaptor
---------------------------
You have a few options when powering your circuit from a wall. The most satisfying of which (in my humble opinion) is to dig up the charging cable to one of your old phones and read the fine print on the back. Many of these charging cables have an output voltage that you can use.

<img class="showcase" src="/resources/images/blog/psulabel.jpg" />

Once you've found a suitable charging cable or AC adaptor, simply clip the end off of it and strip the wires to get pre-regulated DC voltage. You may want to solder on some kind of header or wiring to make connecting a breadboard easier.

One final option which is perhaps slightly more elegant than the previous two is to find a power supply that terminates in a standard barrel jack. You may have these lying around at home or you may need to purchase one. Either way, once you have one (or perhaps a set) all that you need to do is to get a batch of receptacles that fit your chosen standard. You can find these that are compatible with breadboards, solderable to PCBs, or terminated in wires. Here's one from Sparkfun that'll fit into a breadboard or a PCB: <a href="https://www.sparkfun.com/products/10811">DC Barrel Jack Adapter - Breadboard Compatible</a>

<img class="showcase" src="/resources/images/blog/barrel.jpg" />

If you're not up for hacking apart an old cable, or can't seem to find any of them, you can buy a breadboard friendly power supply from a hobby supplier such as SparkFun. <a href="https://www.sparkfun.com/products/114">SparkFun Breadboard Power Supply 5V/3.3V</a>

USB power
---------
More recently, I've been powering many of my projects with USB. In particular because the Atmega32u4 has an onboard FTDI module that allows you to load programs onto the chip directly through USB using the Arduino IDE. Because you're already using the USB for data, you might as well hijack it for power as well. While programming your project, you'll be getting power from your computer. When you're not programming, you can switch to using a standard micro USB charging cable that plugs into a wall. While powering your projects this way, you can use either a micro USB or a mini USB, though, in general, I'd recommend sticking with micro USB as it is the newer standard and has a few minor improvements over mini.

<img class="showcase" src="/resources/images/blog/miniusb.jpg" />

<span class="note">Note: Almost all of these methods can be slightly improved by using a voltage regulator to further stabilize your power supply. You'll want to pick your voltage regulator based on the input and output voltages, your current requirements, and the quality of your input power.</span>

In part 2, I'll cover some more advanced techniques starting with rechargable LiPo batteries and then moving into getting power from AC including a standard linear AC to DC power supply as well as a switching power supply.

