---
layout: sidebar
title: Reflowster Manual
description: This manual covers all of the basic menus and features of Reflowster as well as how to interface with a computer to get the most out of your reflow soldering experience.
author: Julian Hartline
navigation:
    exclude: true
---

Quick Start Guide
=================
The first step after unpacking your Reflowster is to get your thermocouple situated on the inside of your toaster oven. To do this, you'll want to slip the thermocouple probe into the underside of the oven and then affix the tip using a paper clip as close to your PCB as possible.

Once the thermocouple is set, plug Reflowster into the wall and your toaster oven into Reflowster. Plug the thermocouple in as well and double check that all of the connections are solid. In particular, the power connectors into Reflowster often catch before they are completely seated. To complete the setup, set your toaster oven to the "untimed bake" option and set the temperature to maximum. This mode is often attained by turning the timer knob backwards so that it doesn't count down.

When powered, Reflowster will perform a start up routine and then settle on the text "go" displayed on the screen. This is the main menu. Before running a reflow, you'll want to double check the temperature settings of your Reflowster. Do this by scrolling the knob until "edit" is displayed, then press the knob in.

The resulting menu is the edit profile menu. See the section detailing it for more information, but scroll through the different properties with the knob and press the button in to view/edit the value. There are three settings in order: Soak Temperature, Soak Duration, and Peak Temperature. You can adjust each one according to your solder paste, but we suggest a base set of 100C, 90s, and 225C respectively if you are unsure.

Once you've configured these values, press the back button (the smaller button on the right) until you are returned to the main menu. If "go" is not displayed, rotate the knob until it is.

To start the reflow process, press the knob in when "go" is displayed. Your toaster oven should turn on and Reflowster will display the current temperature inside the oven.

When the reflow process is complete, a tone will sound and the status LED will turn blue. Open the oven door at this point to rapidly cool your PCB.

Setting up your Reflowster
==========================
While setting up Reflowster doesn’t require hacking your toaster oven like other solutions, you will need to position the thermocouple within the oven.

Many toaster ovens are not perfectly sealed on the underside of the oven. This allows us to thread the tip of the thermocouple probe into any gap you can find in the bottom of your toaster oven so that the tip of the probe ends up on the inside of the oven.

Once the probe is inside the oven, you can position the probe in a way that gives you the best results. We’ve gotten very consistent results by floating the tip of the probe in the air a few centimeters above the PCB. You may also consider clipping your thermocouple probe to the PCB to give you a temperature reading that is closer to that of the surface of the PCB. You will want to tweak your thermocouple positioning and temperature settings until you are getting a consistent soldering job.

Once the thermocouple is positioned, plug Reflowster into the wall and your toaster oven into Reflowster using the included IEC cables. Finally, set your toaster oven to continuous on mode. Often this is done by turning the timer knob backwards slightly.

Reflowster Anatomy
==================
<img alt="This annotated Reflowster shows the important ports and UI elements" class="showcase" src="reflowmanual/annotated_reflowster_basic.png" />

<a name="mainmenu"></a>
Main Menu
=========
The main menu comes up when the device is started. To get back to it from any other menus, press the back button to move up to enclosing menus until the main menu displays.

<img alt="This shows the layout and each of the options of the Reflowster menu" class="showcase" src="mmap.png" />

<img alt="The seven segment displaying 'Go'" class="display_header" src="reflowmanual/go.png" />
<b>Go</b>
This will start the reflow process using the currently selected profile. Press the knob in while this is displaying to start the process and open the toaster oven when the status indicator turns blue and a tone is generated.

<img alt="The seven segment displaying 'Edit'" class="display_header" src="reflowmanual/edit.png" />
<b>Edit Profile</b>
This submenu allows you to configure the active profile by choosing either one of the preconfigured profiles or by creating a custom profile.

<img alt="The seven segment displaying 'Open'" class="display_header" src="reflowmanual/open.png" />
<b>Open Profile</b>
This submenu allows you to configure additional options such as the units used to display temperature.

