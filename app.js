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



//Setup canvas and global variables
let canvasSelector = document.querySelector("canvas");
let canvasContent = canvasSelector.getContext("2d");
canvasContent.fillStyle = 'red';
var current = 0,
    interval = 3,
    framerate = 30;
//    BPM = 64;

var visualNotes = [],
    mouseY = 0,
    yPos = 0,
    currentNote, mouseIsDown;
var currentChord = 0,
    playNextChord = true,
    repeatChord = 1;


let BPM=45,
    beatInMilliSec=(60/BPM)*1000
    timeSignature=4,
    measure=beatInMilliSec*timeSignature;

console.log(beatInMilliSec)
console.log(measure)

//starts background midi
function start(){
    MIDI.loadPlugin({
        soundfontUrl: "soundfont/",
        onsuccess: function() {
            MIDI.programChange(0, MIDI.GM.byName["string_ensemble_2"].number);
            MIDI.setVolume(0, 10);
            MIDI.Player.BPM = BPM;
            MIDI.Player.loadFile('midi/vivaldi_4_stagioni_inverno_2_(c)pollen.mid', MIDI.Player.start);

    MIDI.Player.addListener(function(data) { // set it to your own function!
        var now = data.now; // where we are now
        var end = data.end; // time when song ends
        var channel = data.channel; // channel note is playing on
        var message = data.message; // 128 is noteOff, 144 is noteOn
        var note = data.note; // the note
        var velocity = data.velocity; // the velocity of the note
        // then do whatever you want with the information!
        console.log(now)
    });

        }
    });
}

//canvasSelector.addEventListener("mousedown", newNote);
canvasSelector.addEventListener("mouseup", endNote);
canvasSelector.addEventListener("mousemove", getMouseY);


//Soundfonts instrument setup
var ac = new AudioContext();

Soundfont.instrument(ac, 'harpsichord')
    .then(function(harpsichord) {
        //event listeners
        document.addEventListener("mousedown", function(e) {
            console.log(e.clientY);
            var rect = canvasSelector.getBoundingClientRect();
            console.log(rect)
            var newMouseY = (Math.round((e.clientY - rect.top) / 10)) * 10 - 5;
            yPos = Math.round((e.clientY - rect.top) / 10);
            currentNote = allNotes[yPos];

            newNote(harpsichord);
        });
    
    });


//loop for updating canvas and 
setInterval(() => {
        //draw staff
        canvasContent.clearRect(0, 0, canvasSelector.width, canvasSelector.height);
        canvasContent.beginPath();

        let lineWidth=20;
        for (let y = 1; y < 480; y += lineWidth) {
            canvasContent.moveTo(0, y);
            canvasContent.lineTo(800, y);
        }
canvasContent.globalAlpha = 1;


        canvasContent.stroke();

        //     playChords();

        //draw note at cursor position
       // 
       // canvasContent.fillRect(300, mouseY, 10, 10);
        //draw circle
        var circle = new Path2D();
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

function teoriaNoteToWadNote(note) {
    console.log(note)
    var arr = note.split('');
    arr[0] = arr[0].toUpperCase();
    arr.push('3');
    return arr.join('');
}


function playChords() {
    //play new chord
    if (playNextChord == true) {
        playNextChord = false;
        chord = teoria.chord(vivaldiWinterLargo[currentChord].chord).simple();
        chord.forEach((note) => {
            note = teoriaNoteToWadNote(note);
            piano.play({ pitch: note, volume: 0.5, });
        });
    }
    //repeat previous chord
    if (repeatChord < 0) {
        repeatChord = 1;
        chord = teoria.chord(vivaldiWinterLargo[currentChord].chord).simple();
        chord.forEach((note) => {
            note = teoriaNoteToWadNote(note);
            piano.play({ pitch: note, volume: 0.5, });
        });
    }
    //time interval until chord is repeated
    repeatChord -= .07;

    //check if it's time to change to the next chord
    vivaldiWinterLargo[currentChord].beats -= .02;
    if (vivaldiWinterLargo[currentChord].beats < 0) {
        currentChord += 1;
        playNextChord = true;
    }
}


function getMouseY(e) {
    //check if y position has changed enough to select different note
    var rect = canvasSelector.getBoundingClientRect();
    var newMouseY = (Math.round((e.clientY - rect.top) / 10)) * 10 - 5;
    yPos = Math.round((e.clientY - rect.top) / 10);
    mouseY = newMouseY;
}

// function selectNoteNumber() {
//     console.log(Math.round((mouseY / 20) % 7));
//     return Math.round((mouseY / 20) % 3);
// }


function newNote(instrument) {
    //select new note based on y position
    currentNote = allNotes[yPos];
    //if note is in scale,
    if (scaleArr.indexOf(currentNote.note) > -1) {
        //play the note
        mouseIsDown = 1;
        visualNotes.push({
            num: current,
            x: 300,
            y: mouseY,
            width: 10
        });

        instrument.play(currentNote.octave, ac.currentTime, { duration: 1.0 });
    }
}

function endNote() {
    mouseIsDown = 0;
    current += 1;
}
