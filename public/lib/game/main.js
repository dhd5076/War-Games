var bg;
var socket;
var myID;
var gameInstance;
var entitySelected;

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.man'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: null,
	
	init: function() {
		ig.input.initMouse();
		gameInstance = this;
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
		bg.foreground = false;
		
		socket = io();
		Requests = { QueryString : function(item){
			var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
			return svalue ? svalue[1] : svalue;}}

			var gameID = Requests.QueryString("gameID");
			socket.emit('joinGame', {gameID});
			socket.on('joinAccepted', function(data){
				console.log("The server accepted our join");
				myID = data;
				console.log("Switching to game channel " + gameID + " with ID: " + myID);
				socket.emit('updatePlayers', "SNDINF");
				for(var i = 0; i < 12; i++) {
					ig.game.spawnEntity(EMan, Math.random() * 640, Math.random() * 480, {ENTid: i, OWNER: myID});
					socket.emit('updatePlayers', "ENTUPT:" + gameInstance.entities[i].OWNER + ":" + gameInstance.entities[i].ENTid + ":" + gameInstance.entities[i].pos.x + ":" + gameInstance.entities[i].pos.y);
				}
			});
			socket.on('Update', function(newInfo){
				console.log("UPDATE" + newInfo);
				if(newInfo=="SNDINF") {
					console.log("Someone wants to know who I am.");
					for(var i = 0; i < gameInstance.entities.length; i++) {
						//UPDATE ALL ABOUT AN ENTITY, "ENTUPT:USERID:ENTN:XPOS:YPOS:-STATE"
						if(gameInstance.entities[i].OWNER != myID) {
							socket.emit('updatePlayers', "ENTUPT:" + gameInstance.entities[i].OWNER + ":" + gameInstance.entities[i].ENTid + ":" + gameInstance.entities[i].pos.x + ":" + gameInstance.entities[i].pos.y);
						}
					}
				}
				if(newInfo.split(':')[0] == "ENTUPT") {
					foundMatch = false;
					for(var i = 0; i < gameInstance.entities.length; i++) {
						if(gameInstance.entities[i].OWNER == newInfo.split(':')[1] && gameInstance.entities[i].ENTid == newInfo.split(':')[2]) {
							console.log("MATCH");
							foundMatch = true;
							gameInstance.entities[i].pos.x = parseInt(newInfo.split(':')[3]);
							gameInstance.entities[i].pos.y = parseInt(newInfo.split(':')[4]);
						}
					}
					if(!foundMatch) {
						console.log("SPAWN");
						ig.game.spawnEntity(EMan, parseInt(newInfo.split(':')[3]), parseInt(newInfo.split(':')[4]), {ENTid: newInfo.split(':')[2], OWNER: newInfo.split(':')[1]});
						console.log(gameInstance.entities[i]);
					}
				}
			});
		},
	
	update: function() {
		for( var i = 0; i < this.entities.length; i++ ) {
			if(Math.abs(this.entities[i].pos.x - ig.input.mouse.x) < 16 && Math.abs(this.entities[i].pos.y - ig.input.mouse.y < 16) && this.entities[i].OWNER == myID) {
				entitySelected = i;
			}
		}
		this.parent();
	},
	
	draw: function() {
		var x = ig.system.width/2,
			y = ig.system.height/2;
		bg.draw(0,0);
		for( var i = 0; i < this.entities.length; i++ ) {
			this.font.draw( 'OWNER:' + this.entities[i].OWNER, this.entities[i].pos.x, this.entities[i].pos.y, ig.Font.ALIGN.CENTER );
			if(this.entities[i].selected) {
				ig.system.context.strokeStyle="#FF0000";
				ig.system.context.lineWidth=5;
				ig.system.context.strokeRect(this.entities[i].pos.x * 2, this.entities[i].pos.y * 2,32,32);
			}
		}
		this.font.draw("OUR ID: " + myID,100, 10, ig.Font.ALIGN.CENTER);
		this.font.draw("MOUSE X: " + ig.input.mouse.x,100, 30, ig.Font.ALIGN.CENTER);
		this.font.draw("MOUSE Y: " + ig.input.mouse.y,100, 40, ig.Font.ALIGN.CENTER);
		this.parent();
	}
});

ig.main( '#canvas', MyGame, 144, 640, 448, 2);

});