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
var socket;

MyGame = ig.Game.extend({
	
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
		for(var i = 0; i < 6; i++) {
			ig.game.spawnEntity(EMan, 10*(10%i), 10*i, { vel: {x: 0, y: 0}});
		}
		
		socket = io();
		Requests = { QueryString : function(item){
			var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
			return svalue ? svalue[1] : svalue;}}

			var id = Requests.QueryString("gameID");
			socket.emit('joinGame', id);
			socket.on('joinAccepted', function(){
				console.log("The server accepted our join");
				console.log("Switching to game channel " + id + "...");
				socket.on('channelSwitch', function(data) {
					console.log("Joined channel:" + data)
					gatherData();
				});
			});
		},
	
	update: function() {
		this.parent();
	},
	
	draw: function() {
		var x = ig.system.width/2,
			y = ig.system.height/2;
			
		this.font.draw( 'Hello World', x, y, ig.Font.ALIGN.CENTER );
		bg.draw(0,0);
		for( var i = 0; i < this.entities.length; i++ ) {
			this.entities[i].draw();
		}
	}
});

ig.main( '#canvas', MyGame, 144, 640, 448, 2);

});

function gatherData(){
	socket.emit('sendDataPlz', {color: 'RED'})
	socket.on('hereData', function(data){
		console.log('Someone sent us : ' + data);
	});
}
