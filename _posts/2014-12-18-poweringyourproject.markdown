---
layout: post
title: "Powering your Electronics Project Part I"
description: Powering a hobby project can be a project in itself, these power supply methods will help you get your project off the ground quickly.
author: julian
categories: disabled
---

Powering a hobby project can be somewhat of a project in itself. Most digital circuits require a power supply capable of providing 3 to 6 volts DC. Your projects may have requirements beyond the voltage and power such as portability, or very low power consumption. As a hobbyist, it is extremely helpful to have a variety of power supplies in your repetoire so that when your next project has a unique need, you have a unique solution to suit it.

<!--more-->

The following methods of powering your project are by no means exhaustive and in all likelyhood, you'll want to mix and match to suit your specific needs. I've ordered these in roughly acending order with respect to how difficult or complicated they are to implement and use. In part I, I'll cover some basic and common methods that will get your project up and running quickly. In part II, I'll cover some more advanced techniques that may offer a particular type of utility that fits well with some of your projects.

I'll be covering an overview of different methods and will avoid going into specifics of each method in favor of discussing their pros and cons and how they might fit into your project. If you're very new to electronics and you're looking for a more detailed and introductory article, check out Sparkfun's article <a href="https://learn.sparkfun.com/tutorials/how-to-power-a-project">How to Power a Project</a>.

Standard Batteries
------------------------------
**Pros** cheap, available, simple, portable
<br/>
**Cons** voltage varies with charge and between types of cells, batteries run out of charge eventually!

In some ways, standard batteries are the simplest method of powering a microcontroller. By putting a couple cells in series you can easily get 1.5v, 3v, 4.5v, and 6v. Most modern microcontrollers aren't too picky and will run anywhere from 3v to 6v. For example, the Atmega32u4 lists an operating voltage of 2.7 to 5.5 volts. It further specifies that the maximum operating frequency at 2.7v is 8Mhz and that to bump the speed up to 16 Mhz, the chip requires at least 4.5v. For this chip, your optimal power supply is probably 5v. It’ll run with 3 cells, but you probably shouldn't depend on 16Mhz operation using only 3 cells.

An easy way to improve the quality of your battery power (at a hit to efficiency), is to install more cells than you need, and then use a voltage regulator to reduce the voltage. For example, you could use 6 cells for a total of about 8v, and then use a regulator to bring it down to a clean, stable 5v. I’ll explain this more in part 2.

No matter what sort of power supply you're using, it always behooves you to double check the voltages that your components are designed for as well as the output of your power supply.

<img class="showcase" src="/resources/images/blog/batteries.jpg" />

<span class="note">Bonus points for using rechargable AA or AAA batteries, they are both readily available and extremely useful for both your hobby projects and your collection of power hungry devices around the house, but remember than many of these will measure in at slightly shy of their expected voltage. For AA and AAAs, expect around 1.2v maximum.</span>

The benefit of using these replaceable batteries is that they're easy. For many projects, you can just drop a set of batteries in and run your project off of them directly without having to worry about charging or voltage regulation. Modern microcontrollers are flexible enough in their power requirements that unless you have a project that is particularly sensitive in timing or voltage requirements that running them directly off a battery will be fine for the most part.

While most projects in their infancy will do fine plugging directly into a battery, once your project is ready to be deployed more permanently, you'll almost certainly want to flesh out the power supply with a few components. In order to get a consistent power supply, you'll almost certainly want to include a voltage regulator at some point for projects using a battery. When choosing your regulator, you'll want to take into consideration that a battery will have a lower output voltage as it becomes discharged. (a fact that you can exploit to provide a battery life status if your application calls for it) Choose a voltage regulator that accepts the range of voltages you expect from your batteries and outputs a consistent voltage.

Wall power using an adaptor
---------------------------
**Pros** easy, safe, reliable, variety of options
<br/>
**Cons** requires wall outlet and an often-bulky adaptor

You have a few options when powering your circuit from a wall. The safest and most satisfying of which (in my humble opinion) is to dig up the charging cable to one of your old phones and read the fine print on the back. Many of these charging cables have an output voltage that you can use.

<img class="showcase" src="/resources/images/blog/psulabel.jpg" />

You'll notice in this label that the power supply provides an output of 12v DC. For most projects, this will be too high. In order to use this power supply, you'd have to use a voltage regulator such as this <a href="https://www.sparkfun.com/products/107">Voltage Regulator - 5V</a> from Sparkfun to bridge the gap. In all honesty, I'd probably not even bother. I'd prefer looking for a DC power supply that provided exactly the voltage I needed, however, if I were trying to use a 5v microcontroller to drive a 12v device, I may use this in conjunction with some MOSFETs.

Once you've found a suitable charging cable or AC adaptor, simply clip the end off of it and strip the wires to get a nice regulated DC power supply. You may want to solder on some kind of header or wiring to make connecting a breadboard easier.

A slightly more elegant option is to find a power supply that terminates in a standard barrel jack. You may have these lying around at home or you may need to purchase one. Either way, once you have one (or perhaps a set) all that you need to do is to get a batch of receptacles that fit your chosen standard. You can find these that are compatible with breadboards, solderable to PCBs, or terminated in wires. Here's one from Sparkfun that'll fit into a breadboard or a PCB: <a href="https://www.sparkfun.com/products/10811">DC Barrel Jack Adapter - Breadboard Compatible</a>

<img class="showcase" src="/resources/images/blog/barrel.jpg" />

If you're not up for hacking apart an old cable, or can't seem to find any of them, you can buy a breadboard friendly power supply from a hobby supplier such as SparkFun. <a href="https://www.sparkfun.com/products/114">SparkFun Breadboard Power Supply 5V/3.3V</a>

The main downside of this method is that you require an often-bulky wallwart to power your projects. I'm sure I don't need to explain the frustration often associated with trying to plug too many wallwarts into a power strip at the same time. If this is a concern you're interested in resolving, stay tuned for part II where I'll cover some additional ways of powering your device off of the wall.

USB power
---------
**Pros** super standard, clean 5v power every time, most people already own a USB cable
<br/>
**Cons** only 500mA available from many USB ports, crossing the wrong wires could damage your PC

More recently, I've been powering almost all of my projects with USB. In particular because the Atmega32u4 has an onboard FTDI module, you can program directly through USB. Because you're already using the USB for data, you might as well hijack it for power as well. While programming your project, you'll be getting power from your computer. When you're not programming, you can switch to using a standard micro USB charging cable that plugs into a wall. While powering your projects this way, you can use either a micro USB or a mini USB, though, in general, I'd recommend sticking with micro USB as it is the newer standard and has a few minor improvements over mini.

<img class="showcase" src="/resources/images/blog/miniusb.jpg" />

If you like, a diode in series with the VCC line of the USB will allow you to power your device through USB, or another power source, or even with both connected.

<span class="note">Almost all of these methods can be slightly improved by using a voltage regulator to further stabilize your power supply. You'll want to pick your voltage regulator based on the input and output voltages, your current requirements, and the quality of your input power.</span>

In part 2, I'll cover some more advanced techniques starting with rechargable LiPo batteries and then moving into getting power from AC including a standard linear AC to DC power supply as well as a switching power supply.