<img alt="The extended display of 'Monitor'" class="display_header" src="reflowmanual/monitor.png" />
<b>Monitor</b>
This puts Reflowster into monitor mode until the back button is pressed. Monitor mode does nothing except for display the current temperature read by the thermocouple probe.

<img alt="The extended display of 'Config'" class="display_header" src="reflowmanual/config.png" />
<b>Config</b>
This submenu contains some options to configure Reflowster

<img alt="The extended display of 'Hold Temp'" class="display_header" src="reflowmanual/holdtemp.png" />
<b>Hold Temperature (advanced mode only)</b>
This allows you to set a temperature. Once set, Reflowster will attempt to maintain this temperature inside the oven.

<a name="editprofilemenu"></a>
Edit Profile Menu
=================
This menu lets you view and modify the temperature and duration settings of the currently open profile.

<img alt="The extended display of 'st-soak temp'" class="display_header" src="reflowmanual/soaktemp.png" />
<b>Soak Temperature</b> - This is the temperature that Reflowster will initially heat up to.

<img alt="The extended display of 'sd-soak duration'" class="display_header" src="reflowmanual/soakduration.png" />
<b>Soak Duration</b> - Once the soak temperature is reached, Reflowster will turn off the
power to the toaster oven and let the PCB soak for the configured duration.

<img alt="The extended display of 'pt-peak temp'" class="display_header" src="reflowmanual/peaktemp.png" />
<b>Peak Temperature</b> - After the soak duration, Reflowster turns the toaster oven back on until the peak temperature is reached. At this point, Reflowster will turn off the oven again for the cooling phase. The door to the oven should be opened manually at this point.

The default leaded profile uses a 130C soak for 90 seconds with a peak temperature of 225C.

The default unleaded profile uses a 140C soak temperature for 90 seconds with a 235C peak temperature.

We highly recommend that you tinker with these values yourself in order to get the best soldering results. While we haven't changed the temperature or duration of the soak very much in our projects, we have found that watching the solder paste as it reaches the peak temperature and flashes silver helps adjust the peak temperature. Adjust the peak temperature such that the oven shuts off a few seconds after the solder paste has flashed silver AND the components have stopped moving into place.

<b>Updating a profile property</b>
First, select the property you’d like to edit by twisting the knob until the desired property is displayed. Push the knob in to confirm your selection.

The display will show the currently selected value of this property. Use the knob to select a new value and then push the knob in again to confirm the new value.

<span class=“note”>Note: When editing a temperature, it will be edited in your currently selected temperature mode. The temperature will always be stored internally in Celsius.

<a name="openprofilemenu"></a>
Open Profile Menu
=================
This menu allows you to switch your currently active profile so that you can keep multiple profiles configured for different solder pastes or projects.

There are three profiles available for configuring: "Leaded", "Unleaded", and "Custom".

<img alt="The extended display of 'pb leaded'" class="display_header" src="reflowmanual/leaded.png" />
<br/>
<img alt="The extended display of '-pb unleaded'" class="display_header" src="reflowmanual/unleaded.png" />
<br/>
<img alt="The extended display of 'custom'" class="display_header" src="reflowmanual/custom.png" />


<a name="monitormode"></a>
Monitor Mode
============
When in monitor mode, the temperature from the thermocouple is displayed on the screen. Depending on your selected temperature mode, the temperature is displayed in either Fahrenheit or Celsius.

Pressing any button will return you to the main menu.

<a name="configurationmenu"></a>
Configuration Menu
==================
The configuration menu contains various options for configuring Reflowster.

<img alt="The extended display of 'temp mode'" class="display_header" src="reflowmanual/tempmode.png" />
<b>Temperature mode</b> - Fahrenheit or Celsius temperature can be configured here. Regardless of what you select, temperatures will be stored internally as Celsius. This setting affects monitor mode, temperature hold mode, editing profiles, and the reflow process itself.

