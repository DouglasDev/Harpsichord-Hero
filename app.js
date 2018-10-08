//Setup canvas and global variables
let canvasSelector = document.querySelector("canvas");
let canvasContent = canvasSelector.getContext("2d");
canvasContent.fillStyle = 'red';
//old framerate variables
let current = 0,
    interval = 3,
    framerate = 30;

//instrument and note variables
let visualNotes = [], //array of all notes to display onscreen with 
    mouseY = 0,
    currentNoteIndex = 0, //position in array of all notes
    currentNote, 
    mouseIsDown;

    //chord variables
let currentChordEl = 0,
    playNextChord = true,
    currentChordNotes=[];
    currentAllowedNoteIndexes=[];

    //repeatChord = 1;

let chordTimeArray=prepareChordTimeArray(vivaldiWinterLargo);



let BPM=45,
    beatInMilliSec=(60/(BPM*2))*1000
    timeSignature=4,
    measure=beatInMilliSec*timeSignature;

//Canvas size
let canvasWidth=600,
    canvasHeight=480,
    rect = canvasSelector.getBoundingClientRect();
    lineWidth=20;

let currentAllowedNotes=[];


let songStarted=false;

//starts background midi
function start(){
    document.getElementById("start-button").style.color = "grey";
    document.getElementById("start-button").disabled = true;

    MIDI.loadPlugin({
        soundfontUrl: "soundfont/",
        onsuccess: function() {

            MIDI.programChange(0, MIDI.GM.byName["string_ensemble_2"].number);
            MIDI.setVolume(0, 12);
            MIDI.Player.BPM = BPM;
            MIDI.Player.loadFile('midi/vivaldi_4_stagioni_inverno_2_(c)pollen.mid', MIDI.Player.start);

            songStarted=true;

            MIDI.Player.addListener(function(data) {
                
                let timeNow = data.now; // where we are now
                let currentBeat= Math.floor(timeNow/beatInMilliSec);

                selectChords(currentBeat);
            });

        }
    });
}

canvasSelector.addEventListener("mouseup", endNote);
canvasSelector.addEventListener("mousemove", findClosestAllowedMouseY);

function findClosestAllowedMouseY(e){
    allowedMouseY()
    newMouseY=e.clientY-85
    for(let i=0; i<currentAllowedMouseYArray.length;i++){
        if(currentAllowedMouseYArray[i]>newMouseY){
            let upper=currentAllowedMouseYArray[i]-newMouseY;
            let lower=newMouseY-currentAllowedMouseYArray[i-1];
          upper>lower?  newMouseY = currentAllowedMouseYArray[i-1]:newMouseY =currentAllowedMouseYArray[i];

                mouseY = newMouseY;
    currentNoteIndex = Math.round((mouseY - rect.top) / 10)+8;
            break;    
        }   
    }
}

function getMouseY(e) {
    //convert mouseY to Canvas Y by rounding to nearest 10th pixel
    //doesn't set any notes!!!
    let newMouseY = (Math.round((e.clientY - rect.top) / 10)) * 10 - 5;
    currentNoteIndex = Math.round((e.clientY - rect.top) / 10);
    mouseY = newMouseY;
}

//Soundfonts instrument setup
let ac = new AudioContext();

Soundfont.instrument(ac, 'harpsichord')
.then(function(harpsichord) {
    //event listeners
    document.addEventListener("mousedown", function playNewNote(e) {
        currentNote = allNotes[currentNoteIndex];
        newNote(harpsichord);
    });

    document.addEventListener("keypress", function playMotif(e){
        if (motifObject.hasOwnProperty(e.key)){
                generateMotifNotes(e,motifObject[e.key])
                harpsichord.schedule(ac.currentTime, motifOutput);
            }
        }) 
});

let motifOutput=[]

function generateMotifNotes(e,motif){
    
// bug: doesn't play until mouse is first clicked
    currentNote = allNotes[currentNoteIndex];

    motifOutput=[]

    findClosestAllowedMouseY(e)    
    let position= allOctaveScale.indexOf(currentNote.octave);
    
    motif.forEach((el,index)=>{
         let noteInterval=motif[index].note

         motifOutput[index]={note: allOctaveScale[position-noteInterval],
                             time: motif[index].time };
     })
}


