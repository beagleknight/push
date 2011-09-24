/**
 * Main Scene
 */

function Main(ethon) {
  this.ethon = Ethon.getInstance();

  this.init = function() {
  };
  
  this.draw = function() { //render function
    this.ethon.player.draw();
  };

  this.update = function(dt) { //update function
    this.ethon.player.update(dt);
  };
};
