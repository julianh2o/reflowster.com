#!/bin/bash

requiredLibraries=$(cat <<EOF
https://github.com/adafruit/Adafruit_NeoPixel
https://github.com/adafruit/Adafruit-MAX31855-library
http://www.pjrc.com/teensy/arduino_libraries/Encoder.zip
https://github.com/Reflowster/Reflowster
EOF
)

arduinoPreferences="${HOME}/.arduino/preferences.txt"

if [ ! -e "$arduinoPreferences" ]
then
    arduinoPreferences="${HOME}/Library/Arduino/preferences.txt"
    if [ ! -e "$arduinoPreferences" ]
    then
        echo "Arduino preferences file not found: $arduinoPreferences"
        echo " Have you downloaded, installed, and run the Arduino IDE?"
        exit
    fi
fi

command -v git >/dev/null 2>&1 || { echo >&2 "Git is not installed and is required.  Aborting."; exit 1; }

sketchbookPath=`grep sketchbook.path $arduinoPreferences`
sketchbookPath=${sketchbookPath##*=}

librariesDirectory="$sketchbookPath/libraries"
# this allows the user to edit/confirm their arduino libraries directory
#read -e -i "$librariesDirectory" -p "Download libraries to: " input
#librariesDirectory="${input:-$librariesDirectory}"
echo "Downloading libraries to: $librariesDirectory"

function main() {
    for liburl in `echo "$requiredLibraries"`
    do
        echo
        if [[ $liburl == *github* ]]
        then
            downloadGithubLibrary $liburl
        elif [[ $liburl == *zip ]]
        then
            downloadZipLibrary $liburl
        fi
    done
}

function downloadGithubLibrary() {
    libname=${1##*/}
    libname=${libname%.git}
    targ=${libname//-/_}
    if [ -e "$librariesDirectory/$targ" ]
    then
        echo "Library exists, updating: $libname"
        cd $librariesDirectory/$targ
        git pull origin master
    else
        cd $librariesDirectory
        echo "Cloning into $targ"
        git clone $1 $targ
    fi
}

function downloadZipLibrary() {
    filename=${1##*/}
    libname=${filename%.zip}
    if [ -e "$librariesDirectory/$libname" ]
    then
        echo "Library exists, skipping: $libname"
    else
        cd /tmp
        wget $1
        unzip $filename -d $librariesDirectory/
    fi
}

main
