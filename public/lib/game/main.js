ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.man'
)
.defines(function(){

var bg;

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		var data = [
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1]
		];
		bg = new ig.BackgroundMap( 64, data, 'media/grass.png' );
		bg.zIndex = -1;
		for(var i = 0; i < 10; i++) {
			ig.game.spawnEntity(EMan, 10*(10%i), 10*i, { vel: {x: 1, y: 0}});
		}
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
			
		this.font.draw( 'Hello World', x, y, ig.Font.ALIGN.CENTER );
		bg.draw(0,0);
		for( var i = 0; i < this.entities.length; i++ ) {
			this.entities[i].draw();
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 144, 640, 448, 2);

});
