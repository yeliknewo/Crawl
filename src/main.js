var Pixi = require('pixi.js'), Key = require('./Key.js'), HubLoad = require('./HubLoad.js'), HubMain = require('./HubMain.js'), HubGame = require('./HubGame.js');

var renderer;
var input;

var stage;
var state;

var hubLoad;
var hubMain;
var hubGame;

var updateDelta;
var lastUpdate;

window.onload = function(){
	renderer = Pixi.autoDetectRenderer(800, 600);
	document.body.appendChild(renderer.view);
	input = new Pixi.interaction.InteractionManager(renderer);
	input.keys = {};
	loader = new Pixi.loaders.Loader('./assets/');
	
	stage = new Pixi.Container();
	state = 'preload';

	hubLoad = new HubLoad(loader);
	hubMain = new HubMain(loader);
	hubGame = new HubGame(loader);
	
	loader.once('complete', function(){
		if(state === 'load'){
			endLoad();
		}
		startMain();
	});
	
	var updatesPerSecond = 40;
	updateDelta = 1000 / updatesPerSecond;
	lastUpdate = 0;
	
	requestAnimationFrame(run);
};

function startLoad(){
	state = 'load';
	stage.addChild(hubLoad.container);
	console.log('Start Load');
}

function endLoad(){
	state = 'none';
	stage.removeChild(hubLoad.container);
	console.log('End Load');
}

function startMain(){
	state = 'main';
	stage.addChild(hubMain.container);
	console.log('Start Main');
}

function endMain(){
	state = 'none';
	stage.removeChild(hubMain.container);
	console.log('End Main');
}

function startGame(){
	state = 'game';
	stage.addChild(hubGame.container);
	console.log('Start Game');
}

function endGame(){
	state = 'none';
	stage.removeChild(hubGame.container);
	console.log('End Game');
}

function run(timestamp){
	requestAnimationFrame(run);
	while(lastUpdate < timestamp){
		lastUpdate += updateDelta;
		update();
	}
	render();
}

function update(){
	switch(state){
		case 'preload':
			if(hubLoad.loaded){
				startLoad();
			}
		break;
		
		case 'load':
			console.log(hubLoad.loadPercent);
		break;
		
		case 'main':
			if(hubMain.toPlay){
				endMain();
				startGame();
			}
		break;
		
		case 'game':
			
		break;
		
		default:
		
	}
}

function render(){
	renderer.render(stage);
}