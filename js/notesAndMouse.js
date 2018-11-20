//split up into separate functions - variable manipulation in loop, visual notes, play instrument
//should include future notes
function newNote(instrument,currentNote) {
    if (currentNote==undefined){
        //select new note based on y position
        currentNote = allNotes[currentNoteIndex];
    }
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
    scaleArr=Chords.getCurrentChord().scale;
    let allOctaveScale=ScaleInAllOctaves(scaleArr)
    let position= allOctaveScale.indexOf(currentNote.pitch);
    //if it can't find the position, search for enharmonic equivalent
    if (position==-1){
        position= allOctaveScale.indexOf(getPitchEnharmonic(currentNote.pitch));
    }
    motif.forEach((el,index)=>{
         let noteInterval;
         if (motif[index].interval>0){noteInterval=motif[index].interval-1}
         if (motif[index].interval==0 || motif[index].interval==-1){console.log("error: can't set motif interval to 0 or -1")}
         if (motif[index].interval<0){noteInterval=motif[index].interval+1}

         let  type=motif[index].type,
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


const numberKeys={
    '`':'doesn','1':'matter','2':11,'3':10,'4':9,'5':8,'6':7,'7':6,'8':5,'9':4,'0':3,'-':2,'=':1,'[':0,']':-1,'\\':-2
}