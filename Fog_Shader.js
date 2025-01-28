let diamante_textura, cueva_sonido, font;
let cajas = [], numCajas = 25;
let menu = "start";

function preload(){
  diamante_textura = loadImage("resources/diamante.jpg");
  cueva_sonido = loadSound("resources/Minecraft-Cave-Ambient-Sounds.mp3");
  
  font = {
    regular: loadFont("resources/MinecraftRegular-Bmg3.otf"),
    original:  loadFont("resources/MinecraftEvenings-lgvPd.ttf")
  };
  
}

function setup() {
  const canvas = createCanvas(800, 450, WEBGL);
  canvas.parent('canvas-container');
  
  for (let i = 0; i < numCajas; i++) {
    cajas.push({
      pos: createVector(random(-300, 300), random(-300, 300), random(-300, 300)),
      vel: createVector(random(-2, 2), random(-2, 2), random(-2, 2)),
    });
  }

}

function draw(){
 if (menu==="start"){
   start_menu();
 } else if (menu==="shader"){
   shader_menu();
 }
}

function start_menu(){
  background(0, 0, 0);
  fill(255);
  textFont(font.original);
  textAlign(CENTER, CENTER);
  fill(255); stroke(0); strokeWeight(0); textSize(50);
  text("CLICK to Start", 0, 0);
}

function shader_menu(){
  background(127);
  orbitControl();
  
  texture(diamante_textura);
  noStroke();
  
  for (let caja of cajas) {
    push();
    translate(caja.pos.x, caja.pos.y, caja.pos.z);
    box(75);
    pop();
    
    caja.pos.add(caja.vel);

    
    if (caja.pos.x > 300 || caja.pos.x < -300) caja.vel.x *= -1;
    if (caja.pos.y > 300 || caja.pos.y < -300) caja.vel.y *= -1;
    if (caja.pos.z > 300 || caja.pos.z < -300) caja.vel.z *= -1;
  }
}

function music(){
  cueva_sonido.stop();
  cueva_sonido.setLoop(true);
  cueva_sonido.setVolume(0.5);
  cueva_sonido.play();
}

function mousePressed() {
  if (menu === "start") {
      music();
      menu = "shader";
  }
}