<img alt="The extended display of 'adv features'" class="display_header" src="reflowmanual/advfeatures.png" />
<b>Advanced Features</b> - Advanced mode can be enabled here to reveal additional functionality in Reflowster.

<img alt="The extended display of 'factory reset'" class="display_header" src="reflowmanual/factoryreset.png" />
<b>Factory reset</b> - Choosing this option will reset Reflowster to its default configuration. You will be asked to confirm before the factory reset occurs.

<a name="temperatureholdmode"></a>
Temperature Hold Mode (Advanced)
================================
Selecting temperature hold mode will display a temperature on the display. Use the knob to select the desired temperature to hold. Press the knob in to use that temperature.

Once configured, Reflowster will attempt to hold the supplied temperature inside the oven by turning the oven on when the temperature is below the configured value be and turning it off when the temperature is above the configured value.

<a name="controllingviausb"></a>
Controlling Reflowster via USB
==========================================
Reflowster has a powerful serial interface that allows you to send commands and read status. This serial interface runs at 9600 baud and can be connected to via the USB port on the right side of Reflowster and a simple serial interface. To connect Reflowster to a computer, you will need a standard micro USB cable similar to the ones used by many modern smart phones. Note that this is distinct from a mini USB cable that is also widely used for connecting to Arduino boards.

In revision 5 of the firmware, Reflowster consumes characters off the serial as long as they are available. When there are no longer available characters, it interprets the command. No line termination is required. To get this behavior, it is recommended that you use the Arduino IDE's serial monitor configured with no line ending and 9600 baud.

In revision 6 and above, Reflowster fills its buffer until it gets either a CR or a LF character. It interprets the buffer as a command. You'll need to switch the Arduino IDE to send a newline character after every command. Additionally, Reflowster echos each character sent as it is received and accumulated into the buffer. This makes interacting with Reflowster easier when using a dumb terminal.

Note: This behavior may change in future versions of the firmware to be more standard. (eg.. accepting a newline as the termination)

<span class="note">Note: If you have set up the Arduino IDE for use with Reflowster, you can simply use the "Serial Monitor" feature under the tools menu.</span>

<tt>status</tt>
(all modes) - This reports some basic information about the current status of Reflowster including the current temperature readings, the configured profile, the mode, and the version number.

<tt>relay [on|off|toggle]</tt>
(menu mode) - This allows you to directly control the relay in Reflowster to turn power on and off to the receptacle.

<tt>set 0-3</tt>
(menu mode) - This opens the specified profile.

<tt>setst 0-255</tt>
(menu mode) - Set the soak temperature (in Celsius) for the currently selected profile.

<tt>setsd 0-255</tt>
(menu mode) - Set the soak time (in seconds) for the currently selected profile.

<tt>setpt 0-255</tt>
(menu mode) - Set the peak temperature (in Celsius) for the currently selected profile.

<tt>start</tt>
(menu mode) - Starts the reflow process

<tt>stop</tt>
(reflow mode) - Stops the reflow process

<img alt="A sample interaction with Reflowster" class="showcase" src="reflowmanual/usbcontrol.png" />

In addition to accepting commands, Reflowster will, when running a reflow job and when in monitor mode will report temperature data via the serial interface.

<a name="updatingfirmware"></a>
Checking and updating your Reflowster’s firmware version
========================================================
In order to update your firmware, you will need to connect your Reflowster to a computer using a micro USB cable. Not to be confused with a mini USB cable, micro USB cables come with many modern smart phones and are available online and in many consumer electronics stores.

The first step to updating your firmware is to verify the version of firmware you are running against the most recent version of the firmware available.

Reflowster displays the firmware version as it starts up. You will see the segments in the LED display light up in a spiral pattern and then the version number will be displayed momentarily before you are greeted with the “Go” from the main menu.

The most recent version of the firmware is always <a href="https://github.com/Reflowster/Reflowster_Reflow">available on Github.</a> To check the current version number, view the .ino file and find the line that defines VERSION. This is the most recent version.

