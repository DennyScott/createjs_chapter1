'use strict';

/**
 * @ngdoc function
 * @name simApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the simApp
 */
angular.module('Sim')
.controller('HomeCtrl', function ($scope) {
	var stage;
	var queue;
	
	function init() {
		queue = new createjs.LoadQueue(false);
		queue.installPlugin(createjs.Sound);
		queue.addEventListener("complete", loadComplete);

		queue.loadManifest([
			{
				id: 'butterfly', 
				src:'images/butterfly.png'
			},
			{
				id:"woosh",
				src:'sounds/woosh.mp3'
			},
			{
				id: 'chime',
				src: 'sounds/chime.mp3'
			},
				{
				id:'daisy', 
				src:'images/daisy.png'
		  }

		]);

		console.log('loaded');
	}	

	function loadComplete(event) {
		setupStage();
		buildButterflies();
	}

	function setupStage() {
		stage = new createjs.Stage('myCanvas');
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener('tick', function(event) {
			stage.update();
		});

		console.log('stage setup');
	}

	function buildButterflies() {
		console.log('starting butterflies');
		var img = queue.getResult('butterfly');
		var i, sound, butterfly;
		for( i = 0; i < 3; i++){
			console.log('butterfly image');
			butterfly = new createjs.Bitmap(img);
			butterfly.x = i * 200;
			stage.addChild(butterfly);

			createjs.Tween.get(butterfly).wait(i * 1000)
				.to({y:100}, 1000, createjs.Ease.quadOut)
				.call(butterflyComplete);
			sound = createjs.Sound.play('woosh', createjs.Sound.INTERRUPT_NONE, i * 1000);
		}

		console.log('build butterflies');
	}

	function butterflyComplete() {
		stage.removeChild(this);

		if(!stage.getNumChildren()){
			createjs.Sound.play('chime');
		}

		console.log('butterfly complete');
	}
	
	init();
});
