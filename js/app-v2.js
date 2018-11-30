//scroll up
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

//Setup canvas and global variables
const canvasSelector = document.querySelector("canvas"),
      canvasContent = canvasSelector.getContext("2d");
//Canvas size
const canvasWidth=600,
      canvasHeight=480,
      lineWidth=20;

const frameRate = 60;

const songMenu={
    LaFollia: {
        chords:prepareRepeatedChordArray(vivaldiLaFollia), 
        midi:'midi/vivaldi_la_follia.mid',
        BPM:90
    },

    WinterLargo: {
        chords:vivaldiWinterLargo, 
        midi:'midi/vivaldi_4_stagioni_inverno_2_(c)pollen.mid',
        BPM:40
    },
    AdagioAlbinoni: {
        chords:vivaldiWinterLargo, 
        midi:'midi/albinoni1.mid',
        BPM:55
    },
};

const songDropDown=document.getElementById('songDropDown');


let scaleArr;
let currentRhythm;

//instrument and note variables

let visualNotes = []; //array of all notes to display onscreen with 

let mouseY = 200,
    mouseIsDown,
    storedMouseY=200;

let currentNoteIndex = 20; //position in array of all notes

let doubleSpeed=false,
    invert=-1,
    descend=false,
    cursorControl=false;

let SoundFontInstrumentIsSetup=false;
let currentBPM
//starts background midi
function start(){
    //document.getElementById("start-button").style.color = "grey";
    //document.getElementById("start-button").disabled = true;

    let songValue=songDropDown.value;
    MIDI.loadPlugin({
        soundfontUrl: "soundfont/",
        onsuccess: function() {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }

            //reset global vars
            visualNotes = [];

            if (SoundFontInstrumentIsSetup==false){
                setupSoundFontInstrument();
                SoundFontInstrumentIsSetup=true;
            }

            Chords.load(songMenu[songValue].chords);
            setNoteLengths(songMenu[songValue].BPM);
            currentBPM=songMenu[songValue].BPM;
            generateMotifObject()
            //default rhythm
            currentRhythm=rhythmObject['z'];

            MIDI.programChange(0, MIDI.GM.byName["string_ensemble_2"].number);
            MIDI.setVolume(0, 22);
            MIDI.Player.BPM = songMenu[songValue].BPM;
            //MIDI.Player.loadFile('midi/vivaldi_4_stagioni_inverno_2_(c)pollen.mid', MIDI.Player.start);
            MIDI.Player.loadFile(songMenu[songValue].midi, MIDI.Player.start);

            timer.start(songMenu[songValue].BPM);
            
            startViewLoop(frameRate);
        //debug
        setInterval(()=>{
            //console.log(Chords.getCurrentChord())
              //  console.log(currentRhythm)

        },500)
        }
    });
}


let ac = new AudioContext();

function setupSoundFontInstrument(){

    Soundfont.instrument(ac, 'harpsichord').then(
        function(harpsichord) {
        //event listeners

        //canvasSelector.addEventListener("mouseup", endNote);
        document.addEventListener("mousemove", function(e){
            storedMouseY=e.pageY
            if (cursorControl==true) findClosestAllowedMouseY(e.pageY);
        });

        document.addEventListener("mousedown", function playNewNote(e) {
            console.log(canvasSelector.getBoundingClientRect())
            findClosestAllowedMouseY(e.pageY);
            newNote(harpsichord);
        });

        document.addEventListener("keydown", function playMotif(e){
            event.preventDefault(); 
            //if (e.key=='Tab'){doubleSpeed=true;}
            if (e.key=='Tab' || e.key=='Enter'){descend=true;}
            if (e.key=='Shift'){invert=1;}
            if (e.key==' '){cursorControl=true;}
            let pressedkey= e.key.toLowerCase()
            //play motifs and ornaments
            if (motifObject.hasOwnProperty(pressedkey)){
                let motifOutput= generateMotifNotes(e,motifObject[pressedkey])

                harpsichord.schedule(ac.currentTime, motifOutput);
            }
            //select rhythm
            if (rhythmObject.hasOwnProperty(pressedkey)){
                currentRhythm=rhythmObject[pressedkey];
            }
            //play chords with number keys
            let pitchArray = Chords.getCurrentChord().allPitches;
            let numberKeys= getTempKeyObject(pitchArray)
            if (numberKeys.hasOwnProperty(pressedkey)){
                newNote(harpsichord,numberKeys[pressedkey]);
            }
        });

        document.addEventListener("keyup", function playMotif(e){
            //if (e.key=='Tab'){doubleSpeed=false;}
            if (e.key=='Tab' || e.key=='Enter'){descend=false;}            
            if (e.key=='Shift'){invert=-1;}
            if (e.key==' '){cursorControl=false;}
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