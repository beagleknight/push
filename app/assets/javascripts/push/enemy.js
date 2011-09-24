
/**
  Class Player
*/

var ENEMY_IDLE = 0;

Enemy.prototype = new Object2D();

function Enemy(x,y,spike) {
  Object2D.call(this,x,y, 75.1, 93);
  this.ethon = Ethon.getInstance();
  this.collideWithCanvas = false;

  this.ethon = Ethon.getInstance();
  this.state = ENEMY_IDLE;

  this.sprites = new Array();

  this.spike = spike;

  if(spike) {
    this.sprites[ENEMY_IDLE] = new Sprite('enemy_spike',this.w,this.h,0,0,2,2);
  }
  else {
    this.sprites[ENEMY_IDLE] = new Sprite('enemy',this.w,this.h,0,0,2,2);
  }

  this.vel = new Vector2D(0,5);

  this.draw = function() {
    this.sprites[this.state].draw(this.pos);
    Enemy.prototype.draw.call(this);
  };

  this.update = function(dt) {
    this.sprites[this.state].update(dt);
    Enemy.prototype.update.call(this,dt);
    return this.pos.y > this.ethon.render_manager.canvas_height;
  };
};
