ig.module(
    'game.entities.man'
)
.requires(
    'impact.entity'

)
.defines(function() {

EntityGrass = ig.Entity.extend({
    size: {x:32, y:32},
    animSheet: new ig.AnimationSheet('/media/man.png', 16, 16),
    init: function(x, y, settings){
        this.parent( x, y, settings);

        this.addAnim('idle', 1, [0])
    }
});

});