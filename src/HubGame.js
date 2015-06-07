var Pixi = require('pixi.js'), Entity = require('./Entity.js'), Tile = require('./Tile.js'), Const = require('./Const.js');

function HubGame(loader){
	this.loadPercent = 0;
	this.container = new Pixi.Container();
	this.graphics = new Pixi.Graphics();
	this.textures = {};
	this.tiles = [];
	this.tileSize = new Pixi.Point(60, 60);
	this.tileScale = new Pixi.Point(1, 1);
	this.gridSize = new Pixi.Point(0, 0);
	this.entities = [];
	this.toMain = false;
	
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
	.addTexture(resources.gamePlayer.texture, Const.tex.player)
	.addTexture(this.drawEmpty(), Const.tex.empty);
	
	this.setupMap(10, 10);
	this.generateMap();
	this.spawnPlayer(1, 1);
};

HubGame.prototype.spawnPlayer = function(x, y){
	this.player = new Entity().setType(Const.tex.player, this.textures).moveTo(x, y, this);
	this.container.addChild(this.player.container);
	this.entities.push(this.player);
};

HubGame.prototype.setupMap = function(width, height){
	var total = width * height;
	this.gridSize.set(width, height);
	for(var i = 0;i < total;i++){
		var tile = new Tile();
		this.container.addChild(tile.container);
		tile.container.position.set((i % width) * this.tileSize.x * this.tileScale.x + 120, Math.floor(i / width) * this.tileSize.y * this.tileScale.y);
		this.tiles[i] = tile;
	}
};

HubGame.prototype.generateMap = function(){
	for(var y = 0;y < this.gridSize.y;y++){
		for(var x = 0;x < this.gridSize.x;x++){
			if(y == 0 || x == 0 || y == this.gridSize.y - 1 || x == this.gridSize.x - 1 || (y == 3 && x > 3) || (y == 7 && x < 8)){
				this.getTile(x, y).setType(Const.tex.wall, this.textures);
			}else{
				this.getTile(x, y).setType(Const.tex.empty, this.textures);
			}
		}
	}
};

HubGame.prototype.getTile = function(x, y){
	return this.tiles[y * this.gridSize.x + x];
};

HubGame.prototype.addTexture = function(texture, name){
	this.textures[name] = texture;
	return this;
};

HubGame.prototype.drawEmpty = function(){
	this.graphics.clear();
	this.graphics.beginFill(0xFFFFFF, 0xFF);
	this.graphics.drawRect(0, 0, this.tileSize.x, this.tileSize.y);
	this.graphics.endFill();
	return this.graphics.generateTexture(1, Pixi.SCALE_MODES.DEFAULT);
};

HubGame.prototype.update = function(input){
	for(var i in this.entities){
		var entity = this.entities[i];
		if(entity.type === Const.tex.none){
			console.log('None Type Entity ' + entity);
		}else if(entity.type === Const.tex.player){
			if(input.keys.left.isDown){
				var x = entity.position.x - 1, y = entity.position.y;
				if(this.getTile(x, y).type === Const.tex.empty){
					entity.moveTo(x, y, this);
				}
			}else if(input.keys.up.isDown){
				var x = entity.position.x, y = entity.position.y - 1;
				if(this.getTile(x, y).type === Const.tex.empty){
					entity.moveTo(x, y, this);
				}
			}else if(input.keys.right.isDown){
				var x = entity.position.x + 1, y = entity.position.y;
				if(this.getTile(x, y).type === Const.tex.empty){
					entity.moveTo(x, y, this);
				}
			}else if(input.keys.down.isDown){
				var x = entity.position.x, y = entity.position.y + 1;
				if(this.getTile(x, y).type === Const.tex.empty){
					entity.moveTo(x, y, this);
				}
			}
		}
	}
};

module.exports = HubGame;