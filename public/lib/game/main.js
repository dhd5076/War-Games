ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.grass'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'Hello World', x, y, ig.Font.ALIGN.CENTER );

		var data = [
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1],
			[1,1,1,1,1,1,1,1,1,1]
		];
		var bg = new ig.BackgroundMap( 32, data, 'media/grass.png' );
		
		// Draw
		bg.draw();
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 144, 320, 224, 4 );

});
