---
layout: post
title: "Writing your first EAGLE ULP script"
description: EAGLE User Language Programs (ULP) are an extremely powerful way to add functionality and convenience to EAGLE.
author: julian
categories: blog
---

When working with EAGLE, you'll fairly often find yourself repeating a series of steps for different projects or parts. In some cases, this might be a few steps that are performed fairly often that could be shortened to a single step or perhaps a large number of steps that even once or twice can take a significant amount of time.

EAGLE's User Language Programs or ULPs are a powerful way of turning these repeated processes into a single EAGLE command. If you've never worked with ULPs before, you've come to the right place. I'll be giving a quick overview and a "Hello World" example to help you get started in the realm of enhancing EAGLE through ULPs.

<!--more-->

Overview of ULPs
----------------
EAGLE's User Language Programs are written using a C-like syntax detailed in the <a href="ftp://ftp.cadsoftusa.com/eagle/userfiles/doc/ulp_en.pdf">EAGLE User Language Manual</a>. Access to information about your current board, schematic, footprint, or other open documents are available through a series of function calls that return objects that correspond directly to those available through the EAGLE interface.

Unfortunately, ULPs are not provided direct access to modifying these objects. In order to edit your EAGLE document, you'll have to generate the string of EAGLE commands to perform the desired manipulation. Even more limiting, you'll only have one opportunity to execute a command and that is while returning control to EAGLE through the exit command. Passing a string as the argument to exit will cause the string to be executed as an EAGLE command.

<img alt="This simple ULP will draw a single wire" class="showcase" src="/resources/images/blog/eagle_simple_wire.png" />

The above program will execute the EAGLE command "WIRE (0 0) (1 0);" which selects the wire tool and then simulates a click at the origin (0,0) and another click at (1,0). I will continue to describe how each of the EAGLE commands that I'm using works, but if you are ever confused, use EAGLE's built-in help files to look the commands up under "Editor Commands"

Setting up
----------
EAGLE comes with a fairly extensive set of ULPs located in the "ulp" folder. By default, this is the only directory that EAGLE will look for scripts in. Before starting with scripting, I'd highly recommend creating your own script directory for your projects and pointing EAGLE to it through the menu option Options > Directory. To do this, add your folder to the list separated by the ":" character as below.

<img alt="In the directory options, you can append a custom path to any of the directory options to expand the search path" class="showcase" src="/resources/images/blog/eagle_directories.png" />

Now that you have a folder for your ULPs, create a new script there. You can either use EAGLE's New > ULP menu item or you can simply create a new empty text file with the extension ".ulp". For the sake of this tutorial, we'll use the name "tutorial.ulp". Once you've created this file, fill it with the sample program from the screenshot above. (reproduced below for convenience).

	string command = "WIRE (0 0) (1 0);";
	exit(command);

Open up a schematic file (or create one) and using the command box, execute
	run tutorial

If all goes well, your script will create a line extending from the origin to the coordinates (1 0).

If you get an error message that says "Can't find 'tutorial.ulp'", check your Options > Directories settings and the location of your ULP to make sure that EAGLE is looking in the right place.

If you get a syntax error, the line will be provided and the ULP file will be opened automatically. Double check that line for things like matching quotation marks and parentheses, missing semicolons, and misspellings.

Hello World
-----------
For the obligatory "Hello World" and for a convenient method of debugging your more complicated ULPs, we'll need a way of writing text from our ULP. EAGLE ULPs don't run with a console that we can output text to, but they do provide the output function and block that will enable the printf command for writing to text files.

	output("/tmp/ulp_output.txt","at") {
		printf("Hello World\n");
	}


The script above will open the file "/tmp/ulp\_output.txt" for appending text to. All enclosed calls to printf will write to this file. In order to get this to function properly for you, you may need to change the path to something that will be valid on your system. Because I'm running EAGLE under OS X, the /tmp/ folder provides a convenient place for debugging output. Furthermore, I can open the Terminal application and use the command *tail -f /tmp/ulp\_output.txt* to display new printed messages as soon as they are written to the file.

<img alt="Tailing the output file shows new lines as they are added to the file" class="showcase" src="/resources/images/blog/eagle_hello_world.png" />

I recommend using this sort of debugging output for almost every ULP you write. Even simple ULPs can benefit immensely from some quick message logging using this method. When I create a new ULP, the first thing I do is encase the entire file in an output block like the one above.

Now for something a bit more useful
-----------------------------------
When working with EAGLE, you'll probably have better things to do than dispersing salutations upon humble text files, so let's dive into a more useful example. In many symbols and footprints, I've found myself creating a box out of wires either to enclose the symbol or indicate the bounds of the component in a footprint.