//loop for updating canvas 
setInterval(() => {
         canvasContent.clearRect(0, 0, canvasSelector.width, canvasSelector.height);

    //draw staff
    // canvasContent.beginPath();

    // for (let y = 1; y < 480; y += lineWidth) {
    //     canvasContent.moveTo(0, y);
    //     canvasContent.lineTo(800, y);
    // }
    // canvasContent.globalAlpha = 1;

    // canvasContent.stroke();

    //draw current chord
    if (songStarted==true){printChords()}

    //draw note at cursor position

    //draw circle
    let circle = new Path2D();
    circle.arc(300+5, mouseY+6, 5, 0, 2 * Math.PI);        
    canvasContent.fillStyle = 'black';
    canvasContent.fill(circle);
    //draw line
    canvasContent.strokeStyle = 'black';
    canvasContent.beginPath();
    canvasContent.moveTo(309, mouseY+6);
    canvasContent.lineTo(309, mouseY-18);

    canvasContent.stroke();

    //draw notes
    visualNotes.forEach((n) => {
        if (n.num == current) {
            n.width += interval;
            canvasContent.fillStyle = 'black';
        } else { canvasContent.fillStyle = 'grey'; }
        n.x -= interval;
        canvasContent.fillRect(n.x-5, n.y+1, n.width, 10);
    });
}, framerate);


//play notes and calculate positions

function prepareChordTimeArray(array){
    let currentTime=0;
    let ChordTimeArray=[];
    array.forEach(e=>{
        ChordTimeArray.push(currentTime);
        currentTime+=e.beats;
    })
    return  ChordTimeArray;
}

function selectChords(currentBeat){
    if (chordTimeArray[currentChordEl]==currentBeat){
        //set current scale
        if (vivaldiWinterLargo[currentChordEl].scale!=undefined && 
            vivaldiWinterLargo[currentChordEl].scale!=currentScale)
        {
            scaleArr = teoria.scale(...vivaldiWinterLargo[currentChordEl].scale).simple();
            selectScaleInAllOctaves(scaleArr);
        }
        currentChordName=vivaldiWinterLargo[currentChordEl].chord;
        //code to only allow playing of notes in current chord
        currentChordNotes = teoria.chord(currentChordName).simple();
        currentChordNotesAndOctaves(currentChordNotes)
        //get mouse Y positions for chord values
        allowedMouseY()
        currentChordEl+=1;
    }
}


let allOctaveScale=[]
function selectScaleInAllOctaves(scaleArr){
    allOctaveScale=[]
    allNotes.forEach(e=>{
        if (scaleArr.includes(e.note))
            allOctaveScale.push(e.octave);
    }
    )
}


function currentChordNotesAndOctaves(currentChordNotes){
    //find chord notes in all octaves
    currentAllowedNoteIndexes=[];

    for(let e=0;e<allNotes.length;e++){
            currentChordNotes.forEach(note => {
                if (allNotes[e].note == note){
                    currentAllowedNoteIndexes.push(e)
                }
            }
            )
    }

}


function printChords(){
    //draw on screen
    currentAllowedNoteIndexes.forEach(index=>{
        y = index*lineWidth/2 + rect.top-85;
        canvasContent.fillStyle = 'goldenrod';
        canvasContent.fillRect(0, y, 600, 10);
    })
}

let currentAllowedMouseYArray=[];
function allowedMouseY(){
    currentAllowedMouseYArray=[];
    currentAllowedNoteIndexes.forEach(index=>{
        y = index*lineWidth/2 + rect.top-85;
        currentAllowedMouseYArray.push(y);
    })
}




function newNote(instrument,note) {
    currentNote=note;
    //select new note based on y position
    if (note==undefined){currentNote = allNotes[currentNoteIndex];}
        //play the note
        mouseIsDown = 1;
        //add note to array of visualized notes
        visualNotes.push({
            num: current,
            x: 300,
            y: mouseY,
            width: 10
        });
        instrument.play(currentNote.octave, ac.currentTime, { duration: 1.0 });
}


