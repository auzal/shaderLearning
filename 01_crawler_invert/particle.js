class Particle{

  constructor(){

    this.vel =0;
    this.dir =0;
    this.x =0;
    this.y =0;
    this.initialDir=0;
    this.reset();

  }

  reset(){

    this.initialDir = random(TWO_PI);
    let margin = 0.3;
    this.x = random(0+width*margin, width - width*margin);
    this.y = random(0+height*margin, height - height*margin);
    this.vel = random(1,4);
    this.dir = 0;
  }

  update(){

    this.x += cos(this.dir) * this.vel;
    this.y += sin(this.dir) * this.vel;
    let scale = 0.01;
    this.dir = map(noise((this.x+frameCount) * scale, (this.y+frameCount) * scale),0,1,0,TWO_PI) + this.initialDir;

    if(this.x<0){
      //  x += width;
      this.reset();
    }else if(this.x > width){
      //  x -= width;
      this.reset();
    }
    if(this.y<0){
      //  y += height;
      this.reset();

    }else if(this.y > height){
      //  y -= height;
      this.reset();
    }
  }
}
