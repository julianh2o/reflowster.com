---
layout: sidebar
title: Product
description: Reflowster controls the power to the oven using a relay and a thermocouple. A knob and button UI and USB programming port can be used to configure the reflow.
navigation:
  order: 3
author: Julian Hartline
---

<h1>Product</h1>

Reflowster quickly and easily turns your unmodified toaster oven into a reflow soldering station. Using a relay to control power to the oven and a thermocouple to measure the temperature inside the oven. Reflowster is ready to go in minutes and can cheaply and effectively solder any number of hobby projects. This allows you to avoid the tedium of hand-soldering a surface-mount PCB and the high cost of a commercially available reflow oven.

Reflowster's encoder and LED display allow you to navigate menus and use either a standard soldering profile or your own custom profile. Once the reflow process is started, Reflowster switches the power to the toaster oven on until a soak temperature is reached. Reflowster waits for the configured soak duration and then turns the oven back on until the peak temperature is reached.


Reflow Soldering
----------------
Advances in technology continue to shrink the size of components. Hobbyists, who have traditionally worked with through-hole parts, are finding these parts harder and harder to come by as more parts become unavailable in through-hole variants. 
<img class="showcase" src="/resources/images/smdsize.jpg" />
Soldering surface mount components with a soldering iron, while possible, can be a rather tedious task. In particular, when you’re working with densely packed pins like those of a microcontroller, hand soldering a board quickly becomes a daunting task. 

Reflow soldering is an easier way of soldering these surface mount parts. Solder paste is applied to the PCB where the component pads will make contact. The components are then placed in the solder paste. Because of the viscosity of the paste, these components stick. When placed in the oven and heated, the solder paste melts, binding the component to the pad and aligning the part with the pads.

<img class="showcase" src="/resources/images/solderprofile.png" />

The reflow process itself requires that the oven be heated to a soak temperature, allowed to soak for a minute or so, and then brought up to the peak temperature for a moment before being allowed to cool. While you can do this manually in a toaster oven, the process is prone to error. Commercial solutions are expensive and provide little over a standard toaster oven.


In the box
----------
<img src="/resources/images/inthebox.jpg" class="showcase" />

In the box you'll find:
<ul>
<li>Reflowster
<li>3 Reflowster Stickers
<li>Thermocouple probe
<li>US/Can IEC power supply cable
<li>US/Can IEC power outlet cable
</ul>


Reflowster Anatomy
--------
<img src="/resources/images/annotated_reflowster.png" class="showcase"/>

<ul>
<li>Comes with three preconfigured profiles that can be adjusted to fit your needs
<li>Doesn't require modifying your toaster, simply plug and play 
<li>Stand-alone operation, doesn't require a PC
<li>Fully Arduino-compatible, upload custom firmware using the Arduino IDE 
<li>Micro USB port allows for data collection, automated configuration, and manual control
</ul>


Hackability
-----------
Because Reflowster is fully compatible with the Arduino IDE, new code can easily be uploaded to re-purpose Reflowster to do anything you can think of. The thermocouple, relay, LED display, and encoder make Reflowster a perfect platform for a variety of alternative projects.

To take advantage of this hackability, you'll need to download the <a href="http://arduino.cc/en/main/software">Arduino IDE</a> from the Arduino website. Once the Arduino IDE is downloaded and installed, you'll need to locate the libraries folder to download the required libraries.


<b>The required libraries are as follows:</b>

<a href="https://github.com/adafruit/Adafruit_NeoPixel">Adafruit's Neopixel Library</a> - This library is used to drive the multi-color status LED on Reflowster.

<a href="https://github.com/adafruit/Adafruit-MAX31855-library">Adafruit's MAX31855 Library</a> - This library is used to read the data from the MAX31855 thermocouple driver.

<a href="http://www.pjrc.com/teensy/arduino_libraries/Encoder.zip">Encoder Library</a> - This library handles interrupt-driven encoder updates.

<a href="https://github.com/Reflowster/Reflowster">Reflowster Library</a> - This library contains interfaces to access all the functionality of Reflowster including the display, the encoder, the buzzer, and the status LEDs.

Once you've downloaded all of the required libraries into your libraries folder, you'll probably want to download the <a href="https://github.com/Reflowster/Reflowster_Reflow">core firmware for Reflowster</a>. If you prefer to start with something more lightweight, you can use the example provided with the Reflowster library. You can access this either through the "examples" folder in the library or through the Arduino IDE's menus. (once the library is installed)

In the Arduino IDE, select "Arduino Leonardo" from the Tools &gt; Board menu. Don't forget to select the correct serial port too.

We only provide the firmware for performing a reflow soldering job, but with a little imagination and some programming, a variety of projects are possible. Here are some ideas:

<ul>
<li>A temperature controlled fan
<li>A circadian light timer
<li>An outlet with an automatic shutoff
<li>An easy bake oven
<li>An incubator
<li>A sous-vide machine
<li>Curing carbon fiber
</ul>


Toaster Oven Compatibility
--------------------------
Reflowster does need to be paired with a toaster oven to work, but unlike many DIY solutions Reflowster requires NO toaster modification.  No need to cut cables or risk electrocution!  

<img class="showcase" src="/resources/images/reflowster.jpg" />

Reflowster may not work perfectly with every toaster oven, but we've found that smaller, cheaper ovens typically work great because they allow for faster changes in temperature. Most simple toaster ovens without digital controls will work. In particular, a toaster that can be stuck in the "on" position is required. This state needs to persist through a power cycle. Most toasters do this by turning the timer knob backwards.

<img class="showcase" src="/resources/images/toaster.png" />

The toaster oven that we are using is pretty much the cheapest one we could order on Amazon: [Proctor Silex 31111](http://www.amazon.com/gp/product/B004O0ANH2).

**Remember:** Using a toaster oven for reflow soldering can release poisonous fumes. It is strongly advised that you label any toaster oven you use for reflow soldering as "not for food use". We plan on shipping stickers with Reflowster to help you mark your toaster oven.


About Us
--------
<img class="showcase" src="/resources/images/us.png" />

<a href="http://www.julianhartline.com">**Julian Hartline**</a> (left) has a degree in Computer Science and has been programming for 17 years, 5 of which have been in the industry. He specializes in designing and building robust APIs and sleek and intuitive user interfaces. He's been heavily involved in the hardware and PCB design scene for the last 2 years as a hobbyist. He has been doing the bulk of the programming and has been taking charge of getting the first drafts of the PCBs ready for Tony to review. He is also responsible for keeping track of deadlines and outstanding items to keep the team on track.

**Tony Halstead** (right) has a degree in Electrical Engineering and a professional background in research and defense technologies. His expertise includes circuit level design and high voltage systems. He's been letting the smoke out of ICs at home for over 10 years, so his real world experience will be invaluable. Tony has been the key person in charge of designing functionality and providing the electrical engineering experience required to get the circuit boards finalized. He's also been the lead in debugging the completed PCBs and designing the assembly process.

We've been working together for a couple years now on a variety of small projects, but this is our first Kickstarter! Together we have had a lot of success on our projects, our strengths complementing eachother very well.
