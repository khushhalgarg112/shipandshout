/**
 * Raymarched signed-distance scene: one full-screen triangle, all geometry
 * in the fragment shader. No meshes, no textures, no library.
 *
 * SHAPE (compile-time #define, so each program only contains one scene):
 *   0 = orb (wobbling blob + tilted ring + satellite) — "Shout"
 *   1 = stack (three rounded slabs turning independently) — "Ship"
 *   2 = waves (core + rings pulsing outward) — broadcast
 * uNight: 0 on the light canvas, 1 on dark panels (swaps the accent material).
 */

export const vertexShader = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/** Fragment source specialised for one shape. */
export const fragmentShader = (shape: number) => `#define SHAPE ${shape}
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform float uNight;

const float BOUND = 2.25;

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdRoundBox(vec3 p, vec3 b, float r){
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

// x = distance, y = material (0 flame, 1 accent ink/bone, 2 pale)
vec2 pick(vec2 a, vec2 b){ return a.x < b.x ? a : b; }

vec2 map(vec3 p){
  float t = uTime;
#if SHAPE == 0
  float wob = 0.075 * sin(3.1 * p.x + t * 1.3) * sin(2.7 * p.y + t * 1.1) * sin(3.3 * p.z + t * 0.9);
  vec2 res = vec2(length(p) - 1.0 + wob, 0.0);
  vec3 r = p;
  r.xy *= rot(0.42);
  r.yz *= rot(0.28);
  res = pick(res, vec2(sdTorus(r, vec2(1.58, 0.05)), 1.0));
  float a = t * 0.7;
  vec3 s = r - vec3(1.58 * cos(a), 0.0, 1.58 * sin(a));
  return pick(res, vec2(length(s) - 0.15, 2.0));
#elif SHAPE == 1
  vec2 res = vec2(1e5, 0.0);
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec3 q = p - vec3(0.0, (fi - 1.0) * 0.64 + 0.05 * sin(t * 1.2 + fi * 2.0), 0.0);
    q.xz *= rot(t * 0.35 * (fi - 1.0) + fi * 0.7);
    float d = sdRoundBox(q, vec3(0.92, 0.13, 0.92), 0.11);
    res = pick(res, vec2(d, fi == 2.0 ? 0.0 : (fi == 1.0 ? 1.0 : 2.0)));
  }
  return res;
#else
  vec2 res = vec2(length(p) - 0.46, 0.0);
  vec3 r = p;
  r.yz *= rot(1.15);
  r.xy *= rot(0.25);
  for (int i = 0; i < 3; i++) {
    float ph = fract(t * 0.22 + float(i) / 3.0);
    float tube = mix(0.075, 0.012, ph);
    res = pick(res, vec2(sdTorus(r, vec2(0.62 + ph * 1.35, tube)), 1.0));
  }
  return res;
#endif
}

vec3 normal(vec3 p){
  const vec2 e = vec2(0.0015, -0.0015);
  return normalize(
    e.xyy * map(p + e.xyy).x + e.yyx * map(p + e.yyx).x +
    e.yxy * map(p + e.yxy).x + e.xxx * map(p + e.xxx).x);
}

vec3 shade(vec3 p, vec3 rd, float mat){
  vec3 n = normal(p);
  vec3 key = normalize(vec3(0.55, 0.8, 0.65));
  vec3 fill = normalize(vec3(-0.75, -0.25, 0.45));
  float dif = max(dot(n, key), 0.0);
  float fil = max(dot(n, fill), 0.0);
  float fre = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
  float spe = pow(max(dot(n, normalize(key - rd)), 0.0), 72.0);
  float env = smoothstep(-0.3, 0.9, reflect(rd, n).y);

  vec3 lit, shadow;
  if (mat < 0.5) {
    lit = vec3(1.0, 0.224, 0.157);     // #ff3928
    shadow = vec3(0.36, 0.035, 0.02);
  } else if (mat < 1.5) {
    lit = mix(vec3(0.16), vec3(0.93), uNight);   // ink on light, bone on dark
    shadow = mix(vec3(0.02), vec3(0.42), uNight);
  } else {
    lit = vec3(0.97);
    shadow = vec3(0.55);
  }

  vec3 col = mix(shadow, lit, dif * 0.8 + 0.2);
  col += fil * lit * 0.18;
  col += env * 0.16;
  col += spe * 0.95;
  col += fre * mix(vec3(1.0, 0.62, 0.55), vec3(1.0, 0.36, 0.28), uNight) * 0.5;
  return col / (1.0 + col * 0.12);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  vec3 ro = vec3(0.0, 0.0, 6.6);
  vec3 rd = normalize(vec3(uv, -1.75));

  mat2 pitch = rot(uPointer.y * 0.35 - 0.12);
  mat2 yaw = rot(uPointer.x * 0.55 + uTime * 0.12);
  ro.yz *= pitch; rd.yz *= pitch;
  ro.xz *= yaw;   rd.xz *= yaw;

  // Skip pixels whose ray misses the bounding sphere entirely.
  float b = dot(ro, rd);
  float h = b * b - dot(ro, ro) + BOUND * BOUND;
  if (h < 0.0) { gl_FragColor = vec4(0.0); return; }
  h = sqrt(h);
  float t = max(-b - h, 0.0);
  float tEnd = -b + h;

  float px = 1.2 / min(uRes.x, uRes.y);
  float best = 1e5, tBest = t, mBest = 0.0;
  bool hit = false;
  vec2 res = vec2(0.0);
  for (int i = 0; i < 72; i++) {
    res = map(ro + rd * t);
    if (res.x < best) { best = res.x; tBest = t; mBest = res.y; }
    if (res.x < 0.0008 * t) { hit = true; break; }
    t += res.x * 0.9;
    if (t > tEnd) break;
  }

  // Near misses become a soft, anti-aliased silhouette edge.
  float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, px * tBest, best);
  if (alpha <= 0.0) { gl_FragColor = vec4(0.0); return; }
  float tt = hit ? t : tBest;
  float mat = hit ? res.y : mBest;
  vec3 col = shade(ro + rd * tt, rd, mat);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;
