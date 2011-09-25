/**
 * Class Obstacle
 */

var OBSTACLE_IDLE = 0;

Obstacle.prototype = new Object2D();

function Obstacle(x,y,speed) {
  Object2D.call(this,x,y,80,80);
  this.collideWithCanvas = false;
  this.state = OBSTACLE_IDLE;
  this.ethon = Ethon.getInstance();

  this.sprites = new Array();
  this.sprites[OBSTACLE_IDLE] = new Sprite('obstacle',this.w,this.h,0,0,1,0);

  this.vel = new Vector2D(0,speed);

  this.draw = function() {
    this.sprites[this.state].draw(this.pos);
  };

  this.udpate = function(dt) {
    this.sprites[this.state].update(dt);
    Obstacle.prototype.update.call(this,dt);
    return this.pos.y > this.ethon.render_manager.canvas_height;
  };

  this.hit = function(player) {
    player.hurt();
  }
};
