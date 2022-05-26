
#pragma glslify: random = require(glsl-random) 

#define PI 3.1415926
#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)

vec3 random_point_on_sphere(vec2 uv) {
    float u = random(uv) * 2.0 - 1.0;
    float theta = random(uv + 0.333) * PI * 2.0;
    float u2 = sqrt(1.0 - u * u);
    return vec3(u2 * cos(theta), u2 * sin(theta), u);
}

// Quaternion multiplication
// http://mathworld.wolfram.com/Quaternion.html
vec4 qmul(vec4 q1, vec4 q2) {
	return vec4(
		q2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),
		q1.w * q2.w - dot(q1.xyz, q2.xyz)
	);
}

// Vector rotation with a quaternion
// http://mathworld.wolfram.com/Quaternion.html
vec3 rotate_vector(vec3 v, vec4 r) {
	vec4 r_c = r * vec4(-1, -1, -1, 1);
	return qmul(r, qmul(vec4(v, 0), r_c)).xyz;
}

vec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {
	vec3 dir = v - center;
	return center + rotate_vector(dir, r);
}

// A given angle of rotation about a given axis
vec4 rotate_angle_axis(float angle, vec3 axis) {
	float sn = sin(angle * 0.5);
	float cs = cos(angle * 0.5);
	return vec4(axis * sn, cs);
}

vec4 q_conj(vec4 q) {
	return vec4(-q.x, -q.y, -q.z, q.w);
}

uniform float time;
uniform float dt;

// 
uniform int mode;

void init(vec2 uv) {
    gl_FragColor = QUATERNION_IDENTITY;
}

void rotate(vec2 uv) {
    vec4 v = texture2D(textureVelocity, uv);
    vec4 r = texture2D(textureRotation, uv);

    float theta = (0.01 + length(v.xyz) * 0.005) * dt;
    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));

    gl_FragColor = normalize(qmul(dq, r));
}

void rModel(vec2 uv) {
    vec4 v = texture2D(textureVelocity, uv);
    float theta = (length(v.xyz) * 0.001) * dt;

    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));

    vec4 r = texture2D(textureRotation, uv);

    // gl_FragColor = normalize(qmul(dq, r));
    gl_FragColor = mix(normalize(qmul(dq, r)), QUATERNION_IDENTITY, dt);
    // gl_FragColor = mix(r, QUATERNION_IDENTITY, dt);
}

void update(vec2 uv) {
    if(mode == 3) {
        rModel(uv);
    } else {
        rotate(uv);
    }
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    if(mode == 0) {
        init(uv);
    } else {
        update(uv);
    }
}

