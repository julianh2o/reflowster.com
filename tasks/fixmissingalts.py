#!/usr/local/bin/python3

import re
import os

def filesOfType(root,typeArray,exclude):
    matchingFiles = [];
    for root, dirs, files in os.walk(root,topdown=True):
        dirs[:] = [d for d in dirs if d not in exclude] 
        for f in files:
            _,ext = os.path.splitext(f)
            if (ext in typeArray):
                matchingFiles.append(os.path.join(root,f));
    return matchingFiles;

def fileToString(f):
    with open(f,'r') as fd:
        return fd.read()

def stringToFile(f,contents):
    with open(f,'w') as f:
        f.write(contents);

def parseXmlTag(tag):
    m = re.match("<([^ ]+) (.*?)>",tag);
    if (not m): return None;
    attributeString = m.group(2)
    attributes = {};
    for mm in re.finditer("([^ =]+)=([^ ]+)",attributeString):
        value = mm.group(2);
        value = value.strip('"\'');
        attributes[mm.group(1)]=value;
    return {
        "tag": m.group(1),
        "attributes": attributes
    };

def generateXmlTag(taginfo):
    attributeString = "";
    for key in taginfo["attributes"].keys():
        val = taginfo["attributes"][key]
        attributeString += " %s=\"%s\""% (key,val)
    attributeString = attributeString[1:]
    return "<%s %s>" % (taginfo["tag"],attributeString);

def performReplacements(contents,replacements,verbose=False):
    delta = 0;
    for r in replacements:
        start = r[0] + delta;
        end = r[1] + delta;
        existing = contents[start:end]
        before = contents[start-10:end+50];
        contents = contents[:start] + r[2] + contents[end:]
        delta -= len(existing) - len(r[2]);
        if (verbose): print("Replacing... %s with %s" % (existing,r[2]));
                
    return contents;

def main():
    for f in filesOfType(".",[".html",".markdown"],["_site"]):
        contents = fileToString(f);
        filename = os.path.basename(f);
        printFileName = True;
        replacements = [];
        
        temphtmlfile = "";
        for m in re.finditer("<img .*?>",contents):
            tag = parseXmlTag(m.group(0));
            if ("alt" not in tag["attributes"].keys()):
                temphtmlfile += "<h1>%s</h1>" % (os.getcwd()+tag["attributes"]["src"])
                temphtmlfile += "<img src='file://%s'>" % (os.getcwd()+tag["attributes"]["src"]);
                temphtmlfile += "<hr/>";
        temphtmlfilename = "/tmp/view.html"
        stringToFile(temphtmlfilename,temphtmlfile);
        print("writing temp html file to %s" % temphtmlfilename);
        for m in re.finditer("<img .*?>",contents):
            tag = parseXmlTag(m.group(0));
            if ("alt" not in tag["attributes"].keys()):
                if (printFileName):
                    print("In %s (%s)" % (filename,f))
                    printFileName = False;
                print("\t%s" % m.group(0))
                alt = input('Define alt attribute? ')
                if (alt is not None):
                    tag["attributes"]["alt"] = alt;
                    before,replaced,after = m.group(0).partition(" ")
                    replacementString = before+replaced+("alt=\"%s\" " % alt)+after
                    replacementInfo = (m.start(),m.end(),replacementString)
                    replacements.append(replacementInfo)
        if (len(replacements)):
            newContents = performReplacements(contents,replacements,verbose=True);
            print("writing ",f+".edited");
            stringToFile(f+".edited",newContents)
            exit(0)

main();
