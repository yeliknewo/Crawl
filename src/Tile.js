var Pixi = require('pixi.js');

function Tile(type, textures){
	this.container = new Pixi.Container();
}

module.exports = Tile;