module.exports = `
  precision highp float;
  varying vec2 uv;
  uniform float ratio;
  uniform float radius;
  uniform vec2 location;
  uniform float angle;
  uniform sampler2D image;

  void main () {
	    float sin_factor = sin(angle);
	    float cos_factor = cos(angle);
	    mat2 rotation = mat2(cos_factor, sin_factor, -sin_factor, cos_factor);
	    vec2 ballLocation = location * rotation;
    	vec2 currentLocation = vec2(uv.x, uv.y / ratio) * rotation;
    	vec2 result = (ballLocation - currentLocation + radius) / (radius * 2.0);
    	gl_FragColor = texture2D(image, result);
  }
`
