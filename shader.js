const fogVert = `
precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;
varying float vDistance;

void main() {
  vec4 worldPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  vDistance = length(worldPosition.xyz);
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * worldPosition;
}`;

const fogFrag = `
precision mediump float;

varying vec2 vTexCoord;
varying float vDistance;

uniform sampler2D uTexture;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

void main() {
  vec4 texColor = texture2D(uTexture, vTexCoord);
  float fogFactor = smoothstep(uFogNear, uFogFar, vDistance);
  vec3 foggedColor = mix(texColor.rgb, uFogColor, fogFactor);
  gl_FragColor = vec4(foggedColor, texColor.a);
}`;

function shader_menu() {
  background(127);
  
  updateSubtitleVisibility(true);
  fogNearSlider.show();
  fogFarSlider.show();

  shader(fogShader);

  let fogNearValue = fogNearSlider.value();
  let fogFarValue = fogFarSlider.value();

  fogShader.setUniform("uTexture", diamante_textura);
  fogShader.setUniform("uFogColor", [127 / 255, 127 / 255, 127 / 255]);
  fogShader.setUniform("uFogNear", fogNearValue);
  fogShader.setUniform("uFogFar", fogFarValue);

  noStroke();
  for (let caja of cajas) {
    push();
      translate(caja.pos.x, caja.pos.y, caja.pos.z);
      box(75);
    pop();

    caja.pos.add(caja.vel);

    if (caja.pos.x > 300 || caja.pos.x < -300) {caja.vel.x *= -1}
    if (caja.pos.y > 300 || caja.pos.y < -300) {caja.vel.y *= -1}
    if (caja.pos.z > 300 || caja.pos.z < -300) {caja.vel.z *= -1}
  }

  resetShader();

  push();
    fill(255, 255, 255, 50); tint(255, 127);
    texture(piedra_textura);
    translate(0, 0, -500); 
    plane(width * 2, height * 2); 
  pop();
}
