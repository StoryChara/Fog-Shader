let diamante_textura, piedra_textura, cueva_sonido, font;
let cajas = [], numCajas = 25;
let menu = "start";

function preload() {
  updateSubtitleVisibility(false);
  diamante_textura = loadImage("resources/diamante.jpg");
  piedra_textura = loadImage("resources/stone.png");
  cueva_sonido = loadSound("resources/Minecraft-Cave-Ambient-Sounds.mp3");
  font = {
    regular: loadFont("resources/MinecraftRegular-Bmg3.otf"),
    original: loadFont("resources/MinecraftEvenings-lgvPd.ttf")
  };
}

function setup() {
  const canvas = createCanvas(600, 600, WEBGL);
  canvas.parent('canvas-container');
  
  cueva_sonido.setLoop(true); cueva_sonido.setVolume(0.5);
  
  createBoxes();
  
  fogShader = createShader(fogVert, fogFrag);
  
  fogNearSlider = createSlider(0, 500, 125); fogNearSlider.hide();
  fogFarSlider = createSlider(0, 1000, 750); fogFarSlider.hide(); 
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

function updateSubtitleVisibility(option) {
  const subtitleElement = document.querySelector('.subtitle');
  
  if (option) { 
    subtitleElement.style.display = 'block';
  } else { 
    subtitleElement.style.display = 'none'; 
  }
}

function createBoxes() {
  cajas = [];
  for (let i = 0; i < numCajas; i++) {
    cajas.push({
      pos: createVector(random(-300, 300), random(-300, 300), random(-300, 300)),
      vel: createVector(random(-2, 2), random(-2, 2), random(-2, 2)),
    });
  }
}

function mousePressed() {
  if (menu === "start") {
    cueva_sonido.play();
    menu = "shader";
  }
}

function keyPressed(){
  if ((key==="r")||(key==="R")){
    menu="start";
    cueva_sonido.stop();
    createBoxes();
    fogNearSlider.hide(); fogFarSlider.hide();
    updateSubtitleVisibility(false);
   }
}
