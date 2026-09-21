import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface EarthGlobeProps {
  activeShellCount: number;
}

// 1. Custom 3D Volumetric Plasma Shader
const PlasmaGlowShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
      vPosition = position; // Pass raw position for 3D noise generation
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float intensity;
    uniform float power;
    uniform float time;
    uniform float layerOffset;

    varying vec3 vNormal;
    varying vec3 vPositionNormal;
    varying vec3 vPosition;

    // Fast 3D Hash Function
    float hash(float n) { return fract(sin(n) * 1e4); }
    
    // 3D Noise Generator
    float noise(vec3 x) {
        const vec3 step = vec3(110.0, 241.0, 171.0);
        vec3 i = floor(x);
        vec3 f = fract(x);
        float n = dot(i, step);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                       mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
                   mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                       mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
    }

    // Fractional Brownian Motion (fBM) to create swirling plasma
    float fbm(vec3 x) {
        float v = 0.0;
        float a = 0.5;
        vec3 shift = vec3(100.0);
        for (int i = 0; i < 4; ++i) {
            v += a * noise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
      // Fresnel rim calculation (glows brightest on the edges)
      float dotProd = dot(vNormal, -vPositionNormal);
      float rim = 1.0 - max(0.0, dotProd);

      // Aurora / Curtain Effect: Stretch the noise heavily on the Y-axis (10.0) 
      // and drift it slowly over time
      vec3 noisePos = vec3(vPosition.x * 4.0, vPosition.y * 10.0, vPosition.z * 4.0) + (time * 0.1) + layerOffset;
      float plasma = fbm(noisePos);

      // Combine the wispy plasma with the spherical rim glow
      float alpha = pow(rim, power) * intensity * (plasma * 1.8);

      // Add a slight white-hot core to the densest plasma regions
      vec3 finalColor = mix(glowColor, vec3(1.0), plasma * 0.25);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};

export const EarthGlobe: React.FC<EarthGlobeProps> = ({ activeShellCount }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const shellsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.001,
      1000
    );
    camera.position.set(0, 0.4, 4.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.LinearToneMapping;
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1.05;
    controls.maxDistance = 10.0;

    // Parallax Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 30 + Math.random() * 40;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const starMesh = new THREE.Points(starGeo, starMat);
    scene.add(starMesh);

    const textureLoader = new THREE.TextureLoader();
    const earthDayMap = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
    );
    earthDayMap.colorSpace = "srgb";

    const earthCloudsMap = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
    );

    const earthGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const earthMat = new THREE.MeshBasicMaterial({
      map: earthDayMap,
      color: 0xffffff,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);

    const cloudsGeo = new THREE.SphereGeometry(1.012, 64, 64);
    const cloudsMat = new THREE.MeshBasicMaterial({
      map: earthCloudsMap,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffffff,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    scene.add(cloudsMesh);

    // Dynamic Plasma Layers
    const shellConfigs = [
      { radius: 1.08, color: new THREE.Color("#22c55e"), power: 2.2 }, // Troposphere
      { radius: 1.18, color: new THREE.Color("#84cc16"), power: 2.5 }, // Stratosphere
      { radius: 1.28, color: new THREE.Color("#06b6d4"), power: 2.8 }, // Mesosphere
      { radius: 1.40, color: new THREE.Color("#f59e0b"), power: 3.2 }, // Thermosphere
      { radius: 1.54, color: new THREE.Color("#6366f1"), power: 3.6 }, // Exosphere
    ];

    const shellMeshes: THREE.Mesh[] = [];

    shellConfigs.forEach((cfg, index) => {
      const geo = new THREE.SphereGeometry(cfg.radius, 64, 64);
      const mat = new THREE.ShaderMaterial({
        vertexShader: PlasmaGlowShader.vertexShader,
        fragmentShader: PlasmaGlowShader.fragmentShader,
        uniforms: {
          glowColor: { value: cfg.color },
          intensity: { value: 0.0 },
          power: { value: cfg.power },
          time: { value: 0.0 }, // Continuously updated in animation loop
          layerOffset: { value: index * 42.0 }, // Ensures each layer swirls uniquely
        },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      shellMeshes.push(mesh);
    });

    shellsRef.current = shellMeshes;

    // Animation Loop with Clock for smooth fluid physics
    const clock = new THREE.Clock();
    let animId: number;
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      earthMesh.rotation.y += 0.0004;
      cloudsMesh.rotation.y += 0.0006;
      starMesh.rotation.y -= 0.0001;

      // Update fluid time uniform for all layers
      shellMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = elapsedTime;
      });

      controls.update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update layer intensities based on selected atmospheric tier
  useEffect(() => {
    const activeIntensities = [0.95, 0.85, 0.75, 0.65, 0.55]; // Bright, burning energy for active layers
    const ghostIntensity = 0.06; // Faint, moody background swirl for inactive layers

    shellsRef.current.forEach((mesh, index) => {
      const mat = mesh.material as THREE.ShaderMaterial;
      if (index < activeShellCount) {
        mat.uniforms.intensity.value = activeIntensities[index];
      } else {
        mat.uniforms.intensity.value = ghostIntensity; 
      }
    });
  }, [activeShellCount]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};