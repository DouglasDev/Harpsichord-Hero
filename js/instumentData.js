let noteLengths={};
let rhythmObject={};

function setNoteLengths(BPM) {
    noteLengths.quarter=(60/BPM)/2;
    noteLengths.dottedQuarter=noteLengths.quarter*1.5;
    noteLengths.quarterTriplet=noteLengths.quarter*2/3;
    noteLengths.eighth=noteLengths.quarter/2;
    noteLengths.dottedEighth=noteLengths.eighth*1.5;
    noteLengths.eighthTriplet=noteLengths.eighth*2/3;
    noteLengths.sixteenth=noteLengths.eighth/2;

    rhythmObject={
        'z':['eighth'],
        'x':['eighth','eighth','quarter'],
        'c':['quarter','eighth','eighth','quarter','quarter'],
        'v':['eighthTriplet'],
        'b':['quarter','eighth'],
        'n':['quarterTriplet','eighthTriplet'],
        'm':['sixteenth'],        
    };
}
let motifObject={}
//new motif object - all motifs are Bach quotations
function generateMotifObject(){
    motifObject={
    //top row - motifs
    'q':[ { presetRhythm:true, interval:1,chordTone:true,offsetFutureNotes:true},
          { interval:2},
          { interval:3,chordTone:true,},
          { interval:1,chordTone:true},
          { interval:2, silent:true}],

    'w':[ { presetRhythm:true, interval:1}, 
        { interval:2, chordTone:true,offsetFutureNotes:true},
        { interval:3},
        { interval:4},
        { interval:2, silent:true}],    
    'e':convertTime([ { presetRhythm:true, interval:1}, 
                      {  interval:2,chordTone:true,offsetFutureNotes:true},
                      {  interval:2},
                      {  interval:3},
                      {  interval:3, silent:true}]),
    'r':convertTime([ { type: 'eighthTriplet', interval:1,chordTone:true,offsetFutureNotes:true},
                      { type: 'eighthTriplet',interval:2},
                      { type: 'eighthTriplet',interval:3,chordTone:true},
                      { type: 'quarter',interval:3,chordTone:true}]),
    't':[ { presetRhythm:true, interval:1,chordTone:true,offsetFutureNotes:true }, 
        { interval:-3,descend:true,chordTone:true},
        { interval:1},
        { interval:2},
        { interval:2,silent:true}],   
    'y':[ {presetRhythm:true, interval:1,chordTone:true,offsetFutureNotes:true }, 
        { interval:-2},
        { interval:2},
        { interval:1},
        { interval:2,silent:true,}],  
    'u':[ {presetRhythm:true, interval:1,chordTone:true,offsetFutureNotes:true }, 
        { interval:2},
        { interval:3},
        { interval:4},
        { interval:5,chordTone:true,},
        { interval:3,chordTone:true},
        { interval:1,chordTone:true},
        { interval:-3,chordTone:true,descend:true},
        { interval:-2,chordTone:true,descend:true, silent:true}],    

    //'i'
    //'o'
    //'p'

    'g':[ {presetRhythm:true, interval:1,chordTone:true,offsetFutureNotes:true }, 
        { interval:-2},
        { interval:1,chordTone:true,offsetFutureNotes:true},
        { interval:-3,chordTone:true,descend:true,offsetFutureNotes:true},
        { interval:1,chordTone:true,offsetFutureNotes:true, undoOffset:true},
        { interval:-3,chordTone:true,descend:true,offsetFutureNotes:true,silent:true},
        { interval:-4,chordTone:true,descend:true,},
        { interval:1,chordTone:true,offsetFutureNotes:true},
        { interval:-3},
        { interval:1,chordTone:true,offsetFutureNotes:true},
        { interval:-2},
        { interval:1,chordTone:true,offsetFutureNotes:true}],    
    'h':[ {presetRhythm:true, interval:1,chordTone:true,offsetFutureNotes:true }, 
        { interval:-4,chordTone:true,descend:true,},
        { interval:1,chordTone:true,offsetFutureNotes:true,undoOffset:true},
        { interval:3,chordTone:true},
        { interval:2},
        { interval:-4,chordTone:true,descend:true,},
        { interval:2},
        { interval:4,chordTone:true},
        { interval:2,silent:true}
        ],    
    'j':convertTime([{type: 'eighthTriplet',presetTempo:true, interval:1,chordTone:true,offsetFutureNotes:true }, 
        { type: 'eighthTriplet',interval:2,chromatic:true},
        { type: 'eighthTriplet',interval:3,chromatic:true},
        { type: 'eighthTriplet',interval:4,chromatic:true},
        { type: 'eighthTriplet',interval:4,chordTone:true},
        { type: 'eighthTriplet',interval:1,chordTone:true}]),    
    
    //'k'
    //'l'



    //middle row - ornaments
    'a':convertTime([ { type: 'eighthTriplet',silent:true, interval:1,chordTone:true,offsetFutureNotes:true, presetTempo:true}, 
                      { type: 'eighthTriplet', interval:2},
                      { type: 'eighth', interval:1}]),    
    's':convertTime([ { type: 'eighthTriplet', interval:1,chordTone:true,offsetFutureNotes:true, presetTempo:true}, 
                      { type: 'eighthTriplet', interval:2},
                      { type: 'eighthTriplet', interval:1},
                      { type: 'eighthTriplet', interval:-2},
                      { type: 'eighthTriplet', interval:1}]),
    'd':convertTime([ { type: 'sixteenth', interval:1,chordTone:true,offsetFutureNotes:true, presetTempo:true}, 
                      { type: 'sixteenth', interval:-2},
                      { type: 'eighth', interval:1}]),
    'f':convertTime([{type: 'eighth', interval:1,chordTone:true,offsetFutureNotes:true,silent:true, presetTempo:true},  
                     {type: 'eighth', interval:2}, 
                      {type: 'eighthTriplet', interval:1}, 
                      {type: 'eighthTriplet', interval:2},
                      {type: 'eighthTriplet', interval:1},
                      {type: 'sixteenth', interval:2},
                      {type: 'sixteenth', interval:1}]),
    
    }
}
//converts from note length time to time from the beginning of the sequence
function convertTime(arr){
	let accumulator=0;

	arr.forEach(el=>{
		let noteLength=el.type;
		el.time=accumulator;
		accumulator+=noteLengths[noteLength];
	});
	return arr;
}

