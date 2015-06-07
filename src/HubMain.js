var Pixi = require('pixi.js');

function HubMain(loader){
	this.loadPercent = 0;
	this.toPlay = false;
	this.container = new Pixi.Container();
	loader
	.add('mainBack', 'main.png')
	.add('mainPlay', 'playbutton.png')
	.on('progress', this.onProgress.bind(this))
	.load(this.onLoad.bind(this));
}

HubMain.prototype.onProgress = function(loader){
	this.loadPercent = loader.progress;
}

HubMain.prototype.onLoad = function(loader, resources){
	this.loadPercent = 100;
	
	this.back = new Pixi.Sprite(resources.mainBack.texture);
	this.container.addChild(this.back);
	
	this.playButton = new Pixi.Sprite(resources.mainPlay.texture);
	this.container.addChild(this.playButton);
	this.playButton.position.set(200, 300);
	this.playButton.interactive = true;
	this.playButton.mousedown = this.playClick.bind(this);
}

HubMain.prototype.playClick = function(){
	this.toPlay = true;
};

module.exports = HubMain;