If your version number is less than the most recent version, it may be time to upgrade.

To update your Reflowster’s firmware, you will need to set up your Reflowster development environment.

<a name="setupdevelopmentenv"></a>
Setting up your Reflowster development environment
==================================================
In order to update your Reflowster firmware or to upload custom firmware, you will need to have a working Reflowster development environment. The development environment will require the Arduino IDE, the required libraries, and a sketch that will act as your Reflowster firmware. (in most cases, this will be a copy or modified version of the default Reflowster firmware)

<a name="arduinoide"></a>
Setting up the Arduino IDE
--------------------------
First download and install the <a href="http://arduino.cc/en/main/software">Arduino IDE</a> from the Arduino website using the instructions provided.

In some cases, you may need to install a USB driver to get your Reflowster to show up in the serial port menu. You'll find more information about this driver in the <a href="http://arduino.cc/en/Guide/ArduinoLeonardoMicro?from=Guide.ArduinoLeonardo">Arduino Leonardo guide</a>.

Connect your Reflowster via USB and verify that it shows up under Tools &gt; Serial Port menu. The easiest way to do this is to check the menu while Reflowster isn’t plugged in and then check the menu when it is plugged in to verify that a new port shows up. (Note: The menu only updates if you close out of the entire menu; holding the menu open as you plug/unplug your Reflowster will not work)

Before you download your libraries, be sure to select "Arduino Leonardo" from the Tools &gt; Board menu. This will be important when you are ready to program your Reflowster.

<a name="requiredlibraries"></a>
Getting the required libraries
------------------------------
In order to get the required libraries, you'll first need to locate your Arduino libraries folder. This will depend on where you have configured your sketchbook folder to be. The libraries folder will normally be inside your sketchbook folder. You can find the configured sketchbook folder path under the Arduino IDE preferences.

Note: If a "libraries" folder does not exist inside your sketchbook, you can safely create one and install your libraries into it.

If you are running a bash-capable environment, you can use our <a href="/reflowsterresources/downloadlibraries.sh">script</a> to automatically download these libraries to your libraries folder using this command:

<tt>wget http://reflowster.com/reflowsterresources/downloadlibraries.sh -O - | bash</tt>

