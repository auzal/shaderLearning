#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform vec2 u_mouse; // This is passed in as a uniform from the sketch.js file
uniform sampler2D tex0;
uniform float u_diam;
uniform vec2 particles[5];

void main() {

  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 mouse = u_mouse.xy/u_resolution.xy;

  // Normalized pixel coordinates (from 0 to 1)
  st.y = 1.0 - st.y;

  vec4 prevColor = texture2D(tex0, st);
  float dist  = 0.0;
  dist = distance(gl_FragCoord.xy,u_mouse);

  vec4 color = prevColor;

  if(dist < u_diam){
    if(prevColor.r < 0.1){
      color = vec4(vec3(0.6),1.0);
      }else if(prevColor.r > 0.8){
        color = vec4(vec3(0.5),1.0);
      }
  }
  else{// if not inside radius
      if(prevColor.r < 0.55 && prevColor.r > 0.0){
        float newVal = clamp(prevColor.r - 0.01, 0.0, 1.0);
        color = vec4(vec3(newVal),1.0);
        }else if(prevColor.r > 0.55 && prevColor.r < 1.0){
          float newVal = clamp(prevColor.r + 0.01, 0.0, 1.0);
          color = vec4(vec3(newVal),1.0);
        }else{
              color = prevColor;
        }
      }
      gl_FragColor = color; // R,G,B,A
}
