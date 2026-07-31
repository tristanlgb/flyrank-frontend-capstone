import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const fragmentShaderSource = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  // Repeatable pixel noise creates the fine grain layer.
  float random(vec2 point) {
    return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Convert pixels to 0–1 coordinates and correct the aspect ratio.
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 centered = uv - 0.5;
    centered.x *= u_resolution.x / u_resolution.y;

    // Cursor input gently bends the flow without moving the text.
    vec2 mouse = u_mouse / u_resolution;
    vec2 pull = (mouse - 0.5) * 0.18;

    // Three offset waves form the moving aurora ribbons.
    float waveOne = sin((centered.x + pull.x) * 5.5 + u_time * 0.42);
    float waveTwo = sin((centered.x - centered.y) * 7.0 - u_time * 0.28);
    float waveThree = cos((centered.y + pull.y) * 8.0 + u_time * 0.22);
    float flow = waveOne * 0.45 + waveTwo * 0.3 + waveThree * 0.25;

    // Soft bands blend colors instead of drawing hard edges.
    float upperBand = smoothstep(0.5, 0.02, abs(centered.y - flow * 0.16));
    float lowerBand = smoothstep(0.55, 0.04, abs(centered.y + flow * 0.2 + 0.18));
    float glow = smoothstep(0.95, 0.0, length(centered - pull * 0.4));

    vec3 color = vec3(0.025, 0.035, 0.11);
    color = mix(color, vec3(0.38, 0.18, 0.82), upperBand * 0.72);
    color = mix(color, vec3(0.08, 0.62, 0.78), lowerBand * 0.62);
    color = mix(color, vec3(0.18, 0.78, 0.52), upperBand * lowerBand * 0.34);
    color += glow * vec3(0.05, 0.06, 0.12);

    // Grain reduces visible banding in the gradient.
    float grain = (random(gl_FragCoord.xy + u_time) - 0.5) * 0.035;
    gl_FragColor = vec4(color + grain, 1.0);
  }
`;

function compileShader(context: WebGLRenderingContext, type: number, source: string) {
  const shader = context.createShader(type);
  if (!shader) return null;
  context.shaderSource(shader, source);
  context.compileShader(shader);
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    context.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("webgl", {
      antialias: false,
      powerPreference: "low-power",
    });
    if (!canvas || !context) return;

    const vertexShader = compileShader(context, context.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = context.createProgram();
    if (!program) return;
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) return;

    const positionBuffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      context.STATIC_DRAW,
    );

    const position = context.getAttribLocation(program, "a_position");
    const time = context.getUniformLocation(program, "u_time");
    const resolution = context.getUniformLocation(program, "u_resolution");
    const mouse = context.getUniformLocation(program, "u_mouse");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    let frame = 0;
    let start = performance.now();

    context.useProgram(program);
    context.enableVertexAttribArray(position);
    context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        context.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      resize();
      context.uniform1f(time, motionQuery.matches ? 0 : (now - start) / 1_000);
      context.uniform2f(resolution, canvas.width, canvas.height);
      context.uniform2f(mouse, pointer.x * canvas.width, pointer.y * canvas.height);
      context.drawArrays(context.TRIANGLES, 0, 6);
    };

    const animate = (now: number) => {
      draw(now);
      if (!motionQuery.matches && !document.hidden) frame = requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = 1 - (event.clientY - bounds.top) / bounds.height;
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      start = performance.now();
      if (motionQuery.matches || document.hidden) draw(start);
      else frame = requestAnimationFrame(animate);
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", restart);
    motionQuery.addEventListener("change", restart);
    restart();

    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", restart);
      motionQuery.removeEventListener("change", restart);
      context.deleteBuffer(positionBuffer);
      context.deleteProgram(program);
      context.deleteShader(vertexShader);
      context.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <section className="shader-hero" aria-labelledby="shader-title">
      <canvas ref={canvasRef} className="shader-canvas" aria-hidden="true" />
      <div className="shader-scrim" aria-hidden="true" />
      <div className="shader-content">
        <p className="shader-kicker">Tristan Lenzberg · Frontend AI Engineering</p>
        <h1 id="shader-title">I turn AI-assisted ideas into verified interfaces.</h1>
        <p>
          A custom WebGL aurora built from time, resolution, and cursor input —
          with accessibility and performance treated as part of the design.
        </p>
        <div className="shader-actions">
          <a className="shader-primary" href="#chat">Try the live mentor</a>
          <a className="shader-secondary" href="https://github.com/tristanlgb/flyrank-frontend-capstone">
            View the source
          </a>
        </div>
      </div>
      <span className="shader-caption">Move your pointer to bend the light</span>
    </section>
  );
}
