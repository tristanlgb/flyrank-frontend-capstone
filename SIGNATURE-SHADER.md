# FE-AA3 — Signature Hero: A Fullscreen Shader

## Live result

<https://flyrank-frontend-capstone-eight.vercel.app/#overview>

## What the shader does

This hero draws an aurora directly on a WebGL canvas. The fragment shader runs
once for every pixel and combines three smooth waves into violet, cyan, and
mint ribbons. A small grain layer reduces visible color banding and gives the
background a less template-like texture.

The text remains normal HTML above the canvas, so it stays selectable,
responsive, and accessible rather than becoming part of an image.

## The three uniforms

- `u_resolution` contains the canvas width and height. I use it to convert pixel
  coordinates into a 0–1 coordinate system and correct the aspect ratio.
- `u_time` is the number of seconds since animation began. Adding it to the wave
  equations makes the light move slowly.
- `u_mouse` contains the cursor position inside the canvas. It adds a small
  offset to the waves, so the light leans toward the pointer without moving the
  page content.

## Shader blocks in plain words

1. `random` produces a repeatable noisy value for each pixel.
2. `uv` and `centered` convert screen pixels into convenient coordinates.
3. `waveOne`, `waveTwo`, and `waveThree` create three directions of motion.
4. `smoothstep` turns those waves into soft light ribbons rather than hard
   lines.
5. `mix` blends my midnight, violet, cyan, and mint palette.
6. The final grain value is added before the pixel color is returned.

The commented GLSL source is exported as `fragmentShaderSource` from
`src/ShaderHero.tsx`.

## Performance and reduced-motion fallback

**One-line fallback:** device pixel ratio is capped at 1.5, animation stops when
the tab is hidden, and `prefers-reduced-motion` replaces WebGL motion with a
static gradient in the same palette.