or (if you don't have wget, with curl)

<tt>curl http://reflowster.com/reflowsterresources/downloadlibraries.sh | bash</tt>

<b>The required libraries that are downloaded by the script are as follows:</b>

<a href="https://github.com/adafruit/Adafruit_NeoPixel">Adafruit's Neopixel Library</a> - This library is used to drive the multi-color status LED on Reflowster.

<a href="https://github.com/adafruit/Adafruit-MAX31855-library">Adafruit's MAX31855 Library</a> - This library is used to read the data from the MAX31855 thermocouple driver.

<span class="note">Note: The MAX31855 library from Adafruit needs to be renamed after being downloaded as the Arduino IDE does not honor hyphens as a valid character in a library name. We suggest swapping them out for underscores. (the script will do this automatically)</span>

<a href="http://www.pjrc.com/teensy/arduino_libraries/Encoder.zip">Encoder Library</a> - This library handles interrupt-driven encoder updates.

<a href="https://github.com/Reflowster/Reflowster">Reflowster Library</a> - This library contains interfaces to access all the functionality of Reflowster including the display, the encoder, the buzzer, and the status LEDs.

<span class="note">Note: After installing libraries, you'll need to restart the Arduino IDE in order to use the new libraries</span>

<a name="gettingfirmware"></a>
Getting the Reflowster firmware
-------------------------------
Once you've downloaded all of the required libraries into your libraries folder, you'll probably want to download the <a href="https://github.com/Reflowster/Reflowster_Reflow">core firmware for Reflowster</a>. You'll probably want to download the firmware into your sketchbook folder.

If you prefer to start with something more lightweight, you can use the example provided with the Reflowster library. You can access this either through the "examples" folder in the library or through the Arduino IDE's menus.

<span class="note">Note: The example doesn't contain any of the logic required to perform reflow soldering. If you intend to use your Reflowster for soldering, you'll probably want to use the reflowster firmware as a base.</span>

<a name="testuploadfirmware"></a>
Test your setup by uploading new firmware
-----------------------------------------
After you've restarted your IDE, you'll be able to compile and upload the version of the Reflowster firmware that you just downloaded. Open the Reflowster_Reflow.ino file wherever you downloaded it to in the previous step. Once open, verify that your Reflowster is connected via USB and that it shows up under the Tools &gt; Serial Port menu. Lastly, be sure that Arduino Leonardo is selected under Tools &gt; Board. Click upload (a circular icon with an arrow) in your open window. If all goes well, you'll be greeted shortly with a confirmation message and Reflowster will reboot with the new firmware.

<a name="troubleshooting"></a>
Troubleshooting
===============

When pushing the knob in on "go" to start the reflow process, Reflowster displays "err"
---------------------------------------------------------------------------------------
This message means that the thermocouple is not being read properly. If the thermocouple is not plugged in, plug it in. If it is plugged in, try tightening the thermocouple or reinserting it.


When Reflowster powers on, the display lights up solidly and the main menu doesn't appear
---------------------------------------------------------------------------------------
It's possible that Reflowster has somehow gotten itself into self-test mode. In order to get out of self-test mode, you'll need to go through the self-test process. Press the knob in when this is displayed, then press the back button when "bck" is displayed. Continue pressing the knob in until "go" is displayed.


When the reflow process starts, the temperature is displayed, but the oven doesn't turn on
---------------------------------------------------------------------------------------
In this case, it is likely that your oven needs to be set into "always on" mode. Typically this is done by turning the timer knob backwards until it stops counting. If your toaster oven is too fancy, it may not have an option to force it on.


The reflow process completes, but the solder hasn't melted or turned silver
---------------------------------------------------------------------------------------
This probably means that you need to increase the peak temperature of your reflow profile. You'll do this by going to "edit" in the main menu and then selecting "peak temperature".


Reflowster does not show up in the Arduino "ports" menu when it is connected via USB
---------------------------------------------------------------------------------------
It's possible that your drivers are not installed correctly, follow the instructions on <a href="http://arduino.cc/en/Guide/ArduinoLeonardoMicro?from=Guide.ArduinoLeonardo#toc8">how to install drivers for the Arduino Leonardo.</a>


When building the Reflowster code, an error appears similar to "'Reflowster' does not name a type" or "Reflowster.h: No such file or directory"
---------------------------------------------------------------------------------------
You may be missing the Reflowster library. You'll want to use git to clone the <a href="https://github.com/Reflowster/Reflowster">Reflowster library</a> from Github into your libraries folder.


When building the Reflowster code, an error appears similar to "error: ISO C++ forbids declaration of 'Encoder' with no type"
---------------------------------------------------------------------------------------
You may be missing the <a href="http://www.pjrc.com/teensy/arduino_libraries/Encoder.zip">Encoder library</a>. You'll need to download it and unzip it to your libraries folder.


When building the Reflowster code, an error appears similar to "error: invalid use of incomplete type 'struct Adafruit_MAX31855'"
---------------------------------------------------------------------------------------
You may be missing the <a href="https://github.com/adafruit/Adafruit-MAX31855-library">Adafruid MAX31855 library</a>. You'll need to clone it from Github into your libraries folder. Alternatively, the library may be named incorrectly. Hyphens are invalid characters, you'll want to replace them with underscores.


When building the Reflowster code, an error appears similar to "error: ISO C++ forbids declaration of 'Adafruit_NeoPixel' with no type"
---------------------------------------------------------------------------------------
You may be missing the <a href="https://github.com/adafruit/Adafruit_NeoPixel">Adafruid Neopixel library</a>. You'll need to clone it from Github into your libraries folder.

