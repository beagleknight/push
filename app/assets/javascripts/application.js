//= require ethon/functions
//= require ethon/vector2d
//= require ethon/hash 
//= require ethon/tile_map 
//= require ethon/timer 
//= require ethon/timer_manager
//= require ethon/keyboard_input
//= require ethon/mouse_input
//= require ethon/event
//= require ethon/timed_event
//= require ethon/event_manager
//= require ethon/object_2d
//= require ethon/particle
//= require ethon/explosion
//= require ethon/sprite
//= require ethon/render_manager
//= require ethon/collision_manager
//= require ethon/sound_manager
//= require ethon/scene
//= require ethon/scene_manager
//= require ethon/texture_manager
//= require ethon/button
//= require ethon/ethon

//= require push/main
//= require push/player
//= require push/enemy
//= require push/obstacle

//= require_self

$(document).ready(function() {
  var game = $('#game').ethon({
    path: '/images/push/',
    init: function() {
      this.texture_manager.add_texture('player','sprites/player.png');
      this.texture_manager.add_texture('enemy','sprites/child.png');
      this.texture_manager.add_texture('enemy_spike','sprites/evil_child.png');
      this.texture_manager.add_texture('obstacle','sprites/obstacle.png');

      this.event_manager.register('move_left', KEYBOARD, MINUS_A);
      this.event_manager.register('move_right', KEYBOARD, MINUS_D);
      this.event_manager.register('move_up', KEYBOARD, MINUS_W);
      this.event_manager.register('move_down', KEYBOARD, MINUS_S);

      this.event_manager.register('pause', KEYBOARD, ESCAPE);

      this.player = new Player(350,500);
      this.score = 0;

      //main scene 
      this.scene_manager.add_scene('main', new Main());

      //game over scene
      this.scene_manager.add_scene('game_over', {
        init: function() {
        },
        draw: function() {
          this.ethon.render_manager.drawText("Game over",280,300,'#000000');
          this.ethon.render_manager.drawText(int_to_string(this.ethon.score,6),280,320,'#000000');
        },
        update: function(dt) {
        }
      });

      //pause scene
      this.scene_manager.add_scene('pause', {
        init: function() {
        },
        draw: function() {
          this.ethon.render_manager.drawText("- PAUSE -",280,300,'#000000');
        },
        update: function(dt) {
          if(this.ethon.event_manager.happens('pause')) {
            this.ethon.scene_manager.set_active('main');
          }
        }
      });

      // set active scene
      this.scene_manager.set_active('main');
    }
  });

  //start game
  game.start();
});
