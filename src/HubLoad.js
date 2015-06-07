var Pixi = require('pixi.js');

function HubLoad(loader){
	this.loaded = false;
	this.loadPercent = 0;
	this.container = new Pixi.Container();
	loader
	.add('loadBack', 'load.png')
	.on('progress', this.onProgress.bind(this))
	.load(this.onLoad.bind(this));
}

HubLoad.prototype.onProgress = function(loader){
	this.loadPercent = loader.progress;
};

HubLoad.prototype.onLoad = function(loader, resources){
	this.loaded = true;
	this.loadPercent = 100;
	this.back = new Pixi.Sprite(resources.loadBack.texture);
	this.container.addChild(this.back);
};

module.exports = HubLoad;