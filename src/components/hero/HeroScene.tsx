import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "../../utils/gsap";
import { isMobileViewport, prefersReducedMotion } from "../../utils/motion";
import { SculptureFallback } from "./SculptureFallback";

interface HeroSceneProps {
  active: boolean;
}

interface SceneItem {
  object: THREE.Object3D;
  target: THREE.Vector3;
  from: THREE.Vector3;
  baseScale: number;
  spin: THREE.Vector3;
  phase: number;
  amp: number;
}

// [radius, x, y, z]
const PEARLS: [number, number, number, number][] = [
[0.95, 0.3, 0.25, 0.4],
[0.46, -1.75, 1.45, 1.1],
[0.32, 2.05, -1.25, 0.9],
[0.24, -1.15, -1.85, 1.5],
[0.58, 1.55, 1.75, -0.7],
[0.16, 0.35, -2.45, 1.3],
[0.13, -2.6, 0.15, 0.3]];


const RINGS = [
{ r: 2.35, tube: 0.022, rot: [1.2, 0.2, 0.3], color: 0x315ef7 },
{ r: 2.95, tube: 0.013, rot: [1.45, -0.5, 0], color: 0x3730a3 },
{ r: 1.65, tube: 0.03, rot: [0.4, 0.9, 0.2], color: 0x315ef7 }];


