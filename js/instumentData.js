
//length of beat
let quarter=(60/90)/2,
	eighth=quarter/2,
	sixteenth=eighth/2;

//new motif object - all motifs are Bach quotations
let motifObject={
    'a':convertTime([ { time: eighth, interval:1}, 
                      { time: eighth, interval:2},
                      { time: eighth, interval:3, type:'chordTone',offsetFutureNotes:false},
                      { time: eighth, interval:1},
                      { time: eighth, interval:2, type:'silent'}]),
    's':convertTime([ { time: eighth, interval:1}, 
                      { time: eighth, interval:2},
                      { time: eighth, interval:3},
                      { time: eighth, interval:4, type:'chordTone',offsetFutureNotes:false},
                      { time: eighth, interval:2, type:'silent'}]),    
    'd':convertTime([ { time: eighth, interval:1}, 
                      { time: eighth, interval:2,type:'chordTone',offsetFutureNotes:true},
                      { time: eighth, interval:2},
                      { time: eighth, interval:3},
                      { time: eighth, interval:3, type:'silent'}]),    

}


// let motifObject={
//     //home row - simple patterns
//     'a':convertTime([ { time: eighth, interval:1}, { time: eighth, interval:2},
//                       { time: eighth, interval:3, type:'chordTone'},{ time: eighth, interval:4}]),//1234
//     's':convertTime([ { time: eighth, interval:1}, { time: eighth, interval:3, type:'chordTone'},
//                         { time: eighth, interval:5, type:'chordTone'}]),//135
//     'd':convertTime([ { time: sixteenth, interval:2}, { time: sixteenth, interval:1},{ time: sixteenth, interval:2},
//                       { time: sixteenth, interval:1}, { time: sixteenth, interval:2},{ time: sixteenth, interval:1}]),//trill
//     'f':convertTime([ { time: sixteenth, interval:1}, { time: sixteenth, interval:-2},{ time: eighth, interval:1}]),//mordent
//     'g':convertTime([ { time: sixteenth, interval:1}, { time: sixteenth, interval:2},{ time: sixteenth, interval:1}
//                     , { time: sixteenth, interval:-2},{ time: eighth, interval:1}]),//mordent

//     //top row - bach
//     'q':convertTime([ { time: sixteenth, interval:1}, { time: sixteenth, interval:2},{ time: eighth, interval:3, type:'chordTone'},
//                       { time: eighth, interval:2},{ time: eighth, interval:1},{ time: eighth, interval:3, type:'chordTone'},
//                       { time: eighth, interval:5, type:'chordTone'}]),
//     'w':convertTime([ { time: sixteenth, interval:1}, { time: sixteenth, interval:2},{ time: sixteenth, interval:3},
//                       { time: sixteenth, interval:4},{ time: eighth, interval:5},{ time: eighth, interval:8},
//                       { time: eighth, interval:7},{ time: eighth, interval:5, type:'chordTone'},
//                       { time: eighth, interval:2},{ time: eighth, interval:3, type:'chordTone'}]),
//     'e':convertTime([ { time: quarter, interval:1}, { time: eighth, interval:4},{ time: eighth, interval:2},
//                       { time: eighth, interval:-2},{ time: eighth, interval:-3},{ time: eighth, interval:-4, type:'chordTone'},
//                       { time: eighth, interval:-3},{ time: quarter, interval:-4}]),
//     'r':convertTime([ { time: eighth, interval:3, type:'chordTone'}, { time: eighth, interval:1},{ time: eighth, interval:-4, type:'chordTone'},
//                       { time: eighth, interval:-5},{ time: eighth, interval:-2},{ time: eighth, interval:-3},
//                       { time: eighth, interval:3, type:'chordTone'},{ time: eighth, interval:2},{ time: quarter, interval:2}]),

//     //bottom row - vivaldi
//     'z':convertTime([ { time: eighth, interval:1}, { time: sixteenth, interval:5, type:'chordTone'},{ time: sixteenth, interval:4},
//                       { time: eighth, interval:3, type:'chordTone'},{ time: sixteenth, interval:2},
//                       { time: sixteenth, interval:1, type:'chordTone'},{ time: eighth, interval:2}]),
//     'x':convertTime([ { time: sixteenth, interval:1}, { time: sixteenth, interval:3, type:'chordTone'},
//                       { time: sixteenth, interval:5, type:'chordTone'},
//                       { time: sixteenth, interval:3, type:'chordTone'},{ time: sixteenth, interval:1, type:'chordTone'},
//                       { time: sixteenth, interval:3, type:'chordTone'},
//                       { time: sixteenth, interval:5, type:'chordTone'},{ time: sixteenth, interval:3, type:'chordTone'}]),
//     'c':convertTime([ { time: eighth, interval:1}, { time: sixteenth, interval:5, type:'chordTone'},{ time: sixteenth, interval:4},
//                       { time: eighth, interval:5, type:'chordTone'},{ time: eighth, interval:3, type:'chordTone'},
//                       { time: eighth, interval:1, type:'chordTone'},
//                       { time: sixteenth, interval:4},{ time: sixteenth, interval:3, type:'chordTone'},{ time: eighth, interval:4},
//                       { time: eighth, interval:2},]),
//     'v':convertTime([ { time: sixteenth, interval:1}, { time: sixteenth, interval:2},{ time: sixteenth, interval:3},
//                       { time: sixteenth, interval:4},{ time: sixteenth, interval:5},{ time: sixteenth, interval:6},
//                       { time: sixteenth, interval:7},{ time: sixteenth, interval:8},{ time: eighth, interval:8},
//                       { time: eighth, interval:5, type:'chordTone'},{ time: eighth, interval:3, type:'chordTone'},{ time: eighth, interval:1, type:'chordTone'}]),
// }

//converts from note length time to time from the beginning of the sequence
function convertTime(arr){
	let accumulator=0,
		covertedArr=[];
	arr.forEach(el=>{
		let noteLength=el.time;
		el.time=accumulator;
		accumulator+=noteLength;
	})
	return arr
}



function getPitchEnharmonic(pitch){
    let enharmonic=getEnharmonic(pitch)
    //console.log(enharmonic)
    if (enharmonic.length){
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


//console.log(teoria.note(allNotes[1].note).enharmonics(true).toString(true).split('').splice(-3,2).join('') )