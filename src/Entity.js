var Pixi = require('pixi.js'), Const = require('./Const.js');

function Entity(){
	this.container = new Pixi.Container();
	this.sprite = new Pixi.Sprite();
	this.container.addChild(this.sprite);
	this.tile = null;
	this.type = Const.tex.none;
	this.position = new Pixi.Point(-1, -1);
}

Entity.prototype.setType = function(type, textures){
	this.type = type;
	this.sprite.texture = textures[type];
	return this;
};

Entity.prototype.moveTo = function(x, y, game){
	this.position.set(x, y);
	this.container.position.copy(game.getTile(x, y).container.position);
	return this;
};

module.exports = Entity;