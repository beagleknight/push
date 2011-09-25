/**
 * Main Scene
 */

function Main(ethon) {
  this.ethon = Ethon.getInstance();

  this.init = function() {
    this.ethon.score = 0;
    this.ethon.time = 60;
    this.ethon.player.respawn();

    this.levels = new Array();
    this.levels[0] = { speed: 2, score: 0,   spawn_enemy_time: 5, spawn_obstacle_time: 4   }
    this.levels[1] = { speed: 3, score: 50,  spawn_enemy_time: 4, spawn_obstacle_time: 3   }
    this.levels[2] = { speed: 4, score: 100, spawn_enemy_time: 3, spawn_obstacle_time: 2   }

    this.level = 0;
    
    this.ethon.texture_manager.add_texture('background','sprites/background.png');
    this.background = new TileMap("background",40,20,32,32,0,this.levels[0].speed);
    for(var i = 0; i < this.background.rows; i++) {
      for(var j = 0; j < this.background.cols; j++) {
        this.background.map[i][j] = rand(0,7); 
      } 
    }
    this.enemies = new Array();
    this.obstacles = new Array();

    this.ethon.event_manager.register('spawn_enemy', TIMED, this.levels[0].spawn_enemy_time);
    this.ethon.event_manager.register('spawn_obstacle', TIMED, this.levels[0].spawn_obstacle_time);
    
    // Respawn first enemy and obstacle
    this.enemies.push(new Enemy(rand(30,600),-200, rand(1,1000)%2 == 0, this.levels[this.level].speed));
    this.obstacles.push(new Obstacle(rand(30,600),-200, this.levels[this.level].speed));
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
    this.ethon.render_manager.basicShape(BOX_FILLED, 
        new Vector2D(500,5), 130, 60,'#000000', '#000000');
    this.ethon.render_manager.drawText("Score: ",505,20,'#ffffff');
    this.ethon.render_manager.drawText(int_to_string(this.ethon.score,6),555,20,'#ffffff');
    this.ethon.render_manager.drawText("Time: ",505,40,'#ffffff');
    this.ethon.render_manager.drawText(Math.round(this.ethon.time),565,40,'#ffffff');
    this.ethon.render_manager.drawText("Level: ",505,60,'#ffffff');
    this.ethon.render_manager.drawText(this.level,565,60,'#ffffff');
  };

  this.update = function(dt) { //update function
    var cm = this.ethon.collision_manager;
    var remove;
    var collision;

    this.background.update(dt);
    this.ethon.player.update(dt);

    remove = null;
    collision = null;
    for(var i = 0; i < this.enemies.length; i++) {
      collision = cm.sprite_collision(this.ethon.player, this.enemies[i]);
      if(this.enemies[i].update(dt) || collision) {
        remove = i;
      }
      if(collision) {
        if(this.enemies[i].spike) {
          this.ethon.player.hurt();
        }
        else {
          this.ethon.score += 10;
          this.ethon.time += 2;
        }
      }
    }
    if(remove != null) {
      if(!collision && this.enemies[remove].spike) {
        this.ethon.score += 10;
        this.ethon.time += 2;
      }
      this.enemies.splice(remove,1);
    }

    remove = null;
    collision = null;
    for(var i = 0; i < this.obstacles.length; i++) {
      collision = cm.sprite_collision(this.ethon.player, this.obstacles[i]);
      if(this.obstacles[i].update(dt)) {
        remove = i;
      }
      if(collision) {
        this.obstacles[i].hit(this.ethon.player);
      }
    }
    if(remove != null) {
      this.obstacles.splice(remove,1);
    }

    // Spawn enemies
    this.ethon.event_manager.update('spawn_enemy',dt);
    if(this.ethon.event_manager.happens('spawn_enemy')) {
      this.enemies.push(new Enemy(rand(30,600),-200, rand(1,1000)%2 == 0, this.levels[this.level].speed));
    }

    // Spawn obstacles
    this.ethon.event_manager.update('spawn_obstacle',dt);
    if(this.ethon.event_manager.happens('spawn_obstacle')) {
      this.obstacles.push(new Obstacle(rand(30,600),-200, this.levels[this.level].speed));
    }

    // Check pause game condition
    if(this.ethon.event_manager.happens('pause')) {
      this.ethon.scene_manager.set_active('pause');
    }

    // Check game over condition
    this.ethon.time -= dt;
    if(this.ethon.player.health <= 0 || this.ethon.time <= 0) {
      this.ethon.scene_manager.set_active('game_over');
    }

    // Check level up
    var current_level = this.level;
    for(var i = current_level; i < this.levels.length; i++)
      if(this.ethon.score > this.levels[i].score) { this.level = i; }
    
    if(this.level != current_level) {
      this.ethon.event_manager.unregister('spawn_enemy');
      this.ethon.event_manager.register('spawn_enemy', TIMED, 
          this.levels[this.level].spawn_enemy_time);
      this.ethon.event_manager.unregister('spawn_obstacle');
      this.ethon.event_manager.register('spawn_obstacle', TIMED, 
          this.levels[this.level].spawn_obstacle_time);
      this.background.step_y = this.levels[this.level].speed;
    }

    // Check if player get damage
    if(this.ethon.player.state === PLAYER_HURT) {
      for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].vel = new Vector2D(0,0);
      }

      for(var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].vel = new Vector2D(0,0);
      }
    }
    else {
      for(var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].vel = new Vector2D(0,this.levels[this.level].speed);
      }

      for(var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].vel = new Vector2D(0,this.levels[this.level].speed);
      }
    }
  };
};
