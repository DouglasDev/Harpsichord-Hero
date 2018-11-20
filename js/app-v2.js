//Setup canvas and global variables
const canvasSelector = document.querySelector("canvas"),
      canvasContent = canvasSelector.getContext("2d");
//Canvas size
const canvasWidth=600,
      canvasHeight=480,
      rect = canvasSelector.getBoundingClientRect();
      lineWidth=20;

const frameRate = 60;

//song data
let BPM=90;
let songChords=vivaldiLaFollia;
//let chordTimeArray=prepareChordTimeArray(songChords);
//let chordTimeArray=prepareChordTimeArray(vivaldiWinterLargo);

let visualNotes = []; //array of all notes to display onscreen with 

//instrument and note variables

//dirty global variables
let mouseY = 0,
    mouseIsDown,
    storedMouse=240;

let currentNoteIndex = 0 //position in array of all notes


let doubleSpeed=false,
    descend=false;

let scaleArr


//starts background midi
function start(){
    document.getElementById("start-button").style.color = "grey";
    document.getElementById("start-button").disabled = true;

    MIDI.loadPlugin({
        soundfontUrl: "soundfont/",
        onsuccess: function() {

            setupSoundFontInstrument();

            Chords.load();

            MIDI.programChange(0, MIDI.GM.byName["string_ensemble_2"].number);
            MIDI.setVolume(0, 18);
            MIDI.Player.BPM = BPM;
            //MIDI.Player.loadFile('midi/vivaldi_4_stagioni_inverno_2_(c)pollen.mid', MIDI.Player.start);
            MIDI.Player.loadFile('midi/vivaldi_la_follia.mid', MIDI.Player.start);

            timer.start(BPM);
            
            startViewLoop(frameRate);

        }
    });
}


let ac = new AudioContext();

function setupSoundFontInstrument(){

    Soundfont.instrument(ac, 'harpsichord')
    .then(function(harpsichord) {
        //event listeners

        //canvasSelector.addEventListener("mouseup", endNote);
        canvasSelector.addEventListener("mousemove", findClosestAllowedMouseY);

        document.addEventListener("mousedown", function playNewNote(e) {
            newNote(harpsichord);
        });

        document.addEventListener("keydown", function playMotif(e){
            event.preventDefault(); 
            if (e.key==' '){doubleSpeed=true;}
            if (e.key=='Shift'){descend=true;}
            console.log(e.key)
            let pressedkey= e.key.toLowerCase()
            if (motifObject.hasOwnProperty(pressedkey)){
                   let motifOutput= generateMotifNotes(e,motifObject[pressedkey])
                    harpsichord.schedule(ac.currentTime, motifOutput);
            }
            if (numberKeys.hasOwnProperty(pressedkey)){
                let pitchArray = Chords.getCurrentChord().allPitches;
                let tempKeyObject= getTempKeyObject(pitchArray);
                newNote(harpsichord,tempKeyObject[pressedkey]);
            }
        });

        document.addEventListener("keyup", function playMotif(e){
            if (e.key==' '){doubleSpeed=false;}
            if (e.key=='Shift'){descend=false;}     
        });
    });
}

//setup ends

function getTempKeyObject(pitchArray){
    let keysList=['`','1','2','3','4','5','6','7','8','9','0','-','=','[',']','\\']
    let keysListPosition=0,output={};

    for (let i=pitchArray.length-1;i>=0;i--){
        output[keysList[keysListPosition]]=pitchArray[i];
        keysListPosition+=1;
    }
    return output;
}