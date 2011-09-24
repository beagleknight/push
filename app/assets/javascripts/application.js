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

//= require_self

$(document).ready(function() {
  var game = $('#game').ethon({
    path: '/images/push/',
    init: function() {
      this.texture_manager.add_texture('player','sprites/player.png');
      this.texture_manager.add_texture('enemy','sprites/child.png');
      this.event_manager.register('move_left', KEYBOARD, MINUS_A);
      this.event_manager.register('move_right', KEYBOARD, MINUS_D);
      this.event_manager.register('move_up', KEYBOARD, MINUS_W);
      this.event_manager.register('move_down', KEYBOARD, MINUS_S);

      this.player = new Player(350,500);

      //main scene 
      this.scene_manager.add_scene('main', new Main());
      // set active scene
      this.scene_manager.set_active('main');
    }
  });

  //start game
  game.start();
});
