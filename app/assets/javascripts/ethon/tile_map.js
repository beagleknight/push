/**
 * Class TileMap
*/

function TileMap(texture_id, rows, cols, w, h, step_x, step_y) {
  this.ethon = Ethon.getInstance();
  this.rows = rows;
  this.cols = cols;
  this.tile_w = w;
  this.tile_h = h;
  this.alive = true;

  this.rows_per_canvas = Math.ceil(this.ethon.render_manager.canvas_height/this.tile_h);
  this.cols_per_canvas = Math.ceil(this.ethon.render_manager.canvas_width/this.tile_w);
  this.canvas_outside = (this.rows-this.rows_per_canvas)*this.tile_h;

  this.map = new Array(rows);
  for(var i = 0; i < rows; i++)
    this.map[i] = new Array(cols); 

  this.tiles = this.ethon.texture_manager.get_texture(texture_id);

  this.offset_x = 0;
  this.step_x = step_x;
  this.offset_y = 0;
  this.step_y = step_y;

  this.draw = function() {
    var x = 0; 
    var y = this.offset_y;

    for(var i = 0; i < this.rows; i++) {
      for(var j = 0; j < this.cols; j++) {
        var id = this.map[i][j];
        var pos = new Vector2D(x,y);
        var init_x = 0;
        var init_y = 0;
        var crop = new Vector2D(id*this.tile_w,0);
        var dimension = new Vector2D(this.tile_w,this.tile_h);
        this.ethon.render_manager.renderImage(this.tiles,pos,crop,dimension);
        x += this.tile_w;
      }
      x = 0;
      y += this.tile_h;

      var canvas_height = this.ethon.render_manager.canvas_height;
      if(y > canvas_height) {
        y = y-(canvas_height+this.canvas_outside);
      }
    }
  }

  this.update = function(dt) {
    var canvas_height = this.ethon.render_manager.canvas_height;
    this.offset_y = this.offset_y+this.step_y; 

    if(this.step < 0) {
      if(this.offset_y < -this.canvas_outside) {
        this.offset_y = this.offset_y+canvas_height+this.canvas_outside;
      }
    }
    else {
      if(this.offset_y > canvas_height) {
        this.offset_y = this.offset_y-canvas_height-this.canvas_outside;
      }
    }
  }
}

