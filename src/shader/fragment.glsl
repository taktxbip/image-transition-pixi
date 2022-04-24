varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
uniform vec2 uvAspect;
uniform float uProgress;
uniform float uShreds;
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

    float progress = fract(uProgress);

    vec2 uv = (vTextureCoord.xy - 0.5)*uvAspect + 0.5;
    vec2 uvDivided = fract(uv * vec2(uShreds, 1.0));

    vec2 uvDisplaced1 = uv + rotate(3.14159/4.) * uvDivided * progress * 0.1;
    vec2 uvDisplaced2 = uv + rotate(3.14159/4.) * uvDivided  * (1.0 - progress) * 0.1;
    
    vec4 img1 = texture2D(uTextureOne, uvDisplaced1);
    vec4 img2 = texture2D(uTextureTwo, uvDisplaced2);

    gl_FragColor = mix(img1, img2, progress);
}