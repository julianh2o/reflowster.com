---
layout: post
title: "Powering your Electronics Project Part II"
description: Rechargeable LiPo batteries, and integrated AC power supplies are more complicated ways of powering your project
author: julian
categories: blog
---

In part one, we covered some basic ways to quickly and easily power your electronics project. In this section, we'll cover some more advanced methods for powering a project that may not be practical to breadboard out. Instead, you'll probably incorporate these when designing a PCB or moving toward finalizing a project.

Take care when implementing these methods and be sure to double check your wiring before connecting power as some of them can fail somewhat spectacularly. In particular, when testing your own AC power supply, I'd advise taking precautions such as an isolated power supply or at least a easy way to quickly cut power from a safe distance. (For example, using an outlet that is controlled by a switch can make testing an AC power supply much safer and significantly easier.)

<!--more-->

Lithium Polymer Rechargeable Batteries
--------------------------------------
**Pros** Large capacity battery that can sustain high load, easy to charge via USB
<br/>
**Cons** Most applications will need not only a battery management IC, but also a voltage booster!

Lithium polymer (LiPo) batteries have been an increasingly popular choice in a variety of different applications including mobile phones and radio controlled models. The main benefit of LiPo batteries is that they are small and hold a lot of charge. Furthermore, they're able to deliver that charge very quickly when compared to other batteries.

<img class="showcase" src="https://cdn.sparkfun.com/assets/learn_tutorials/1/7/0/lipo-battery.png" alt="A typical LiPo battery with an attached connector" />

One notable downside to LiPo batteries is that they require a non-trivial charging curve which means you can't just plug them in and throw power at them and expect them to behave well.

<img class="showcase" src="/resources/images/blog/power_lipo_charge_profile.png" alt="The charging profile of a LiPo battery starts off by providing a constant current and then drops off as the battery reaches full charge" />

Here is a typical charging profile taken from the application note in the MCP73831/2 datasheet. As the battery reaches fully charged, the charging current provided by the chip ramps off to keep the battery from overheating.

To use a LiPo battery, you'll need to use a separate battery charger (as with most RC cars) or integrate your own battery management and charging circuitry. For most projects, I'd suggest simply adding the battery management directly to your PCB. You can use the MCP73832 or a similar controller along with the recommended application circuitry between your battery and the rest of your circuit.

<img class="showcase" src="/resources/images/blog/power_mcp_typical_application.png" alt="The typical application diagram from the MCP73831/2 datasheet" />

My recent battery powered projects are using this circuitry with the added bonus of charging directly from the micro USB port which also functions for programming. A simple diode in the USB's power line protects your computer or USB power supply from any feedback from other power supplies you might be working with.

<a href="/resources/images/blog/power_lipo_schematic.png"><img class="showcase" src="/resources/images/blog/power_lipo_schematic.png" alt="An example schematic including an Atmeta32u4, a USB connection, and a LiPo battery connection." /></a>

The above schematic shows a typical use of the Atmega32u4 and an MCP73832. While many projects will run just fine at 3.3V (the typical output voltage of a LiPo battery) the addition of a Voltage Booster will allow you to get better speeds out of your microcontroller and to drive 5V components. In this example, I've wired it so that the battery management IC is always running directly off the battery so that you can charge your battery via USB without turning it on. Turning the switch on enables the voltage booster that powers the microcontroller and the rest of your components. The status pin on the battery management IC is currently wired directly to the UC which means you can read the charge status and react to it programmatically. You could also wire this directly to a diode to give you a visible indicator. The value of the "prog" resistor should be chosen based on the battery size and can be calculated from the chart in the datasheet. This will determine how fast the battery charges. Beware, charging a LiPo battery too quickly can be dangerous.

For an alternative voltage booster that comes in a more easily solderable package, you can try the LTC3525-5.

<span class="note">For a simpler projects or prototyping, you may want to find a pre-assembled LiPo battery management circuit.</span>

Linear AC power supply
----------------------
**Pros** Simple and self contained and easy to implement, understand, and debug
<br/>
**Cons** Bulky transformer makes for a heavy addition to your project that can only support a single input voltage

