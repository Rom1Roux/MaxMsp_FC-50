# FC-50
## Presentation
My name is [Romain Roux](https://www.romainroux.com), musician and sound artist with the [collectif OKTO](https://www.collectif-okto.com).

Here is a MaxMsp project to use [BOSS FC-50](https://fr.audiofanzine.com/pedalier-midi/boss/fc-50/) pedalboard on your favorite DAW. 
*I guess than you can use this patch with [Roland GFC-50](https://www.roland.com/fr/products/gfc-50/)*.

FC-50 send ProgramChange [1] and this patch convert ProgramChange in Note or Control Change with javascript object. You can configure each midi output in the parameter window.

[1] The program change is a MIDI message to trigger a change of effects or instruments - depending on the Midi device you are using
___
## What is Max
*"Max is an infinitely flexible place to create interactive media software. With in-depth tools for audio, graphics, interaction, and communication, Max is an environment to explore and develop your own ideas."*
[Max | Cycling '74](https://cycling74.com/products/max/)
___
## Version
Version of maxMsp to open this patch: >= 7.3.5
___
## Install
1- If you don't have MaxMsp, [install it](https://cycling74.com/downloads).

2- Clone : https://github.com/Rom1Roux/MaxMsp_FC-50.git or [download zip](https://github.com/Rom1Roux/MaxMsp_FC-50/archive/master.zip).

3- Connect the midi output of the FC-50 to the midi input of your computer (external sound card, USB Midi,...). I use an USB Midi interface ([Roland - UM-One](https://www.roland.com/fr/products/um-one_mk2/)).

4- open file "FC-50 - 1.1.maxproj" (MaxMsp_FC-50 > FC-50>FC-50 - 1.1 > FC-50 - 1.1.maxproj)
## Configuration
1- press button parameter : 
![pathes FC-50](https://github.com/Rom1Roux/MaxMsp_FC-50/blob/master/IMG/patches%20FC-50.png)

2- Select Midi in/out and choice values for your external pedal :
![parameter FC-50](https://github.com/Rom1Roux/MaxMsp_FC-50/blob/master/IMG/patches%20FC-50%20parameter.png)

3- Press bank number and select your config (note/CC) :
![FC-50 Bank 0](https://github.com/Rom1Roux/MaxMsp_FC-50/blob/master/IMG/patches%20FC-50%20pedalboard%20bank0.png)

4- Save your preset on parameter window (you can save and upload many preset if you change number)

5- You can now assign your note/Cc in your favorite DAW.