export function HeroScene({ active }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assembleRef = useRef({ value: prefersReducedMotion() ? 1 : 0 });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const state = assembleRef.current;
    if (prefersReducedMotion()) {
      state.value = 1;
      return;
    }
    const tween = gsap.to(state, { value: 1, duration: 2.4, ease: "expo.out", delay: 0.05 });
    return () => {
      tween.kill();
    };
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const reduced = prefersReducedMotion();
    const mobile = isMobileViewport();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envTex = pmrem.fromScene(room, 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const root = new THREE.Group();
    scene.add(root);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const items: SceneItem[] = [];

    const addItem = (object: THREE.Object3D, target: THREE.Vector3, baseScale: number, spin: THREE.Vector3, amp: number) => {
      const i = items.length;
      const angle = i * 2.399;
      const from = target.
      clone().
      add(new THREE.Vector3(Math.cos(angle) * 8, Math.sin(angle) * 6, -3 - i % 3 * 2));
      object.position.copy(from);
      root.add(object);
      items.push({ object, target, from, baseScale, spin, phase: i * 1.37, amp });
    };

    // Pearls
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xf7f5f0,
      roughness: 0.16,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      sheen: 1,
      sheenRoughness: 0.4,
      sheenColor: new THREE.Color(0xe9e5ff),
      iridescence: 0.55,
      iridescenceIOR: 1.35
    });
    const sphereGeo = new THREE.SphereGeometry(1, mobile ? 32 : 64, mobile ? 32 : 64);
    materials.push(pearlMat);
    geometries.push(sphereGeo);
    PEARLS.forEach(([r, x, y, z]) => {
      const mesh = new THREE.Mesh(sphereGeo, pearlMat);
      addItem(mesh, new THREE.Vector3(x, y, z), r, new THREE.Vector3(0, 0.1, 0), 0.08 + r * 0.06);
    });

    // Orbital rings
    RINGS.forEach((ring) => {
      const geo = new THREE.TorusGeometry(ring.r, ring.tube, 16, 220);
      const mat = new THREE.MeshStandardMaterial({
        color: ring.color,
        metalness: 0.55,
        roughness: 0.25,
        emissive: ring.color,
        emissiveIntensity: 0.25
      });
      geometries.push(geo);
      materials.push(mat);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(ring.rot[0], ring.rot[1], ring.rot[2]);
      addItem(mesh, new THREE.Vector3(0, 0, 0), 1, new THREE.Vector3(0, 0, 0.12), 0.04);
    });

    // Violet geometric forms
    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      roughness: 0.22,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      flatShading: true
    });
    materials.push(violetMat);
    const forms: {geo: THREE.BufferGeometry;pos: [number, number, number];}[] = [
    { geo: new THREE.OctahedronGeometry(0.55), pos: [-1.95, 0.95, 0.4] },
    { geo: new THREE.TetrahedronGeometry(0.5), pos: [1.35, -1.45, 1.1] },
    { geo: new THREE.IcosahedronGeometry(0.36, 0), pos: [2.5, 0.85, -0.4] },
    { geo: new THREE.OctahedronGeometry(0.22), pos: [-0.6, 2.1, 0.8] }];

    forms.forEach(({ geo, pos }, i) => {
      geometries.push(geo);
      const mesh = new THREE.Mesh(geo, violetMat);
      addItem(mesh, new THREE.Vector3(...pos), 1, new THREE.Vector3(0.3 + i * 0.05, 0.4, 0.1), 0.14);
    });

    // Structural wireframe
    const wireBase = new THREE.IcosahedronGeometry(3.4, 1);
    const wireGeo = new THREE.EdgesGeometry(wireBase);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x3730a3, transparent: true, opacity: 0.1 });
    geometries.push(wireBase, wireGeo);
    materials.push(wireMat);
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    root.add(wire);

    // Particles
    const count = mobile ? 90 : 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x3730a3, size: 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true });
    geometries.push(particleGeo);
    materials.push(particleMat);
    const particles = new THREE.Points(particleGeo, particleMat);
    root.add(particles);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(5, 6, 8);
    scene.add(key);
    const blue = new THREE.PointLight(0x315ef7, 18, 20);
    blue.position.set(-4, 2, 3);
    scene.add(blue);
    const violet = new THREE.PointLight(0x8b5cf6, 14, 20);
    violet.position.set(3, -3, 4);
    scene.add(violet);

    let layout = { x: 2.9, y: 0.35, s: 1 };
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (w < 768) layout = { x: 0.9, y: 0.4, s: 0.62 };else
      if (w < 1100) layout = { x: 2.1, y: 0.3, s: 0.8 };else
      layout = { x: 2.9, y: 0.35, s: 1 };
      root.scale.setScalar(layout.s);
      root.position.x = layout.x;
      if (reduced) renderFrame(0, 0);
    };

    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const clock = new THREE.Clock();

    const renderFrame = (dt: number, t: number) => {
      const a = assembleRef.current.value;
      items.forEach((item) => {
        const o = item.object;
        o.position.lerpVectors(item.from, item.target, a);
        if (!reduced) o.position.y += Math.sin(t * 0.7 + item.phase) * item.amp * a;
        o.scale.setScalar(item.baseScale * (0.3 + 0.7 * a));
        o.rotation.x += item.spin.x * dt;
        o.rotation.y += item.spin.y * dt;
        o.rotation.z += item.spin.z * dt;
      });
      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;
      const rect = container.getBoundingClientRect();
      const scrollP = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      root.rotation.y = smooth.x * 0.4 + scrollP * 0.6;
      root.rotation.x = -smooth.y * 0.25 + scrollP * 0.15;
      root.position.y = layout.y + scrollP * 2.2;
      wire.rotation.y += dt * 0.04;
      wire.rotation.x += dt * 0.015;
      particles.rotation.y -= dt * 0.02;
      wireMat.opacity = 0.1 * a;
      particleMat.opacity = 0.55 * a;
      renderer.render(scene, camera);
    };

    let raf = 0;
    let running = false;
    let visible = true;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      renderFrame(dt, clock.elapsedTime);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.getDelta();
      loop();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => {
      if (visible && !document.hidden) start();else
      stop();
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth * 2 - 1;
      pointer.y = e.clientY / window.innerHeight * 2 - 1;
    };
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(container);
    document.addEventListener("visibilitychange", sync);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onContextLost);

    resize();
    if (reduced) renderFrame(0, 0);else
    sync();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {failed ? <SculptureFallback /> : <canvas ref={canvasRef} className="block h-full w-full" />}
    </div>);

}