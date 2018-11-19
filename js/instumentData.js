
//length of beat
let quarter=(60/(45*2)),
	eighth=quarter/2,
	sixteenth=eighth/2;

let motifObject={
	//home row - simple patterns
    'a':convertTime([ { time: eighth, note:0}, { time: eighth, note:1},
    				  { time: eighth, note:2},{ time: eighth, note:3}]),//1234
    's':convertTime([ { time: eighth, note:0}, { time: eighth, note:2},{ time: eighth, note:4}]),//135
    'd':convertTime([ { time: sixteenth, note:1}, { time: sixteenth, note:0},{ time: sixteenth, note:1},
          { time: sixteenth, note:0}, { time: sixteenth, note:1},{ time: sixteenth, note:0}]),//trill
    'f':convertTime([ { time: sixteenth, note:0}, { time: sixteenth, note:-1},{ time: eighth, note:0}]),//mordent
    'g':convertTime([ { time: sixteenth, note:0}, { time: sixteenth, note:1},{ time: sixteenth, note:0}
    				, { time: sixteenth, note:-1},{ time: eighth, note:0}]),//mordent

 	//top row - bach
 	'q':convertTime([ { time: sixteenth, note:0}, { time: sixteenth, note:1},{ time: eighth, note:2},
    				  { time: eighth, note:1},{ time: eighth, note:0},{ time: eighth, note:2},{ time: eighth, note:4}]),
 	'w':convertTime([ { time: sixteenth, note:0}, { time: sixteenth, note:1},{ time: sixteenth, note:2},
    				  { time: sixteenth, note:3},{ time: eighth, note:4},{ time: eighth, note:7},
    				  { time: eighth, note:6},{ time: eighth, note:4},{ time: eighth, note:1},{ time: eighth, note:3}]),
 	'e':convertTime([ { time: quarter, note:0}, { time: eighth, note:3},{ time: eighth, note:1},
    				  { time: eighth, note:-1},{ time: eighth, note:-2},{ time: eighth, note:-3},{ time: eighth, note:-2},
    				  { time: quarter, note:-3}]),
	'r':convertTime([ { time: eighth, note:2}, { time: eighth, note:0},{ time: eighth, note:-3},
    				  { time: eighth, note:-4},{ time: eighth, note:-1},{ time: eighth, note:-2},{ time: eighth, note:2},
    				  { time: eighth, note:1},{ time: quarter, note:1}]),

 	//bottom row - vivaldi
	'z':convertTime([ { time: eighth, note:0}, { time: sixteenth, note:4},{ time: sixteenth, note:3},
    				  { time: eighth, note:2},{ time: sixteenth, note:1},{ time: sixteenth, note:0},
    				  { time: eighth, note:1}]),
	'x':convertTime([ { time: sixteenth, note:0}, { time: sixteenth, note:2},{ time: sixteenth, note:4},
    				  { time: sixteenth, note:2},{ time: sixteenth, note:0},{ time: sixteenth, note:2},
    				  { time: sixteenth, note:4},{ time: sixteenth, note:2}]),
	'c':convertTime([ { time: eighth, note:0}, { time: sixteenth, note:4},{ time: sixteenth, note:3},
    				  { time: eighth, note:4},{ time: eighth, note:2},{ time: eighth, note:0},
    				  { time: sixteenth, note:3},{ time: sixteenth, note:2},{ time: eighth, note:3},
    				  { time: eighth, note:1},]),
	'v':convertTime([ { time: sixteenth, note:0}, { time: sixteenth, note:1},{ time: sixteenth, note:2},{ time: sixteenth, note:3},
					  { time: sixteenth, note:4},{ time: sixteenth, note:5},{ time: sixteenth, note:6},{ time: sixteenth, note:7},
					  { time: eighth, note:7},{ time: eighth, note:4},{ time: eighth, note:2},{ time: eighth, note:0}]),

}

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