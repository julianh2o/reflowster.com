---
layout: default
title: Hackability
description: Reflowster is entirely re-programmable and compatible with the Arduino IDE so you can perfect your reflow soldering or re-purpose Reflowster entirely.
navigation:
  order: 4
author: Julian Hartline
---

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
