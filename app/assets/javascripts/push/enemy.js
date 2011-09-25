
/**
  Class Player
*/

var ENEMY_IDLE = 0;
var ENEMY_HURT = 1;

Enemy.prototype = new Object2D();

function Enemy(x,y,spike,speed) {
  this.state = ENEMY_IDLE;
  this.ethon = Ethon.getInstance();

  this.sprites = new Array();

  this.spike = spike;

  this.hurt_counter = 0;
  this.hurt_time = 50;

  if(spike) {
    Object2D.call(this,x,y, 28, 32);
    this.sprites[ENEMY_IDLE] = new Sprite('enemy_spike',this.w,this.h,0,0,4,2);
    this.sprites[ENEMY_HURT] = new Sprite('enemy_spike',this.w,this.h,0,0,4,2);
  }
  else {
    Object2D.call(this,x,y, 32, 32);
    this.sprites[ENEMY_IDLE] = new Sprite('enemy',this.w,this.h,0,0,4,2);
    this.sprites[ENEMY_HURT] = new Sprite('enemy',this.w,this.h,0,0,4,2);
  }

  this.collideWithCanvas = false;
  this.vel = new Vector2D(0,speed);

  this.draw = function() {
    this.sprites[this.state].draw(this.pos);
  };

  this.update = function(dt) {
    this.sprites[this.state].update(dt);
    Enemy.prototype.update.call(this,dt);

    if(this.state == ENEMY_IDLE) {
      return this.pos.y > this.ethon.render_manager.canvas_height;
    }
    else {
      return this.pos.y+this.h < 0;
    }
  };

  this.hurt = function() {
    if(this.state === ENEMY_IDLE) {
      if(this.spike) {
        this.ethon.player.hurt();
      }
      else {
        this.ethon.score += 10;
        this.ethon.time += 2;
      }
      this.vel = new Vector2D(rand(-15,15),-10);
      this.state = ENEMY_HURT;
    }
  }
};
