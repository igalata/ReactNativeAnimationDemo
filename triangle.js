module.exports = `
  precision highp float;
  varying vec2 uv;
  const float PI = 3.1415926535897932384626433832795;

  bool equal(float a, float b) {
    return abs(a - b) < 0.001;
  }

  float angle(vec2 a, vec2 b) {
    return acos(dot(normalize(a), normalize(b)));
  }

  bool insideTriangle(vec2 uv) {
    vec2 a = vec2(0.0, 0.0) - uv;
    vec2 b = vec2(0.5, 1.0) - uv;
    vec2 c = vec2(1.0, 0.0) - uv;
    
    return equal(angle(a, b) + angle(b, c) + angle(a, c), PI * 2.0);
  }

  void main() {
    float red = uv.y;
    float green = (1.0 - uv.x) * (1.0 - uv.y);
    float blue = uv.x * (1.0 - uv.y);
    
    gl_FragColor = insideTriangle(uv) ? vec4(red, green, blue, 1.0) : vec4(1.0);
  }
`
