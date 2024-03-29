/**
  Class EventManager
*/

function EventManager() {
  this.keyboard_input = new KeyboardInput();
  this.mouse_input = new MouseInput();

  this.registered_events = new Hash();
  this.registered_events.setItem(KEYBOARD, new Hash());
  this.registered_events.setItem(MOUSE, new Hash());
  this.registered_events.setItem(MOUSE_OVER, new Hash());
  this.registered_events.setItem(MOUSE_OUT, new Hash());
  this.registered_events.setItem(TIMED, new Hash());

  this.happening_events = new Hash();

  this.register = function(id, type, value) {
    var event = new Event(id,type,value);
    this.registered_events.getItem(type).setItem(id, event);
    //console.log('Event "'+id+'" registered');
  }

  this.unregister = function(id) {
    this.registered_events.removeItem(id);
    //console.log('Event "'+id+'" unregistered');
  }

  this.happens = function(id) {
    return this.happening_events.getItem(id); 
  }

  this.update = function(id, dt) {
    this.registered_events.getItem(TIMED).getItem(id).update(dt);    
  }
 
  this.reset = function(id) {
    this.registered_events.getItem(TIMED).getItem(id).reset();    
  }
 
  this.clear = function() {
    this.happening_events.clear();
  }

  //console.log('Event manager loaded successfully');
}
