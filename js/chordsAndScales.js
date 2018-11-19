
//play notes and calculate positions
function prepareChordTimeAndPitchArray(array){
    let currentTime=0;
    let ChordTimeArray=[];//remove later

    array.forEach((chord,index)=>{
        chord.index=index;
        //calculate time
        chord.startingBeat=currentTime;
        ChordTimeArray.push(currentTime);//remove later
        currentTime+=chord.beats;


        //calculate scale for array
        // let searchChord;
        if (chord.keySig==undefined){
            for (var chordIndex = index ;chordIndex>=0; chordIndex--){
                if (array[chordIndex].keySig!=undefined) {
                    chord.keySig=array[chordIndex].keySig;
                }
            }
        }

     //   if ((chord.scale[2]=='minor')&& 
      //      (teoria.chord(scale).dominant('7').name== || teoria.chord(scale).dominant().name==)

        //if dominant chord in minor key, set the scale to melodic minor
        //teoria.chord(scale).dominant('7')
        //teoria.scale('d','melodicminor').simple();


        //calculate all selectable pitches
        currentChordNotes = teoria.chord(chord.chord).simple();
        chord.chordNotes = currentChordNotes;

        chord.allPitches=[];

        for(let e=0;e<allNotes.length;e++){
            currentChordNotes.forEach((note,index) => {
                if (allNotes[e].note == note || getEnharmonic(allNotes[e].note) == note){
                    //console.log(pitchToYPosition(allNotes[e].pitch))
                    rootNote = (index==0)
                    chord.allPitches.push({'index':e,
                                           'rootNote':rootNote, 
                                           'pitch':allNotes[e].pitch,
                                           'y':pitchToYPosition(allNotes[e].pitch)})
                }
            })
        }
    })

    return  array;
}

function getEnharmonic(note){
   return teoria.note(note).enharmonics(true).toString().split('').splice(-3,2).join('');
}


let Chords = {
    load: function(array){
        this.ChordArray = prepareChordTimeAndPitchArray(songChords);
    },
    printChords: function(){
        let beatNow=timer.getCurrentBeat();

        Chords.ChordArray.forEach((chord,index)=>{


            let chordLeft= 600+((chord.startingBeat-beatNow)*75-300)
            let chordRight= 600+((chord.startingBeat-beatNow)*75-300)+(600/8)*chord.beats
            //check if chord is onscreen
            if((chordRight<600 && chordRight>0) || (chordLeft<600 && chordLeft>0)){
                //console.log(index)
                let current;
                index==this.getCurrentChord().index ? current=true : current=false

                chord.allPitches.forEach(pitchData=>{
                    let color;

                    if (current==true){
                        //test timing
                        // let beatNow=timer.getCurrentBeat();
                        // console.log(600+((chord.startingBeat-beatNow)*75-300))

                        if (pitchData.rootNote==true) {color='goldenrod'}
                        else {color='#C39BD3'}
                    }
                    else{
                        if (pitchData.rootNote==true) {color='#a57d18'}
                        else {color='#8a6c96'}
                    }

                    drawBar(chord.startingBeat,chord.beats,pitchData.pitch,color);
                })
            }
        });       
    },

    //returns array of note names
    getChordAtBeat: function(beat){
        for (var chord = 0 ;chord<this.ChordArray.length; chord++){
            if (this.ChordArray[chord].startingBeat>beat) {
                return this.ChordArray[chord-1];
            }
        }
        return this.ChordArray[this.ChordArray.length-1];
    },
    
    getCurrentChord: function(){
        let currentBeat = timer.getCurrentBeat();
        return this.getChordAtBeat(currentBeat);
    },

    getScaleAtBeat: function(beat){
        let searchChord;
        for (var chord = 0 ;chord<this.ChordArray.length; chord++){
            if (this.ChordArray[chord].startingBeat>beat) {
                searchChord = chord-1;
            }
        }
        if (searchChord==undefined){searchChord = this.ChordArray.length-1}

        for (var chord = searchChord; chord >= 0; chord--){
            if (this.ChordArray[chord].scale!=undefined)
                {return this.ChordArray[chord].scale}
        }
    },

    getCurrentScale: function(){
        return Chords.getScaleAtBeat(timer.getCurrentBeat());
    }
}

function ScaleInAllOctaves(scaleArr){
    allOctaveScale=[]
    allNotes.forEach(e=>{
        if (scaleArr.includes(e.note)) {allOctaveScale.push(e.pitch);}
        else if (scaleArr.includes(getEnharmonic(e.note))) {allOctaveScale.push(e.enharmonicPitch);}
    });
    return allOctaveScale;
}