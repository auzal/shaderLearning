// a shader variable
let theShader;

let graphics;

let particles = [];


function preload(){
  theShader = loadShader('assets/invert.vert', 'assets/invert.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  graphics = createGraphics(width, height, WEBGL);
  graphics.background(255);
  noStroke();
  stroke(0);



  createParticles();

}

function draw() {
  background(255);
  noStroke();

  graphics.shader(theShader);
  theShader.setUniform('u_resolution', [width*displayDensity(), height*displayDensity()]);
  theShader.setUniform('u_mouse', [particles[0].x * displayDensity(),  particles[0].y * displayDensity()]);
  theShader.setUniform('tex0', graphics);
  theShader.setUniform('u_diam', map(sin(frameCount*0.1),-1,1,5,20));

  let positions = [];
  for(let i = 0 ; i < particles.length ; i++){
    positions.push([particles[i].x, particles[i].y]);
  }

  theShader.setUniform('particles', positions );

  fill(0,255,0);

  graphics.rectMode(CENTER);
  graphics.rect(0,0,width,height);

  updateParticles();
  imageMode(CENTER);
  image(graphics,0,0);


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){

  graphics.background(255);
}


function createParticles(){

  for(let i = 0 ; i < 5 ; i ++){
    let aux = new Particle();
    particles.push(aux);
  }

}

function updateParticles(){
  for(let i = 0 ; i < particles.length ; i++){
    particles[i].update();
  }

}
