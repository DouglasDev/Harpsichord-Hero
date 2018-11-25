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
//console.clear()
    let currentNote = allNotes[currentNoteIndex];

    let motifOutput=[];
    let offset=0

    //findClosestAllowedMouseY(e); 
    scaleArr=Chords.getCurrentChord().scale;
    let allOctaveScale=ScaleInAllOctaves(scaleArr)
    let position= allOctaveScale.indexOf(currentNote.pitch);
    //if it can't find the position, search for enharmonic equivalent
    if (position==-1){
        position= allOctaveScale.indexOf(getPitchEnharmonic(currentNote.pitch));
    }
    //if not in current scale
    if (position==-1){
        for (let index=currentNoteIndex;index>0;index--){
            if (allOctaveScale.indexOf(allNotes[index].pitch)!=-1){
                position=allOctaveScale.indexOf(allNotes[index].pitch);
                break;
            }
            if (allOctaveScale.indexOf(allNotes[index].pitchEnharmonic)!=-1){
                position=allOctaveScale.indexOf(allNotes[index].pitchEnharmonic);
                break;
            }
        }
    }

    motif.forEach((el,index)=>{
        let localOffset=0;
        //convert from music notation intervals to array positions intervals
        let noteInterval;
        if (el.interval>0){noteInterval=el.interval-1}
        if (el.interval==0 || el.interval==-1){console.log("error: can't set motif interval to 0 or -1")}
        if (el.interval<0){noteInterval=el.interval+1}
         //set up variables
        let  type=el.type,
            direction=el.direction,
            note,
            time;
        if (doubleSpeed==true) {time=el.time/2;}
        else{time=el.time;}

        //get scale and chord for current note of motif
        let currentChord=Chords.getChordAtBeat(timer.getCurrentBeat()+time);
        let currentChordPitches=currentChord.allPitches.map(el=>el.pitch);

        scaleArr=currentChord.scale;
        let allOctaveScale=ScaleInAllOctaves(scaleArr);
        let noteIndex= position+(invert*noteInterval)+offset;
        
        note=allOctaveScale[noteIndex];

        if (currentChordPitches.indexOf(note)==-1 && type=='chordTone'){
        //console.log(allOctaveScale)        
            let upper= findNearestChordPitch(currentChordPitches, note, 'up');
            let lower= findNearestChordPitch(currentChordPitches, note, 'down');
            
            if (allOctaveScale.indexOf(lower)==-1){
                lower=getPitchEnharmonic(lower);
            }
            if (allOctaveScale.indexOf(upper)==-1){
                upper=getPitchEnharmonic(upper);
            }
            // //console.log(lower,upper)
            //choose closest chord pitch
            // if (teoria.Interval.between(teoria.note(upper), teoria.note(note)).semitones()>
            //     teoria.Interval.between(teoria.note(lower), teoria.note(note)).semitones()){
            //     localOffset-=noteIndex-allOctaveScale.indexOf(lower);
            // }
            // else{
            //     localOffset-=noteIndex-allOctaveScale.indexOf(upper);
            // }
            //if ascending, choose upper, if descending choose lower
            if (invert==-1){
                localOffset-=noteIndex-allOctaveScale.indexOf(upper);
            }
            else{
                localOffset-=noteIndex-allOctaveScale.indexOf(lower);
            }
        }

        //calculate note
        if (descend==true && type=='silent'){
            note=allOctaveScale[position+(invert*-noteInterval)+localOffset+offset];                        
        }
        else{
            note=allOctaveScale[position+(invert*noteInterval)+localOffset+offset];            
        }

        if (el.offsetFutureNotes==true) offset+=localOffset;
    
        if (type=='silent'){
            let allPitches=allNotes.map(el=>el.pitch);
            currentNoteIndex=allPitches.indexOf(note)
            if (currentNoteIndex==-1){
                let allPitches=allNotes.map(el=>el.enharmonicPitch);
                currentNoteIndex=allPitches.indexOf(note)
            }
        }
        else{
            visualNotes.push({
                beat: timer.getCurrentBeat()+time*3,
                pitch: note
            });

            motifOutput[index]={'note': note,'time': time };
        }

     });
    return motifOutput;
}



function findNearestChordPitch(chordPitches,pitch, direction){
    let allPitches=allNotes.map(el=>el.pitch);
    let startIndex=allPitches.indexOf(pitch);
    let enharmonic=false;
    //console.log(chordPitches,pitch)
    if (startIndex==-1){
        enharmonic=true;
        allPitches=allNotes.map(el=>{
            if (el.enharmonic==undefined) return el.pitch
                return el.enharmonicPitch
        });        
        startIndex=allPitches.indexOf(pitch);
        allPitches=allNotes.map(el=>el.pitch);
    }
        //console.log(allPitches,startIndex)
        console.log(allPitches,chordPitches)
    let chordIndex
    if (direction=="up"){
        for (let index=startIndex; index>=0;index--){
            chordIndex = chordPitches.indexOf(allPitches[index])            
            if (chordIndex!=-1) {
                return chordPitches[chordIndex]; 
            }
        }
    }
    if (direction=="down"){
        for (let index=startIndex; index<=allPitches.length;index++){
            chordIndex= chordPitches.indexOf(allPitches[index])
            if (chordIndex!=-1) {
                return chordPitches[chordIndex]; 
            }
         }
    }

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

function findClosestAllowedMouseY(mouseY){

    let canvasPosition= canvasSelector.getBoundingClientRect();
    let yOffset=canvasPosition.y+5;

    let chord = Chords.getCurrentChord();
    let allowedPitches = chord.allPitches;

    //if (e.type=="mousemove" || e.type=="mousedown" ) 
        storedMouseY=mouseY;

    let newMouseY=mouseY-yOffset;

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
    //if pitch is lower than lowest pitch in chord
        if(allowedPitches[allowedPitches.length-1].y<newMouseY){
            mouseY = allowedPitches[allowedPitches.length-1].y
            currentNoteIndex = Math.round((mouseY - rect.top) / 10)+8;
        }
}

