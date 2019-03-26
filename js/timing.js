window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

let timer = {
	
	start: function(BPM){
		this.beatInMilliSec=(60/(BPM*2))*1000;
		let date = new Date();
		this.startTime= date.getTime();
	},

	getCurrentTime: function(){
		let date = new Date();
		return date.getTime()-this.startTime;
	},

	getCurrentBeat: function(){
		return this.getCurrentTime()/this.beatInMilliSec-1;
	}
}