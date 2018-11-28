var vivaldiWinterLargo = [
{ chord: 'EbM', beats: 4, keySig:['eb', 'major'] }, { chord: 'BbM', beats: 4 },
{ chord: 'Bb7', beats: 4 }, { chord: 'EbM', beats: 4 },
{ chord: 'BbM', beats: 4 }, { chord: 'Cm7', beats: 2 },{ chord: 'AbM', beats: 2 },
{ chord: 'Bb7', beats: 4 }, { chord: 'AbM', beats: 2 }, { chord: 'F7', beats: 2 }, 
{ chord: 'BbM', beats: 8 }, { chord: 'EbM', beats: 6 },{ chord: 'FM', beats: 2 },
{ chord: 'BbM', beats: 4, keySig: ['Bb', 'major']},{ chord: 'FM', beats: 8 },{ chord: 'BbM', beats: 8 },
{ chord: 'FM', beats: 4 },{ chord: 'F7', beats: 4 },{ chord: 'BbM', beats: 8 },
{ chord: 'EbM', beats: 4, keySig:['eb', 'major'] },{ chord: 'AbM', beats: 4 },{ chord: 'BbM', beats: 4 },
{ chord: 'Cm', beats: 4 },{ chord: 'BbM', beats: 14 },
{ chord: 'EbM', beats: 2 },{ chord: 'BbM', beats: 4 },{ chord: 'EbM', beats: 2 },{ chord: 'BbM', beats: 2 },
{ chord: 'EbM', beats: 20 }
];

var vivaldiLaFollia =[
{ chord: 'Dm', beats: 6, keySig:['d', 'minor'], repeats:15 }, { chord: 'A7', beats: 6 },
{ chord: 'Dm', beats: 6 },{ chord: 'C', beats: 6 },{ chord: 'F', beats: 6 },
{ chord: 'C', beats: 6 },{ chord: 'Dm', beats: 6 },{ chord: 'A7', beats: 6 },
{ chord: 'Dm', beats: 6}, { chord: 'A7', beats: 6 },{ chord: 'Dm', beats: 6 },
{ chord: 'C', beats: 6 },{ chord: 'F', beats: 6 },{ chord: 'C', beats: 6 },
{ chord: 'Dm', beats: 2 },{ chord: 'A7', beats: 4 },{ chord: 'Dm', beats: 6},
];



function prepareRepeatedChordArray(arr){
    let repeats=arr[0].repeats;       
    let newArray=[];
    for (let i=0;i<repeats;i++){
        arr.forEach(el=>{
            newArray.push({chord:el.chord,beats:el.beats,keySig:el.keySig});
        });
    }
    return newArray;
}