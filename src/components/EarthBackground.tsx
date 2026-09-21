import * as THREE from "three";

/**
 * Creates a canvas-based text sprite that always faces the camera.
 */
function createTextSprite(message: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  
  if (context) {
    context.font = "Bold 64px Arial, sans-serif";
    context.fillStyle = "#ffffff";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.shadowColor = "rgba(0, 0, 0, 0.8)";
    context.shadowBlur = 6;
    context.fillText(message, 128, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(2.5, 1.25, 1);
  return sprite;
}

/**
 * Creates a soft, blurry, glowing sun sprite using a custom radial gradient.
 */
function createSunSprite(): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");
  
  if (context) {
    const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(246, 188, 96, 0.9)");   // Intense bright core
    gradient.addColorStop(0.25, "rgba(255, 220, 80, 0.9)");  // Warm yellow body
    gradient.addColorStop(0.6, "rgba(255, 160, 20, 0.35)");  // Soft hazy outer aura
    gradient.addColorStop(1, "rgba(255, 120, 0, 0.0)");      // Fade out completely

    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });
  
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(5.0, 5.0, 1);
  return sprite;
}

/**
 * Sets up the complete space environment: Starfield, Blurry Glowing Sun, and Realistic Moon with phase shadows.
 */
export function setupSpaceBackground(scene: THREE.Scene): { starField: THREE.Points } {
  // --- 1. STARFIELD GENERATOR ---
  const starGeo = new THREE.BufferGeometry();
  const starCount = 8000;
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);

  const colorPalette = [
    new THREE.Color(0xffffff), // Pure white
    new THREE.Color(0xb5cfff), // Hot blue-white
    new THREE.Color(0xfff6d1), // Warm yellow
    new THREE.Color(0xffd2a1)  // Soft orange
  ];

  for (let i = 0; i < starCount; i++) {
    const r = 60 + Math.random() * 40;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    
    starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    starPos[i * 3 + 2] = r * Math.cos(phi);

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    starColors[i * 3] = color.r;
    starColors[i * 3 + 1] = color.g;
    starColors[i * 3 + 2] = color.b;

    // Strict size hierarchy logic:
    const rand = Math.random();
    if (rand > 0.9998) {
      starSizes[i] = 0.45; 
    } else if (rand > 0.92) {
      starSizes[i] = 0.2 + Math.random() * 0.05; 
    } else {
      const pinprickOptions = [0.05, 0.08, 0.1];
      starSizes[i] = pinprickOptions[Math.floor(Math.random() * pinprickOptions.length)];
    }
  }

  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
  starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    size: 0.45,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
  });

  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // --- 2. THE BLURRY GLOWING SUN & LABEL ---
  const sunGroup = new THREE.Group();
  const sunSprite = createSunSprite();
  sunGroup.add(sunSprite);

  sunGroup.position.set(40, 18, -45);
  
  const sunLabel = createTextSprite("Sun");
  sunLabel.position.set(0, 2.2, 0);
  sunGroup.add(sunLabel);
  
  scene.add(sunGroup);

  // --- 3. THE MOON & LABEL (REALISTIC PHASE SHADOW) ---
  const moonGroup = new THREE.Group();
  
  const moonCanvas = document.createElement("canvas");
  moonCanvas.width = 256;
  moonCanvas.height = 256;
  const mCtx = moonCanvas.getContext("2d");
  
  if (mCtx) {
    mCtx.fillStyle = "#b0b0b0";
    mCtx.beginPath();
    mCtx.arc(128, 128, 120, 0, Math.PI * 2);
    mCtx.fill();

    mCtx.fillStyle = "#8a8a8a";
    mCtx.beginPath(); mCtx.arc(90, 80, 25, 0, Math.PI * 2); mCtx.fill();
    mCtx.beginPath(); mCtx.arc(160, 150, 35, 0, Math.PI * 2); mCtx.fill();
    mCtx.beginPath(); mCtx.arc(110, 180, 20, 0, Math.PI * 2); mCtx.fill();

    const shadowGrad = mCtx.createLinearGradient(0, 0, 256, 0);
    shadowGrad.addColorStop(0.0, "rgba(5, 5, 10, 0.9)");
    shadowGrad.addColorStop(0.5, "rgba(5, 5, 10, 0.4)");
    shadowGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
    
    mCtx.fillStyle = shadowGrad;
    mCtx.beginPath();
    mCtx.arc(128, 128, 120, 0, Math.PI * 2);
    mCtx.fill();
  }

  const moonTexture = new THREE.CanvasTexture(moonCanvas);
  moonTexture.colorSpace = THREE.SRGBColorSpace;
  
  const moonMat = new THREE.MeshBasicMaterial({ 
    map: moonTexture,
    transparent: true
  });
  
  const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), moonMat);
  moonGroup.add(moonMesh);

  moonGroup.position.set(-28, 4, 18);

  const moonLabel = createTextSprite("Moon");
  moonLabel.position.set(0, 0.7, 0);
  moonGroup.add(moonLabel);

  scene.add(moonGroup);

  return { starField };
}