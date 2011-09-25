
/**
  Class Player
*/

var PLAYER_IDLE = 0;
var PLAYER_HURT = 1;

Player.prototype = new Object2D();

function Player(x,y) {
  Object2D.call(this,x,y,46,66);

  this.initPos = new Vector2D(x,y);

  this.ethon = Ethon.getInstance();
  this.state = PLAYER_IDLE;
  this.health = 3;
  this.max_health = 3;

  this.sprites = new Array();
  this.sprites[PLAYER_IDLE] = new Sprite('player',this.w,this.h,0,0,4,0.2);
  this.sprites[PLAYER_HURT] = new Sprite('player_hurt',63,64,0,0,4,0.2);

  this.max_speed = 20;

  this.hurt_counter = 0;
  this.hurt_time = 50;

  this.draw = function() {
    // Draw player
    if(this.state === PLAYER_IDLE || (this.state === PLAYER_HURT && (Math.round(this.hurt_counter) % 2  === 0))) {
      this.sprites[this.state].draw(this.pos);
    }

    for(var i = 0; i < this.max_health; i++) {
      this.ethon.render_manager.basicShape(CIRCLE_EMPTY,new Vector2D(570+i*25,620), 10,10, 10);
    }

    for(var i = 0; i < this.health; i++) {
      this.ethon.render_manager.basicShape(CIRCLE,new Vector2D(570+i*25,620), 10,10, 10, '#ff0000');
    }
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
      this.vel.multScalar(0.7);
    }

    // Check if player get damage
    if(this.state === PLAYER_HURT) {
      this.hurt_counter += 1;

      if(this.hurt_counter > this.hurt_time) {
        this.state = PLAYER_IDLE;
      }
    }

    Player.prototype.update.call(this,dt);
  };

  this.hurt = function() {
    if(this.state === PLAYER_IDLE) {
      this.health -= 1;
      this.state = PLAYER_HURT;
      this.hurt_counter = 0;
      this.ethon.score -= 10;
      this.ethon.time -= 5;
      this.pos.y += 25;
    }
  }

  this.respawn = function() {
    this.health = this.max_health;
    this.pos.x = this.initPos.x;
    this.pos.y = this.initPos.y;
    this.state = PLAYER_IDLE;
    this.hurt_counter = 0;
  }
};