function getPitchEnharmonic(pitch){
    let enharmonic=getEnharmonic(pitch)
    if (enharmonic){
        let letterName = enharmonic[0];
        let accidental='';
        if (enharmonic.length>1) accidental=enharmonic[1];
        let octave = pitch[pitch.length-1];
        return letterName.toUpperCase()+accidental+octave;
    }
    return pitch;
}



var allNotes = [{ pitch: 'B5', note: 'b' },
    { pitch: 'Bb5', note: 'bb' },
    { pitch: 'A5', note: 'a' },
    { pitch: 'Ab5', note: 'ab' },
    { pitch: 'G5', note: 'g' },
    { pitch: 'Gb5', note: 'gb' },
    { pitch: 'F5', note: 'f' },
    { pitch: 'E5', note: 'e' },
    { pitch: 'Eb5', note: 'eb' },
    { pitch: 'D5', note: 'd' },
    { pitch: 'Db5', note: 'db' },
    { pitch: 'C5', note: 'c' },
    { pitch: 'B4', note: 'b' },
    { pitch: 'Bb4', note: 'bb' },
    { pitch: 'A4', note: 'a' },
    { pitch: 'Ab4', note: 'ab' },
    { pitch: 'G4', note: 'g' },
    { pitch: 'Gb4', note: 'gb' },
    { pitch: 'F4', note: 'f' },
    { pitch: 'E4', note: 'e' },
    { pitch: 'Eb4', note: 'eb' },
    { pitch: 'D4', note: 'd' },
    { pitch: 'Db4', note: 'db' },
    { pitch: 'C4', note: 'c' },
    { pitch: 'B3', note: 'b' },
    { pitch: 'Bb3', note: 'bb' },
    { pitch: 'A3', note: 'a' },
    { pitch: 'Ab3', note: 'ab' },
    { pitch: 'G3', note: 'g' },
    { pitch: 'Gb3', note: 'gb' },
    { pitch: 'F3', note: 'f' },
    { pitch: 'E3', note: 'e' },
    { pitch: 'Eb3', note: 'eb' },
    { pitch: 'D3', note: 'd' },
    { pitch: 'Db3', note: 'db' },
    { pitch: 'C3', note: 'c' },
    { pitch: 'B2', note: 'b' },
    { pitch: 'Bb2', note: 'bb' },
    { pitch: 'A2', note: 'a' },
    { pitch: 'Ab2', note: 'ab' },
    { pitch: 'G2', note: 'g' },
    { pitch: 'Gb2', note: 'gb' },
    { pitch: 'F2', note: 'f' },
    { pitch: 'E2', note: 'e' },
    { pitch: 'Eb2', note: 'eb' },
    { pitch: 'D2', note: 'd' },
    { pitch: 'Db2', note: 'db' },
    { pitch: 'C2', note: 'c' },
];

function prepareAllNotesEnharmonics(){
    allNotes.forEach(note=>{
        let enharmonic=getEnharmonic(note.pitch)
        if (enharmonic.length){
            note.enharmonic=enharmonic
            let letterName = note.enharmonic[0];
            let accidental='';
            if (enharmonic.length>1) accidental=note.enharmonic[1];
            let octave = note.pitch[note.pitch.length-1];
            note.enharmonicPitch=letterName.toUpperCase()+accidental+octave;
        }
    })
}

prepareAllNotesEnharmonics();