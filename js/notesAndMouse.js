//split up into separate functions - variable manipulation in loop, visual notes, play instrument
//should include future notes
function newNote(instrument, currentNote) {
    if (currentNote == undefined) {
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


function generateMotifNotes(e, motif) {

    let currentNote = allNotes[currentNoteIndex];

    let motifOutput = [];
    let offset = 0

    //findClosestAllowedMouseY(e); 
    scaleArr = Chords.getCurrentChord().scale;
    let allOctaveScale = ScaleInAllOctaves(scaleArr)
    let position = allOctaveScale.indexOf(currentNote.pitch);
    //if it can't find the position, search for enharmonic equivalent
    if (position == -1) {
        position = allOctaveScale.indexOf(getPitchEnharmonic(currentNote.pitch));
    }
    //if not in current scale
    if (position == -1) {
        for (let index = currentNoteIndex; index > 0; index--) {
            if (allOctaveScale.indexOf(allNotes[index].pitch) != -1) {
                position = allOctaveScale.indexOf(allNotes[index].pitch);
                break;
            }
            if (allOctaveScale.indexOf(allNotes[index].pitchEnharmonic) != -1) {
                position = allOctaveScale.indexOf(allNotes[index].pitchEnharmonic);
                break;
            }
        }
    }
    if (motif[0].presetRhythm == true) {
        let timeCounter = 0;
        motif[0].time = 0;
        motif[0].type = currentRhythm[0]
        let rhythmArrayPosition = 0;
        motif.forEach((note, motifNoteIndex) => {
            console.log(currentRhythm[rhythmArrayPosition])

            if (motifNoteIndex > 0 && note.silent!=true) {
                timeCounter += noteLengths[currentRhythm[rhythmArrayPosition]];                
                note.time = timeCounter;
                rhythmArrayPosition = (rhythmArrayPosition+1) % currentRhythm.length;

                note.type = currentRhythm[rhythmArrayPosition]
            }
        });
    }

    motif.forEach((el, index) => {
        if (el.undoOffset == true) offset = 0;
        let localOffset = 0;
        //convert from music notation intervals to array positions intervals
        let noteInterval;
        if (el.interval > 0) { noteInterval = el.interval - 1 }
        if (el.interval == 0 || el.interval == -1) { console.log("error: can't set motif interval to 0 or -1") }
        if (el.interval < 0) { noteInterval = el.interval + 1 }
        //set up variables
        let direction = el.direction,
            note,
            time;
        
        if (motif[0].presetTempo==true) time=el.time*currentBPM/90
        else time = el.time;

        if (el.chromatic == true) {
            let pitch = allOctaveScale[position + localOffset + offset]
            let allPitches = allNotes.map(el => el.pitch);
            let startIndex = allPitches.indexOf(pitch);
            if (startIndex == -1) {
                startIndex = allPitches.indexOf(getPitchEnharmonic(pitch));
            }
            //console.log(startIndex)
            note = allNotes[startIndex + (invert * noteInterval)].pitch;
        } else {
            //get scale and chord for current note of motif
            let currentChord = Chords.getChordAtBeat(timer.getCurrentBeat() + time);
            let currentChordPitches = currentChord.allPitches.map(el => el.pitch);

            scaleArr = currentChord.scale;
            let allOctaveScale = ScaleInAllOctaves(scaleArr);
            let noteIndex = position + (invert * noteInterval) + offset;

            note = allOctaveScale[noteIndex];

            if (currentChordPitches.indexOf(note) == -1 && el.chordTone == true) {

                let upper = findNearestChordPitch(currentChordPitches, note, 'up');
                let lower = findNearestChordPitch(currentChordPitches, note, 'down');

                if (allOctaveScale.indexOf(lower) == -1) {
                    lower = getPitchEnharmonic(lower);
                }
                if (allOctaveScale.indexOf(upper) == -1) {
                    upper = getPitchEnharmonic(upper);
                }
                //if ascending, choose upper, if descending choose lower
                //reverse if descend is set to true
                if (invert == -1) {
                    if (el.descend==true) localOffset -= noteIndex - allOctaveScale.indexOf(lower);
                    else localOffset -= noteIndex - allOctaveScale.indexOf(upper);
                } else {
                    if (el.descend==true) localOffset -= noteIndex - allOctaveScale.indexOf(upper);
                    else localOffset -= noteIndex - allOctaveScale.indexOf(lower);
                }
            }

            //calculate note
            if (descend == true && el.silent == true) {
                note = allOctaveScale[position + (invert * -noteInterval) + localOffset + offset];
            } else {
                note = allOctaveScale[position + (invert * noteInterval) + localOffset + offset];
            }

            if (el.offsetFutureNotes == true) offset += localOffset;
        }
        if (el.silent == true) {
            let allPitches = allNotes.map(el => el.pitch);
            currentNoteIndex = allPitches.indexOf(note)
            if (currentNoteIndex == -1) {
                let allPitches = allNotes.map(el => el.enharmonicPitch);
                currentNoteIndex = allPitches.indexOf(note)
            }
        } 
        else {
            //make sure note isn't out of range of keyboard
            let allPitches = allNotes.map(el => el.pitch);
            let indexCheck = allPitches.indexOf(note)
            if (indexCheck == -1) {
                let allPitches = allNotes.map(el => el.enharmonicPitch);
                indexCheck = allPitches.indexOf(note)
            }
            console.log(indexCheck,note)
            if (indexCheck > -1) {
                visualNotes.push({
                    beat: timer.getCurrentBeat() + time * 3 / 2,
                    pitch: note,
                    type: el.type
                });

                motifOutput[index] = { 'note': note, 'time': time };
            }
        }

    });
    return motifOutput;
}



function findNearestChordPitch(chordPitches, pitch, direction) {
    let allPitches = allNotes.map(el => el.pitch);
    var startIndex = allPitches.indexOf(pitch);
    let enharmonic = false;
    //console.log(chordPitches,pitch)
    if (startIndex == -1) {
        enharmonic = true;
        allPitches = allNotes.map(el => {
            if (el.enharmonic == undefined) return el.pitch;
            return el.enharmonicPitch
        });
        startIndex = allPitches.indexOf(pitch);
        allPitches = allNotes.map(el => el.pitch);
    }
    //console.log(allPitches,startIndex)
    //console.log(allPitches,chordPitches)
    let chordIndex;
    if (direction == "up") {
        for (let index = startIndex; index >= 0; index--) {
            chordIndex = chordPitches.indexOf(allPitches[index]);
            if (chordIndex != -1) {
                return chordPitches[chordIndex];
            }
        }
    }
    if (direction == "down") {
        for (let index = startIndex; index <= allPitches.length; index++) {
            chordIndex = chordPitches.indexOf(allPitches[index]);
            if (chordIndex != -1) {
                return chordPitches[chordIndex];
            }
        }
    }

}

function endNote() {
    mouseIsDown = 0;
    current += 1;
}


function drawNotes() {
    visualNotes.forEach(note => {
        // console.log(note.type)
        let beatNow = timer.getCurrentBeat();
        let x = canvasWidth + ((note.beat - beatNow) * 75 - offset)

        if (x > 0) {
            drawNote(note.beat, note.pitch, note.type);
        }
    });
}

function findClosestAllowedMouseY(mouseY) {

    let canvasPosition = canvasSelector.getBoundingClientRect();
    let yOffset = canvasPosition.y + 5;

    let chord = Chords.getCurrentChord();
    let allowedPitches = chord.allPitches;

    //if (e.type=="mousemove" || e.type=="mousedown" ) 
    storedMouseY = mouseY;

    let newMouseY = mouseY - yOffset;

    for (let i = 1; i < allowedPitches.length; i++) {
        if (allowedPitches[i].y > newMouseY) {
            let upper = allowedPitches[i].y - newMouseY;
            let lower;
            if (newMouseY <= 0) { lower = 0; } else { lower = newMouseY - allowedPitches[i - 1].y; }
            upper > lower ? newMouseY = allowedPitches[i - 1].y : newMouseY = allowedPitches[i].y;

            mouseY = newMouseY;
            currentNoteIndex = Math.round((mouseY - rect.top) / 10) + 8;
            break;
        }
    }
    //if pitch is lower than lowest pitch in chord
    if (allowedPitches[allowedPitches.length - 1].y < newMouseY) {
        mouseY = allowedPitches[allowedPitches.length - 1].y
        currentNoteIndex = Math.round((mouseY - rect.top) / 10) + 8;
    }
}