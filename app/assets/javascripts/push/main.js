/**
 * Main Scene
 */

function Main(ethon) {
  this.ethon = Ethon.getInstance();

  this.init = function() {
    this.ethon.texture_manager.add_texture('background','sprites/background.png');
    this.background = new TileMap("background",40,20,32,32,0,64);
    for(var i = 0; i < this.background.rows; i++) {
      for(var j = 0; j < this.background.cols; j++) {
        this.background.map[i][j] = rand(0,7); 
      } 
    }
  };
  
  this.draw = function() { //render function
    this.background.draw();
    this.ethon.player.draw();
  };

  this.update = function(dt) { //update function
    this.background.update(dt);
    this.ethon.player.update(dt);
  };
};
