ig.module(
    'game.entities.man'
)
.requires(
    'impact.entity'

)
.defines(function() {

EMan = ig.Entity.extend({
    size: {x:16, y:16},
    selected: false,
    animSheet: new ig.AnimationSheet('/media/man.png', 16, 16),
    init: function(x, y, settings){
        this.addAnim('idle', 1, [0]);
        this.parent( x, y, settings);
    }
});

});