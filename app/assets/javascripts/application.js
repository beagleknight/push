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
//= require_self

$(document).ready(function() {
  var game = $('#game').ethon({
    path: 'javascripts/push/',
    init: function() {
      //your code goes here
      this.box = new Object2D(10,10,50,50);
      this.box.vel = new Vector2D(2,5);

      //main scene 
      this.scene_manager.add_scene('main', {
          init: function() {
            this.box = new Object2D(100,100,25,25);
            this.box.vel = new Vector2D(4,10);
          },
          draw: function() { //render function
            //draw global game box
            this.ethon.box.draw();
            // draw local scene box
            this.box.draw();
          },
          update: function(dt) { //update function
            //update global game box
            this.ethon.box.update();
            //update local scene box
            this.box.update();
          }
        }
      );
      // set active scene
      this.scene_manager.set_active('main');
    }
  });

  //start game
  game.start();
});
