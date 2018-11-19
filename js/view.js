let offset=300;

function drawBar(startingBeat, duration, pitch, color){
    let beatNow=timer.getCurrentBeat();
    canvasContent.fillStyle = color;    
    canvasContent.fillRect(canvasWidth+((startingBeat-beatNow)*75-offset), pitchToYPosition(pitch), (canvasWidth/8)*duration, 10);
}


function drawNoteSymbol(x,y,color){
    canvasContent.fillStyle = color;
    canvasContent.strokeStyle = color; 

    //draw circle
    let circle = new Path2D();
    circle.arc(x+305, y+6, 5, 0, 2 * Math.PI);        
    canvasContent.fill(circle);
    //draw line
    canvasContent.beginPath();
    canvasContent.moveTo(x+309, y+6);
    canvasContent.lineTo(x+309, y-20);

    canvasContent.stroke();
}

function drawNote(beat, pitch, type){

    let y= pitchToYPosition(pitch);
    let beatNow=timer.getCurrentBeat();
    let x =canvasWidth+((beat-beatNow)*75-offset*2)

    if (x<0){
        drawNoteSymbol(x,y,'black')
    }
    else{
        drawNoteSymbol(x,y,'grey')
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
        findClosestAllowedMouseY(storedMouse);
        //clear canvas
        canvasContent.clearRect(0, 0, canvasSelector.width, canvasSelector.height);
        //draw chords
        Chords.printChords();
        //draw notes
        drawNotes();
        //draw note at cursor position
        drawNoteSymbol(0,mouseY,'white');

    }, 1000/frameRate);
}