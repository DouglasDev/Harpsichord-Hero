let offset=300;

function drawBar(startingBeat, duration, pitch, color){
    let beatNow=timer.getCurrentBeat();
    canvasContent.fillStyle = color;    
    canvasContent.fillRect(canvasWidth+((startingBeat-beatNow)*75-offset), pitchToYPosition(pitch), (canvasWidth/8)*duration, 10);
}


function drawNoteSymbol(x,y,color,type){
//    console.log(type)

    canvasContent.fillStyle = color;
    canvasContent.strokeStyle = color; 
//maybe shift left by 5px???? - could be causing delay
    //draw circle
    canvasContent.beginPath();
    canvasContent.arc(x+305, y+6, 5, 0, 2 * Math.PI, false);
    if (type!="half") canvasContent.fill();
    canvasContent.stroke();

    //draw lines
    canvasContent.beginPath();
    canvasContent.moveTo(x+310, y+6);
    canvasContent.lineTo(x+310, y-20);

    if (type=="eighth" || type=="dottedEighth" || type=="eighthTriplet"){    
        canvasContent.moveTo(x+310, y-20);
        canvasContent.lineTo(x+318, y-8);
    }
    if (type=="sixteenth" ){
        canvasContent.moveTo(x+310, y-20);
        canvasContent.lineTo(x+318, y-8);
        canvasContent.moveTo(x+310, y-14);
        canvasContent.lineTo(x+318, y-2);
   
    }
    if (type=='dottedEighth' || type=='dottedQuarter'){
        canvasContent.fillRect(x+314,y+3,4,4); 
    }

    canvasContent.stroke();
}

function drawNote(beat, pitch, type){
    if (type==undefined) type='quarter';
    let y= pitchToYPosition(pitch);
    let beatNow=timer.getCurrentBeat();
    let x =canvasWidth+((beat-beatNow)*75-offset*2)

    if (x<0){
        drawNoteSymbol(x,y,'black',type)
    }
    else{
        drawNoteSymbol(x,y,'grey',type)
    }
}

function pitchToYPosition(pitch){
    let pitchIndex;
    allNotes.forEach((el,index)=>{
        if (el.pitch==pitch || el.enharmonicPitch==pitch){
            pitchIndex=index;
        }
    });
    //console.log(rect.top)
    return pitchIndex*lineWidth/2;
}

function startViewLoop(frameRate){
    setInterval(() => {
        if (cursorControl==true) findClosestAllowedMouseY(storedMouseY);
        //clear canvas
        canvasContent.clearRect(0, 0, canvasSelector.width, canvasSelector.height);
        //draw chords
        Chords.printChords();
        //draw notes
        drawNotes();
        //draw note at cursor position
        let cursorPos= pitchToYPosition(allNotes[currentNoteIndex].pitch)
        drawNoteSymbol(0,cursorPos,'white');

    }, 1000/frameRate);
}