We covered the easiest way of getting DC power from an AC outlet: using a pre-made AC adaptor, but there are other options that avoid a bulky plug against the wall or taking up all the space on your power strips. The first of which is to incorporate a linear power supply directly into your project. A linear power supply uses a large voltage transformer to drop the 120VAC (or whatever your region happens to use) down to the 5v (or 3v) that you'll most likely want for your microcontroller projects. To do this, a linear power supply first scales the voltage down to a more reasonable level and then irons out the AC sine wave using a configuration of four diodes known as a bridge rectifier.

<img class="showcase" src="/resources/images/blog/power_rectifier.png" alt="This diagram shows how a bridge rectifier changes AC to DC" />

The above diagram shows the input AC current, an intermediary step, and the output of the bridge rectifier. Notice how the output of the bridge rectifier, while no longer alternating between positive and negative voltages, is not a clean power supply. To smooth this supply out, we run this messy waveform through a large capacitor and a voltage regulator to produce a clean and consistent 5v.

<img class="showcase" src="/resources/images/blog/power_linearps.png" alt="This is a circuit diagram for a typical linear power supply." />

This schematic shows a typical circuit diagram for a linear power supply. The bridge rectifier is shown expanded, but you can get these as a self-contained IC. You'll choose your transformer based on your input and output voltages (in the US, probably 120V in and 5V out). Something like a 100uf aluminum capacitor will probably be sufficient to take the majority of the noise out of the power supply and the voltage regulator and decoupling capacitor will smooth out the rest.

Implementing a linear AC power supply is pretty much as simple as following this diagram. Because of the relative simplicity of the transformer and rectifier, you'll find this kind of power supply relatively robust. When designing your circuitboard, be sure to take reasonable precautions with your high voltage traces. In general, you'll want to keep a minimum of an 8mm gap between high voltage traces and low voltage traces or components. You'll also want to avoid using a high-voltage circuit like this one without some kind of case or shielding to keep stray fingers from coming in contact with the live traces.

Switched-Mode Power Supply (SMPS)
---------------------------------
**Pros** Can accommodate a range of voltages, small and cheap power supply without a bulky plug.
<br/>
**Cons** Requires complicated circuitry and very specific parts that may be hard to source

The switching power supply is the final installment in our power supply solutions. It solves the two largest problems with the linear power supply in exchange for a bit of added complexity. The switching power supply is smaller and can accommodate a range of voltages. This is especially important for projects that may eventually need work internationally where the wall voltage may be different than what you're used to at home.

The theory behind the switching power supply is to use a capacitor as a sort of "reservoir" that instead of getting a consistent input pattern will alternate between getting charged quickly and receiving no charge. This is controlled by a specialized integrated circuit coupled with a specialized transformer that switches the circuit on and off to keep the output power steady. When the capacitor drains below a certain point, the circuit switches on momentarily to charge the circuit. This switching mechanism is what makes this power supply able to handle a range of voltages.

The chip we ended up using in Reflowster was the LNK564P. We coupled it with the recommended CWS-T1-DAK85 transformer.

<img class="showcase" src="/resources/images/blog/power_switching.png" alt="This is a circuit diagram from the datasheet of the power integrations chip that shows a possible application of the transformer and chip." />

Above is the application schematic featured for the transformer/chip combination. As you can see, the complexity for this sort of power supply is significantly higher than for previous examples. Not only is the switching controller required, but a number of auxiliary components including an inductor, a handful of diodes. A few resistors  manage the output voltage of the power supply and some additional optional components can improve the safety and efficiency of the circuit.

Before implementing this circuit, read over <a href="http://www.power.com/sites/default/files/PDFFiles/epr85.pdf">the datasheet and application note</a> carefully. There is a lot of additional information about the circuit there including specific part numbers, recommendations, and even an example PCB layout. When working with high-voltage circuits, don't skimp on your trace width. If you've been dealing with digital logic, you're probably used to using close to the minimum trace size supported by your PCB printing service. You'll have to break this habit for high-voltage circuitry where a thin trace will heat up considerably.

For all of these advanced circuits, take the time to research them on your own before trying to apply them to your own project. This article is meant only as a list of suggestions to be aware of while planning out a project.
