varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
uniform sampler2D uTextureFour;
uniform vec2 uvAspect;
uniform float uTime;
// uniform map3 mappedMatrix;

mat2 rotate(float a) {
	float s = sin(a);
	float c = cos(a);
	return mat2(c, -s, s, c);
}

void main() {
    // vec3 map = vec3(vTextureCoord.xy, 1.) * mappedMatrix;
    // vec2 uv = map.xy;
    // vec2 uv = (vTextureCoord.xy - 0.5)*uvAspect + 0.5;
    vec2 uv = (vTextureCoord.xy - 0.5)*uvAspect + 0.5;
    vec2 uvDivided = fract(uv * vec2(10.0, 1.0));

    float time = abs(sin(uTime));
    vec2 uvDisplaced = uv + time * rotate(2.0) * uvDivided * vec2(uv.x / 4.0, 0.0);
    
    gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
    gl_FragColor = texture2D(uTextureOne, uvDisplaced);
    // gl_FragColor = vec4(uvDivided, 0., 1.);
}