Noticing this as a pattern, it didn't take me long to decide that it would be great to have a script that could easily and quickly create a box based on input parameters for the length and width. If you already know the size of the box, writing an EAGLE command to draw it is relatively straight forward. Using the wire tool, you'll select the 4 corners and then close the box by selecting the first corner again. To draw a 1x1 box, you might use the following command.

	WIRE (0 0) (0 1) (1 1) (1 0) (0 0);

You can test this out by copying and pasting it into the EAGLE command window and hitting enter. We could do this every time, but we're faced with the tedium of replacing the values for each corner of our box.

<img alt="Typing out the WIRE command manually is effective at getting exactly what you want but is slow" class="showcase" src="/resources/images/blog/eagle_wirebox.png" />

Here is a ULP that generates a box centered at the origin when provided with the length and the width. Below, I'll go through the program line by line.

    output("/tmp/ulp_output.txt","at") {
        if (argc != 5 && argc != 3) {
            dlgMessageBox("Incorrect number of arguments","Ok");
            exit(1);
        }

        real width = strtod(argv[1]);
        real height = strtod(argv[2]);


        real x = 0;
        real y = 0;
        if (argc >= 4) {
            x = strtod(argv[3]);
            y = strtod(argv[4]);
        }

        string s = "";
            sprintf(s,"WIRE (%f %f) (%f %f) (%f %f) (%f %f) (%f %f);",
                x+width/2.0,y+height/2.0,
                x+width/2.0,y-height/2.0,
                x-width/2.0,y-height/2.0,
                x-width/2.0,y+height/2.0,
                x+width/2.0,y+height/2.0
            );

        exit(s);
    }


To execute this program, you need to provide the length and width as arguments. I've placed this code into a ULP file called "box.ulp". To create a 2x2 box centered at the origin, you'd use `run box 2 2`.

    output("/tmp/ulp_output.txt","at") {

You've already seen this line, and the astute among you will note that this output block contains no printf statements. This line is actually completely unnecessary in the program as it stands. However, when I was working on this program, it was useful to have access to debugging output. If I ever go back to enhance this program, I may need that debugging output again, so I've left it here.

        if (argc != 5 && argc != 3) {
            dlgMessageBox("Incorrect number of arguments","Ok");
            exit(1);
        }

This section of code will make sense to anyone who's programmed in C before. *argc* is a "magic" variable that is set for you that tells you how many arguments have been provided to the program. The caveat here is that a program executed with no arguments will have an argc of 1. This is in accordance with the C standard of including the program name as the first argument. As such, this block will be skipped if either 2 or 4 arguments are provided. If a different number of arguments are provided, an alert is displayed.

        real width = strtod(argv[1]);
        real height = strtod(argv[2]);


The first two arguments are the length and width respectively. We use the ULP function *strtod* to convert the string argument to a numerical one of type *real*.

        real x = 0;
        real y = 0;
        if (argc >= 4) {
            x = strtod(argv[3]);
            y = strtod(argv[4]);
        }

The default position for the box is at the origin, but two optional arguments let you specify the center of the box. Again, we use *strtod* to convert the string into a real.

	string s = "";
        sprintf(s,"WIRE (%f %f) (%f %f) (%f %f) (%f %f) (%f %f);",
            x+width/2.0,y+height/2.0,
            x+width/2.0,y-height/2.0,
            x-width/2.0,y-height/2.0,
            x-width/2.0,y+height/2.0,
            x+width/2.0,y+height/2.0
        );

This piece of code is responsible for generating the EAGLE commands to create our box. The bulk of this is just mathematical construction of the box vertices based on the width, height, and position. More importantly, we're using the *sprintf* function to format our command and store it into the *s* variable. The *sprintf* function takes the destination variable, the format string, and then as many input variables as there are format specifiers. We're using the format specifier *%f* which accepts the real type. You can find more information about format specifiers and the printf and sprintf functions on page 89 of the ULP manual.

	exit(s);

Lastly, we're exiting with the value s to terminate our ULP and execute the command that we've generated.

Here is an example execution of the script

<img alt="This screen shot shows the result of running our new box command twice" class="showcase" src="/resources/images/blog/eagle_boxes.png">


Furthering your ULP scripting
-----------------------------
You know enough now to start writing your own ULPs, but you'll probably find yourself with more questions than answers before too long. As I've mentioned above, both the built-in help browser for EAGLE Editor Commands and the <a href="ftp://ftp.cadsoftusa.com/eagle/userfiles/doc/ulp_en.pdf">EAGLE User Language Manual</a> are invaluable learning tools for writing ULPs.

The other wealth of information is the existing ULPs that come bundled with EAGLE. I highly recommend browsing through them for more code examples.
