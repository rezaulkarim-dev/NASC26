import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { setupSpaceBackground } from "./EarthBackground";

interface EarthGlobeProps {
  activeTextureUrl: string;
}

export const EarthGlobe: React.FC<EarthGlobeProps> = ({ activeTextureUrl }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const overlayMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    
    // Pitch black deep space background
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.001, 1000);
    camera.position.set(0, 0.4, 4.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 1.05;
    controls.maxDistance = 10.0;

    // Add modular space background (Starfield, Sun, and Moon)
    const { starField } = setupSpaceBackground(scene);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    // LIVE NASA GIBS INTEGRATION (VIIRS Suomi-NPP True Color)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 2); 
    const dateString = targetDate.toISOString().split('T')[0];
    
    const gibsWmsUrl = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor&VERSION=1.3.0&FORMAT=image/jpeg&TRANSPARENT=false&WIDTH=4096&HEIGHT=2048&CRS=EPSG:4326&BBOX=-90,-180,90,180&TIME=${dateString}`;
    
    const earthColor = textureLoader.load(gibsWmsUrl);
    earthColor.colorSpace = THREE.SRGBColorSpace;
    
    const earthBump = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg");
    const earthSpecular = textureLoader.load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg");

    const earthGeo = new THREE.SphereGeometry(1.0, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthColor,
      normalMap: earthBump,
      roughnessMap: earthSpecular, 
      metalness: 0.1,
      roughness: 0.8
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earthMesh);

    // Heatmap Overlay Data Skin
    const overlayGeo = new THREE.SphereGeometry(1.002, 64, 64);
    const overlayMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const overlayMesh = new THREE.Mesh(overlayGeo, overlayMat);
    scene.add(overlayMesh);
    overlayMeshRef.current = overlayMesh;

    // Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); 
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8); 
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    let animId: number;
    const animate = () => {
      earthMesh.rotation.y += 0.0004;
      overlayMesh.rotation.y += 0.0004;
      starField.rotation.y -= 0.0001; // Gentle celestial parallax rotation
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
      if (currentMount.contains(renderer.domElement)) currentMount.removeChild(renderer.domElement);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Overlay Swapping Controller
  useEffect(() => {
    if (!overlayMeshRef.current) return;
    const material = overlayMeshRef.current.material as THREE.MeshBasicMaterial;

    if (!activeTextureUrl || activeTextureUrl.includes("earth_atmos_2048")) {
      material.opacity = 0.0;
      return;
    }

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    textureLoader.load(activeTextureUrl, (newTexture) => {
      newTexture.colorSpace = THREE.SRGBColorSpace;
      
      if (material.map) material.map.dispose(); 
      material.map = newTexture;
      material.opacity = 0.8; 
      material.needsUpdate = true;
    });
  }, [activeTextureUrl]);

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};