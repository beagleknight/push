
/**
  Class Player
*/

var PLAYER_IDLE = 0;

Player.prototype = new Object2D();

function Player(x,y) {
  Object2D.call(this,x,y,96,136);

  this.ethon = Ethon.getInstance();
  this.state = PLAYER_IDLE;

  this.sprites = new Array();
  this.sprites[PLAYER_IDLE] = new Sprite('player',this.w,this.h,0,0,2,2);

  this.max_speed = 20;

  this.draw = function() {
    // Draw player
    this.sprites[this.state].draw(this.pos);
  };

  this.update = function(dt) {
    //Animate sprite
    this.sprites[this.state].update(dt);

    if(this.ethon.event_manager.happens('move_left')) {
      this.vel = new Vector2D(-this.max_speed,0);
    }
    else if(this.ethon.event_manager.happens('move_right')) {
      this.vel = new Vector2D(this.max_speed,0);
    }
    if(this.ethon.event_manager.happens('move_up')) {
      this.vel = new Vector2D(0,-this.max_speed);
    }
    else if(this.ethon.event_manager.happens('move_down')) {
      this.vel = new Vector2D(0,this.max_speed);
    }
    else {
      this.vel.multScalar(0.8);
    }

    Player.prototype.update.call(this,dt);
  };
};
