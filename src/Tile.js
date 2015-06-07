var Pixi = require('pixi.js'), Const = require('./Const.js');

function Tile(){
	this.container = new Pixi.Container();
	this.sprite = new Pixi.Sprite();
	this.container.addChild(this.sprite);
	this.type = Const.tex.none;
}

Tile.prototype.setType = function(type, textures){
	this.type = type;
	this.sprite.texture = textures[type];
	return this;
};

module.exports = Tile;