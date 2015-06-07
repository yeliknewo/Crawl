var Pixi = require('pixi.js'), Entity = require('./Entity.js'), Tile = require('./Tile.js'), Const = require('./Const.js');

function HubGame(loader){
	this.loadPercent = 0;
	this.container = new Pixi.Container();
	this.graphics = new Pixi.Graphics();
	this.textures = {};
	this.tiles = [];
	
	loader
	.add('gameBack', 'game.png')
	.add('gameWall', 'wall.png')
	.add('gamePlayer', 'player.png')
	.on('progress', this.onProgress.bind(this))
	.load(this.onLoad.bind(this));
}

HubGame.prototype.onProgress = function(loader){
	this.loadPercent = loader.progress;
};

HubGame.prototype.onLoad = function(loader, resources){
	this.loadPercent = 100;
	
	this.back = new Pixi.Sprite(resources.gameBack.texture);
	this.container.addChild(this.back);
	
	this
	.addTexture(resources.gameWall.texture, Const.tex.wall)
	.addTexture(resources.gamePlayer.texture, Const.tex.player);
	
	this.setupMap(10, 10);
};

HubGame.prototype.setupMap = function(width, height){
	for(var y = 0;y < height; y++){
		for(var x = 0; x < width; x++){
			var tile = new Tile();
			this.container.addChild(tile.container);
			tiles[y * width + x] = tile;
		}
	}
};

HubGame.prototype.addTexture = function(texture, name){
	this.textures[name] = texture;
	return this;
};

module.exports = HubGame;