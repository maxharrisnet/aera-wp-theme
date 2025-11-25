import * as THREE from 'three';
import { gsap } from 'gsap';

const COLOR_GRADIENTS = {
  green: ['#c0f4fe', '#fff3df'],
  blue: ['#d0e3fd', '#ecfffe'],
};

export default class WebglScene {
  constructor(container) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height);
    this.camera.far = 10000;
    this.camera.position.z = 36;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);

    this.container = container;
    this.nbSegments = 64;
    this.lengthPlane = 90;
    this.widthPlane = 12;
    this.widthPlaneMini = 8;

    this.globalGroup = new THREE.Group();

    this.frame = 0;
    this.flagCount = 0;
    this.tWave1 = 0;
    this.twist1 = 0;
    this.tY1 = 0;
    this.tWave2 = 0;
    this.twist2 = 0;
    this.tY2 = 0;
    this.tWave3 = 0;
    this.tY3 = 0;

    this.mousemoveX = 0;
    this.mousemoveY = 0;
    this.mouse = { x: 0, y: 0 };

    this.scrollY = 0;
    this.y = {
      val1: 0,
      val2: 0,
      val3: 0,
      val4: 0,
      anim1: 0.65,
      anim2: 0.65,
      anim3: 0.65,
    };
    this.finalY = { val1: 0, val2: 0, val3: 0, val4: 0 };
    this.sauvScrollY = 0;
    this.helixActive = false;

    this.resizeCanvas();
    this.createLights();
    this.createTextures();
    this.createGeometries();
    this.twistPlanes();
    this.renderScene(window.devicePixelRatio || 1);
    this.scene.add(this.globalGroup);
  }

  createLights() {
    const light = new THREE.AmbientLight(0xffffff);
    const spotLightTop = new THREE.SpotLight(0xababab, 2);
    spotLightTop.position.set(0, 0, 2000);
    spotLightTop.angle = Math.PI / 12;
    spotLightTop.distance = 3000;
    spotLightTop.penumbra = 1;
    spotLightTop.castShadow = false;

    this.globalGroup.add(spotLightTop);
    this.scene.add(spotLightTop.target);
    this.globalGroup.add(light);
  }

  createTextures() {
    const gradientGreen = this.createGradientTexture(...COLOR_GRADIENTS.green);
    const gradientBlue = this.createGradientTexture(...COLOR_GRADIENTS.blue);
    const alphaTexture = createAlphaTexture();
    const wireframeTexture = createWireframeTexture();

    this.material1 = new THREE.MeshBasicMaterial({
      map: gradientGreen,
      side: THREE.DoubleSide,
      transparent: true,
      alphaMap: alphaTexture,
    });

    this.material2 = new THREE.MeshBasicMaterial({
      map: gradientBlue,
      side: THREE.DoubleSide,
      transparent: true,
      alphaMap: alphaTexture,
    });

    this.material3 = new THREE.MeshBasicMaterial({
      color: 0x94d3fd,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      alphaMap: wireframeTexture,
    });
  }

  createGradientTexture(leftColor, rightColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    context.rect(0, 0, 512, 512);
    const gradient = context.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, leftColor);
    gradient.addColorStop(1, rightColor);
    context.fillStyle = gradient;
    context.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  createGeometries() {
    this.planeGeo1 = new THREE.PlaneGeometry(
      this.widthPlane,
      this.lengthPlane,
      this.nbSegments,
      this.nbSegments,
    );
    this.planeGeo2 = new THREE.PlaneGeometry(
      this.widthPlane,
      this.lengthPlane,
      this.nbSegments,
      this.nbSegments,
    );
    this.planeGeo3 = new THREE.PlaneGeometry(
      this.widthPlaneMini,
      this.lengthPlane,
      this.nbSegments,
      this.nbSegments,
    );

    // Get position attribute arrays for direct manipulation
    this.positions1 = this.planeGeo1.attributes.position.array;
    this.positions2 = this.planeGeo2.attributes.position.array;
    this.positions3 = this.planeGeo3.attributes.position.array;

    // Store original positions for reference
    this.originalPositions1 = new Float32Array(this.positions1);
    this.originalPositions2 = new Float32Array(this.positions2);
    this.originalPositions3 = new Float32Array(this.positions3);

    const plane1 = new THREE.Mesh(this.planeGeo1, this.material1);
    plane1.rotation.y = Math.PI / 2;

    const plane2 = new THREE.Mesh(this.planeGeo2, this.material2);
    plane2.rotation.y = Math.PI / 2;

    const plane3 = new THREE.Mesh(this.planeGeo3, this.material3);

    // Each vertex has 3 components (x, y, z)
    this.nbVerticesPlane = this.positions1.length / 3;

    this.globalGroup.add(plane1);
    this.globalGroup.add(plane2);
    this.globalGroup.add(plane3);
  }

  twistPlanes() {
    let flagCount = 0;
    let frame = 0;
    let j = this.nbVerticesPlane;

    for (let i = 0; i < this.nbVerticesPlane; i += 1) {
      const idx = i * 3; // Position array index (x, y, z)
      let t = (1 / this.nbVerticesPlane) * j;
      let easing = (((t -= 1) * t) * t) + 1;

      const x1 = (this.originalPositions1[idx] * easing)
        + (Math.sin(1.45 + (frame / 8)) * (-6 * easing));
      const x2 = (this.originalPositions2[idx] * easing)
        + (Math.sin(1.45 + (frame / 8)) * (8 * easing));
      const x3 = (this.originalPositions3[idx] * easing)
        + (Math.sin(0.88 + (frame / -5)) * (3 * easing));

      this.positions1[idx] = x1;
      this.positions2[idx] = x2;
      this.positions3[idx] = x3;

      if (flagCount === this.nbSegments) {
        frame += 1;
        flagCount = -1;
      }
      flagCount += 1;
      j -= 1;
    }

    // Mark positions as needing update
    this.planeGeo1.attributes.position.needsUpdate = true;
    this.planeGeo2.attributes.position.needsUpdate = true;
    this.planeGeo3.attributes.position.needsUpdate = true;
  }

  updateMouseMove(x, y) {
    this.mousemoveX = x;
    this.mousemoveY = y;
  }

  showHelix() {
    gsap.killTweensOf(this.y);
    this.renderFlag = true;
    gsap.to(this.y, { duration: 2, anim1: -0.45, ease: 'power2.in' });
    gsap.to(this.y, { duration: 1.9, anim2: -0.45, ease: 'power2.in' });
    gsap.to(this.y, { duration: 2.1, anim3: -0.45, ease: 'power2.in' });
  }

  hideHelix() {
    gsap.killTweensOf(this.y);
    gsap.to(this.y, {
      duration: 2,
      anim1: 0.65,
      anim2: 0.65,
      anim3: 0.65,
      ease: 'power2.out',
      onComplete: () => {
        this.renderFlag = false;
      },
    });
  }

  renderScene(pixelRatio) {
    this.renderer.sortObjects = true;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
    this.render();
  }

  resizeCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  loopWaveAnimation() {
    let j = 0;
    let k = this.nbVerticesPlane;
    let twistVar = 0;

    for (let i = 0; i < this.nbVerticesPlane; i += 1) {
      const idx = i * 3; // Position array index (x, y, z)
      let t = (1 / this.nbVerticesPlane) * k;
      let easing = (((t -= 1) * t) * t) + 1;

      this.tWave1 = (Math.sin((this.frame / 400000) + (i / 10)) * (1.2 * easing));
      this.twist1 = Math.sin((this.flagCount + twistVar) / 45) * (-6 * easing) * (1 + this.mouse.y);
      this.tY1 = (1.2 + (Math.sin((j / 10)) * -10)) * (1 + this.mouse.x);

      this.tWave2 = (Math.sin((this.frame / 400000) + (i / 10)) * (1.2 * easing));
      this.twist2 = Math.sin((this.flagCount + twistVar) / 45) * (4 * easing) * (1 + this.mouse.y);
      this.tY2 = ((Math.sin(3.4 + (j / 10)) * -4)) * (1 + this.mouse.y);

      this.tWave3 = (Math.sin((this.frame / 400000) + (i / 10)) * (3 * easing));
      this.tY3 = ((Math.sin(3.4 + (j / -40)) * 6) + (18 * easing)) * (1 + this.mouse.x);

      // z is at index idx + 2 (x=idx, y=idx+1, z=idx+2)
      this.positions1[idx + 2] = (this.tWave1 + this.twist1 + this.tY1) * easing;
      this.positions2[idx + 2] = (this.tWave2 + this.twist2 + this.tY2) * easing;
      this.positions3[idx + 2] = (this.tWave3 + this.tY3) * easing;

      if (this.flagCount === this.nbSegments) {
        j += 1;
        this.flagCount = -1;
      }

      twistVar += 0.1;
      this.flagCount += 1;
      this.frame += 1;
      k -= 1;
    }

    // Mark positions as needing update
    this.planeGeo1.attributes.position.needsUpdate = true;
    this.planeGeo2.attributes.position.needsUpdate = true;
    this.planeGeo3.attributes.position.needsUpdate = true;
  }

  mousemoveLoopAnimation() {
    this.mouse.x = (0.035 * ((this.mousemoveX / 7500) - this.mouse.x)) + this.mouse.x;
    this.mouse.y = (0.035 * ((this.mousemoveY / 7500) - this.mouse.y)) + this.mouse.y;
    this.globalGroup.rotation.y = this.mouse.x / 10;
  }

  scrollLoopAnimation() {
    const relativeValue = this.height * 0.65;
    this.y.val1 = ((0.1 * (((this.scrollY / relativeValue) - this.y.val1))) + this.y.val1);
    this.y.val2 = (0.1 * (((this.scrollY / relativeValue) - this.y.val2))) + this.y.val2;
    this.y.val3 = (0.1 * (((this.scrollY / relativeValue) - this.y.val3))) + this.y.val3;

    this.finalY.val1 = this.y.val1 + this.y.anim1;
    this.finalY.val2 = this.y.val2 + this.y.anim2;
    this.finalY.val3 = this.y.val3 + this.y.anim3;

    if (this.material1) {
      this.material1.map.offset.y = this.finalY.val1;
      this.material2.map.offset.y = this.finalY.val2;
      this.material3.alphaMap.offset.y = this.finalY.val3;
    }
  }

  helixYmovement() {
    this.y.val4 = this.scrollY / (this.height * 0.025);
    this.globalGroup.position.y = this.y.val4;
  }

  render = () => {
    if (this.renderFlag) {
      this.renderer.render(this.scene, this.camera);
      this.loopWaveAnimation();
      this.scrollLoopAnimation();
      this.mousemoveLoopAnimation();
      this.helixYmovement();
    }
    requestAnimationFrame(this.render);
  };
}

function createAlphaTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function createWireframeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 2;
  const step = 32;
  for (let i = 0; i <= canvas.width; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let j = 0; j <= canvas.height; j += step) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}