function endNote() {
    mouseIsDown = 0;
    current += 1;
}

// function teoriaNoteToWadNote(note) {
//     let arr = note.split('');
//     arr[0] = arr[0].toUpperCase();
//     arr.push('3');
//     return arr.join('');
// }

// MIDI.Player.currentTime = integer; // time we are at now within the song.
// MIDI.Player.endTime = integer; // time when song ends.
// MIDI.Player.playing = boolean; // are we playing? yes or no.
// MIDI.Player.loadFile(file, onsuccess); // load .MIDI from base64 or binary XML request.
// MIDI.Player.start(); // start the MIDI track (you can put this in the loadFile callback)
// MIDI.Player.resume(); // resume the MIDI track from pause.
// MIDI.Player.pause(); // pause the MIDI track.
// MIDI.Player.stop(); // stops all audio being played, and resets currentTime to 0.
// Listener for when notes are played
// MIDI.Player.removeListener(); // removes current listener.
// MIDI.Player.addListener(function(data) { // set it to your own function!
//     var now = data.now; // where we are now
//     var end = data.end; // time when song ends
//     var channel = data.channel; // channel note is playing on
//     var message = data.message; // 128 is noteOff, 144 is noteOn
//     var note = data.note; // the note
//     var velocity = data.velocity; // the velocity of the note
//     // then do whatever you want with the information!
// });



//4 seconds to go across canvasWidth
//update display 30 times/second
//frameRate=1000/30
//30 frames per second
//120 frames to move across canvas
//distancePerFrame=canvasWidth/120= distance to move per frame

//60BPM = 1 beat = distancePerFrame*30
//120BPM = 1 beat = distancePerFrame*60
// beatDistance = distancePerFrame*(BPM/2)


//currentXposition=offset+beatDistance*noteTime
//decrease offset by distancePerFrame each loop

// function timeToXPosition(time){

//     return xPosition
// }

// function yPositionToNote(yPosition){

//     return note
// }

// function noteToYPosition(note){

//     return yPosition 
// }

// function drawNote(noteAndOctave,timeStart,TimeEnd){
//     let xStart= timeToXPosition(timeStart);
//     let xEnd= timeToXPosition(timeEnd);
//     let width=xEnd-xStart;
//     let y=noteToYPosition(noteAndOctave);
//     canvasContent.fillStyle = 'blue';
//     canvasContent.fillRect(xStart-5,y-1, width, 10);

// }

// function drawChord(chordArray,timeStart,TimeEnd){
//     chordArray.forEach(e=>{
//             allNotes.forEach(n=>{
//                 if (n.note==e){
//                     drawNote(noteAndOctave,timeStart,TimeEnd)
//                 }
//                 }
//             )
//         }
//     )

// }


// function playChords() {
//     //play new chord
//     if (playNextChord == true) {
//         playNextChord = false;
//         chord = teoria.chord(vivaldiWinterLargo[currentChord].chord).simple();
//         chord.forEach((note) => {
//             note = teoriaNoteToWadNote(note);
//             piano.play({ pitch: note, volume: 0.5, });
//         });
//     }
//     //repeat previous chord
//     if (repeatChord < 0) {
//         repeatChord = 1;
//         chord = teoria.chord(vivaldiWinterLargo[currentChord].chord).simple();
//         chord.forEach((note) => {
//             note = teoriaNoteToWadNote(note);
//             piano.play({ pitch: note, volume: 0.5, });
//         });
//     }
//     //time interval until chord is repeated
//     repeatChord -= .07;

//     //check if it's time to change to the next chord
//     vivaldiWinterLargo[currentChord].beats -= .02;
//     if (vivaldiWinterLargo[currentChord].beats < 0) {
//         currentChord += 1;
//         playNextChord = true;
//     }
// }


// function selectNoteNumber() {
//     console.log(Math.round((mouseY / 20) % 7));
//     return Math.round((mouseY / 20) % 3);
// }