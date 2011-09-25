/**
 * Main Scene
 */

function Main(ethon) {
  this.ethon = Ethon.getInstance();

  this.init = function() {
    this.ethon.texture_manager.add_texture('background','sprites/background.png');
    this.background = new TileMap("background",40,20,32,32,0,5);
    for(var i = 0; i < this.background.rows; i++) {
      for(var j = 0; j < this.background.cols; j++) {
        this.background.map[i][j] = rand(0,7); 
      } 
    }
    this.enemies = new Array();
    this.obstacles = new Array();
    this.ethon.event_manager.register('spawn_enemy', TIMED, 3);
    this.ethon.event_manager.register('spawn_obstacle', TIMED, 2);
  };
  
  this.draw = function() { //render function
    //this.background.draw();
    this.ethon.player.draw();

    // Draw enemies
    for(var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw();
    }

    // Draw obstacles
    for(var i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].draw();
    }

    // Draw gui
    this.ethon.render_manager.basicShape(BOX_FILLED, new Vector2D(500,5), 130, 20,'#000000', '#000000');
    this.ethon.render_manager.drawText(int_to_string(this.ethon.score,6),555,20,'#ffffff');
    this.ethon.render_manager.drawText("Score: ",505,20,'#ffffff');
  };

  this.update = function(dt) { //update function
    this.background.update(dt);
    this.ethon.player.update(dt);

    var remove;
    var collision;

    for(var i = 0; i < this.enemies.length; i++) {
      collision = this.ethon.collision_manager.sprite_collision(this.ethon.player, this.enemies[i]);
      if(this.enemies[i].update(dt) || collision) {
        remove = i;
      }
      if(collision) {
        if(this.enemies[i].spike) {
          this.ethon.player.hurt();
        }
        else {
          this.ethon.score += 10;
        }
      }
    }
    if(remove != null) {
      if(!collision && this.enemies[remove].spike) {
        this.ethon.score += 10;
      }
      this.enemies.splice(remove,1);
    }

    for(var i = 0; i < this.obstacles.length; i++) {
      collision = this.ethon.collision_manager.sprite_collision(this.ethon.player, this.obstacles[i]);
      if(this.obstacles[i].update(dt) || collision) {
        remove = i;
      }
      if(collision) {
        this.obstacles[i].hit(this.ethon.player);
      }
    }
    if(remove != null) {
      this.enemies.splice(remove,1);
    }

    // Spawn enemies
    this.ethon.event_manager.update('spawn_enemy',dt);
    if(this.ethon.event_manager.happens('spawn_enemy')) {
      this.enemies.push(new Enemy(rand(30,600),-200, rand(1,1000)%2 == 0));
    }

    // Spawn obstacles
    this.ethon.event_manager.update('spawn_obstacle',dt);
    if(this.ethon.event_manager.happens('spawn_obstacle')) {
      this.obstacles.push(new Obstacle(rand(30,600),-200));
    }

    // Check pause game condition
    if(this.ethon.event_manager.happens('pause')) {
      this.ethon.scene_manager.set_active('pause');
    }

    // Check game over condition
    if(this.ethon.player.health <= 0) {
      this.ethon.scene_manager.set_active('game_over');
    }
  };
};
