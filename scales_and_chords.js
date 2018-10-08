var currentScale=['eb', 'major']
var scaleArr = teoria.scale(...currentScale).simple();


var vivaldiWinterLargo = [
{ chord: 'EbM', beats: 4, scale:['eb', 'major'] }, { chord: 'BbM', beats: 8 }, { chord: 'EbM', beats: 4 },
{ chord: 'BbM', beats: 4 }, { chord: 'Cm', beats: 2 },{ chord: 'AbM', beats: 2 },
{ chord: 'BbM', beats: 4 }, { chord: 'AbM', beats: 2 }, { chord: 'FM', beats: 2 }, 
{ chord: 'BbM', beats: 8 }, { chord: 'EbM', beats: 6 },{ chord: 'FM', beats: 2 },
{ chord: 'BbM', beats: 4, scale: ['Bb', 'major']},{ chord: 'FM', beats: 8 },{ chord: 'BbM', beats: 8 },
{ chord: 'FM', beats: 8 },{ chord: 'BbM', beats: 8 },
{ chord: 'EbM', beats: 4, scale:['eb', 'major'] },{ chord: 'AbM', beats: 4 },{ chord: 'BbM', beats: 4 },
{ chord: 'Cm', beats: 4 },{ chord: 'BbM', beats: 14 },
{ chord: 'EbM', beats: 2 },{ chord: 'BbM', beats: 4 },{ chord: 'EbM', beats: 2 },{ chord: 'BbM', beats: 2 },
,{ chord: 'EbM', beats: 20 }
];

//length of beat
let b=(60/(45*2))

let motifObject={
    'a':[ { time: 0, note:0}, { time: 0.5*b, note:1},{ time: 1*b, note:2},{ time: 1.5*b, note:3}],//1234
    's':[ { time: 0, note:3}, { time: 0.5*b, note:2},{ time: 1*b, note:1},{ time: 1.5*b, note:0}],//4321
    'd':[ { time: 0, note:0}, { time: 0.5*b, note:1},{ time: 1*b, note:0}],//121
    'f':[ { time: 0, note:1}, { time: 0.5*b, note:0},{ time: 1*b, note:1}],//212
    'g':[ { time: 0, note:0}, { time: 0.5*b, note:2},{ time: 1*b, note:4}],//135
    'h':[ { time: 0, note:4}, { time: 0.5*b, note:2},{ time: 1*b, note:0}],//531
    'j':[ { time: 0, note:1}, { time: 0.2*b, note:0},{ time: .4*b, note:1},
          { time: 0.6*b, note:0}, { time: 0.8*b, note:1},{ time: 1*b, note:0}],//trill
 
}



var allNotes = [{ octave: 'B5', note: 'b' },
    { octave: 'Bb5', note: 'bb' },
    { octave: 'A5', note: 'a' },
    { octave: 'Ab5', note: 'ab' },
    { octave: 'G5', note: 'g' },
    { octave: 'Gb5', note: 'gb' },
    { octave: 'F5', note: 'f' },
    { octave: 'E5', note: 'e' },
    { octave: 'Eb5', note: 'eb' },
    { octave: 'D5', note: 'd' },
    { octave: 'Db5', note: 'db' },
    { octave: 'C5', note: 'c' },
    { octave: 'B4', note: 'b' },
    { octave: 'Bb4', note: 'bb' },
    { octave: 'A4', note: 'a' },
    { octave: 'Ab4', note: 'ab' },
    { octave: 'G4', note: 'g' },
    { octave: 'Gb4', note: 'gb' },
    { octave: 'F4', note: 'f' },
    { octave: 'E4', note: 'e' },
    { octave: 'Eb4', note: 'eb' },
    { octave: 'D4', note: 'd' },
    { octave: 'Db4', note: 'db' },
    { octave: 'C4', note: 'c' },
    { octave: 'B3', note: 'b' },
    { octave: 'Bb3', note: 'bb' },
    { octave: 'A3', note: 'a' },
    { octave: 'Ab3', note: 'ab' },
    { octave: 'G3', note: 'g' },
    { octave: 'Gb3', note: 'gb' },
    { octave: 'F3', note: 'f' },
    { octave: 'E3', note: 'e' },
    { octave: 'Eb3', note: 'eb' },
    { octave: 'D3', note: 'd' },
    { octave: 'Db3', note: 'db' },
    { octave: 'C3', note: 'c' },
    { octave: 'B2', note: 'b' },
    { octave: 'Bb2', note: 'bb' },
    { octave: 'A2', note: 'a' },
    { octave: 'Ab2', note: 'ab' },
    { octave: 'G2', note: 'g' },
    { octave: 'Gb2', note: 'gb' },
    { octave: 'F2', note: 'f' },
    { octave: 'E2', note: 'e' },
    { octave: 'Eb2', note: 'eb' },
    { octave: 'D2', note: 'd' },
    { octave: 'Db2', note: 'db' },
    { octave: 'C2', note: 'c' },
];