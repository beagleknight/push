
/**
  Class Player
*/

var PLAYER_IDLE = 0;

Player.prototype = new Object2D();

function Player(x,y) {
  Object2D.call(this,x,y,96,136);
  this.drawBB = true;

  this.ethon = Ethon.getInstance();
  this.state = PLAYER_IDLE;
  this.health = 3;
  this.max_health = 3;

  this.sprites = new Array();
  this.sprites[PLAYER_IDLE] = new Sprite('player',this.w,this.h,0,0,2,2);

  this.max_speed = 20;

  this.draw = function() {
    // Draw player
    this.sprites[this.state].draw(this.pos);
    Player.prototype.draw.call(this);

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
      //this.vel.multScalar(0.8);
      this.vel.multScalar(0.7);
    }

    Player.prototype.update.call(this,dt);
  };
};
