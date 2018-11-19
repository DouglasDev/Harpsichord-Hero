let timer = {
	
	start: function(BPM){
		this.beatInMilliSec=(60/(BPM*2))*1000;
		this.date = new Date();
		this.startTime= this.date.getTime();
	},

	getCurrentTime: function(){
		this.date = new Date();
		return this.date.getTime()-this.startTime;
	},

	getCurrentBeat: function(){
		return this.getCurrentTime()/this.beatInMilliSec-1;
	}
}