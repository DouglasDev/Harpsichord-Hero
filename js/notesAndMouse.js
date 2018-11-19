//split up into separate functions - variable manipulation in loop, visual notes, play instrument
//should include future notes
function newNote(instrument) {
    //select new note based on y position
    let currentNote = allNotes[currentNoteIndex];
    
    //play the note
    mouseIsDown = 1;
    //add note to array of visualized notes
    visualNotes.push({
        beat: timer.getCurrentBeat(),
        pitch: currentNote.pitch
    });

    instrument.play(currentNote.pitch, ac.currentTime, { duration: 1.0 });
}


function generateMotifNotes(e,motif){  
// bug: doesn't play until mouse is first clicked
    let currentNote = allNotes[currentNoteIndex];

    let motifOutput=[];
    let specialPitch;

    findClosestAllowedMouseY(e); 
    scaleArr=getCurrentChord().scale;
    let allOctaveScale=ScaleInAllOctaves(scaleArr)
    let position= allOctaveScale.indexOf(currentNote.pitch);
    //if it can't find the position, search for enharmonic equivalent
    if (position==-1){
        //      console.log(scaleArr)
        //      console.log(allOctaveScale)
        //      console.log(currentNote.pitch)
        position= allOctaveScale.indexOf(getPitchEnharmonic(currentNote.pitch));

        if (position==-1){
            specialPitch= currentNote.pitch;
            console.clear();
            console.log(currentNote.pitch)
            console.log(getPitchEnharmonic(currentNote.pitch))
            console.log(Chords.getCurrentChord())

        }
    }
    //(allNotes[e].note == note || getEnharmonic(allNotes[e].note) == note)
    motif.forEach((el,index)=>{
         let noteInterval=motif[index].note,
            type=motif[index].type,
            note,
            time;
         if (doubleSpeed==true) {time=motif[index].time/2;}
            else{time=motif[index].time;}
         if (descend==true) {note=allOctaveScale[position+noteInterval];}
            else{note=allOctaveScale[position-noteInterval];}

        visualNotes.push({
            beat: timer.getCurrentBeat()+time*3,
            pitch: note
        });

         motifOutput[index]={'note': note,'time': time };
     });
    return motifOutput;
}


function endNote() {
    mouseIsDown = 0;
    current  += 1;
}


function drawNotes(){
    visualNotes.forEach(note=>{
        let beatNow=timer.getCurrentBeat();
        let x =canvasWidth+((note.beat-beatNow)*75-offset)

        if (x>0){
            drawNote(note.beat, note.pitch, 'normal');
        }
    });
}

function findClosestAllowedMouseY(e){
    let canvasPosition= canvasSelector.getBoundingClientRect();
    let yOffset=canvasPosition.y+5;

    let chord = Chords.getCurrentChord();
    //console.log(chord)
    let allowedPitches = chord.allPitches;
    storedMouse=e;
    let newMouseY=e.clientY-yOffset;
    for(let i=1; i<allowedPitches.length;i++){
        if(allowedPitches[i].y>newMouseY){
            let upper=allowedPitches[i].y-newMouseY;
            let lower;
            if (newMouseY<=0) {lower=0;}
            else {lower=newMouseY-allowedPitches[i-1].y;}
            upper>lower ? newMouseY = allowedPitches[i-1].y:newMouseY = allowedPitches[i].y;

            mouseY= newMouseY;
             currentNoteIndex = Math.round((mouseY - rect.top) / 10)+8;

            break;
        }   
    }
}