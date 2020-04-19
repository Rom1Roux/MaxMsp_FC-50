/*** inlets and outlets ***/
inlets = 3;
outlets = 8;

/*** global variables ***/
var firstTimeRun = true;
var output = {};
var lastNumber = 0;
var A_B = 0;
var bank = 0;
var maxValue = 127;

var choicePost = ["Note", "Control Change"]; 
var modePost   = ["one-shot","toggle"];


/**
 * receive Program Change signal of BOSS FC-50 - values is stored in object (output) in the global variables
 * output object is initalized in function uploadPreset - line 135
 * @param{number} programChange is number of program Change of BOSS FC-50
 * outlet0 return choice number (0 = note or 1 = ControlCHange)
 * outlet1 return note or ControlChange Number (0 to 127)
 * outlet2 return number of values (0 or maxValue)
 * outlet3 return channel number (1 to 16)
 * outlet4 return number of A/B (0 or 1)
 * outlet5 return number of bank (0 to 12)
 */
function midiRouting(newNumber) {

  // post error if newNumber is'nt recorded in ouput
  if (output[newNumber] === undefined) {
    error("Error : ProgramChange " + newNumber + " is not recorded");
    post();
	error(JSON.stringify(output));
    return;
  }
  // No sending value when there is a change of range (A or B and Banks)
  if (
    newNumber !== lastNumber - 5 &&
    newNumber !== lastNumber + 5 &&
    newNumber !== lastNumber - 10 &&
    newNumber !== lastNumber + 10
  ) {
	
	// one-shot mode
    if (output[newNumber]["mode"] === 0) {
      output[newNumber]["value"] = 127;
      newNumber !== lastNumber && (output[lastNumber]["value"] = 0);
    }

    // Toggle Mode (value => 0 or maxValue) with function toggle (line 118)
    else {
      output[newNumber]["value"] = toggle(output[newNumber]["value"]);
    }
 
  }

  if (newNumber === lastNumber - 5) {
    A_B = 0;
  }
  if (newNumber === lastNumber + 5) {
    A_B = 1;
  }
  if (newNumber === lastNumber - 10) {
    bank = bank - 1;
    bank < 0 && (bank = 0);
  }
  if (newNumber === lastNumber + 10) {
    bank = bank + 1;
    bank > 12 && (bank = 12);
  }

  // object js output
  outlet(0, output[newNumber]["choiceNoteCc"]);
  outlet(1, output[newNumber]["routeOut"]);
  outlet(2, output[newNumber]["value"]);
  outlet(3, output[newNumber]["channel"]);

  outlet(4, A_B);
  outlet(5, bank);

  outlet(6, newNumber + 1); // correspond to selected pedal (pedalBoard)

  lastNumber = newNumber;

  // Max console post
  post('A/B : ' + A_B);
  post();

  post('bank : ' + bank);
  post();
  
  post('Choice : ' + choicePost[ output[newNumber]["choiceNoteCc"] ]);
  post();
	
  post('Mode : ' + modePost[ output[newNumber]["mode"] ]);
  post();

  post('Midi channel : ' + output[newNumber]["channel"]);
  post();

  post('CC/Note output : ' + output[newNumber]["routeOut"]);
  post();

  post('value : ' + output[newNumber]["value"]);
  post();

  post('---------------------------------');
  post();
}


/**
 * Inverse number - IF input is 0 then return 1 else return 0
 * @param{number} onOff contain 0 or 1
 * @return{number} return inverse number of input
 */
function toggle(onOff) {
  if (onOff === 0) {
    return maxValue;
  } else {
    return 0;
  }
}


/**
* upload preset in Object (globals variable)
* @param{number} program Change (0 to 127)
* @param{string} choiceNoteCc ("Note or "Control-Change")
* @param{number} mode trigger (0 = "one-shot", 1 = "toggle")
* @param{number} routeOut is ControlChange or note number (0 to 127)
* @param{number} channel of midiout (1 to 16)
*/
function uploadPreset(programChange, choiceNoteCc, mode, routeOut, channel){
	output[programChange] = {mode : mode, 
							choiceNoteCc : choiceNoteCc,
							routeOut : routeOut,
							channel: channel};
	extractPresetOutput();
	
	var resultFunction = findPedalAndBank(programChange);
	var pedalNumber = resultFunction.pedalNumber;
	var bank = resultFunction.bank;
	
	if (!firstTimeRun){
	post('*** Pedal ' + pedalNumber + ' uploaded ! ***');
	post();
	
	post('bank : ' + bank);
  	post();
	
	post('Choice : ' + choicePost[ output[programChange]["choiceNoteCc"] ]);
	post();
	
	post('Mode : ' + modePost[ output[programChange]["mode"] ]);
	post();
	
	post('Note/Cc Midi out : ' +output[programChange]["routeOut"]);
	post();
	
	post('midi channel : ' +output[programChange]["channel"]);
	post();
	
	post('---------------------------------');
    post();
	
	}
	
}


/**
* convert programChange to pedal number FC-50 and bank number
* @param{number} programChange number
* @return{object} return object with pedal and bank number 
*/
function findPedalAndBank(programChange) {
  programChange = programChange + 1;

  var pedalNumber =
  programChange > 10 ? parseInt(programChange.toString()[1], 10) : programChange;
  pedalNumber === 0 && (pedalNumber = 10);

  var bank = 0;
  if (programChange > 10 && programChange < 100) {
    bank = programChange.toString()[0];
  } else if (programChange >= 100) {
    bank = programChange.toString()[0] + programChange.toString()[1];
  }

  return { pedalNumber: pedalNumber, bank: bank };
}


/**
* extract data from output
* outlet7 return JSON with object
*/
function extractPresetOutput(){
	outlet(7, JSON.stringify(output));
}


/**
* upload preset with values
*/
function loadObjectPreset(str){
	var obj = JSON.parse(str);
	output = obj;
	
	post("load config value")
	post();
	
	post('---------------------------------');
    post();
}


function blockConsoleMax(){
	firstTimeRun = false;
}