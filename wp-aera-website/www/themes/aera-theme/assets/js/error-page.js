function mainCanvas(selector) {
  let siteLocation = window.location.origin;
  if (siteLocation == 'https://dev.viewdemo.co') {
    siteLocation = 'https://dev.viewdemo.co/wp/aera';
  } else if (siteLocation == 'http://localhost:8888') {
    siteLocation = 'http://localhost:8888/aera';
  }

  const AlphaTextureImg = `${siteLocation}/wp-content/themes/aera-theme/widgets/main-canvas/assets/img/texture-alpha.png`;
  const WireframeTextureImg = `${siteLocation}/wp-content/themes/aera-theme/widgets/main-canvas/assets/img/texture-wireframe.png`;

  let cameraWidth = window.innerWidth;
  let cameraHeight = window.innerHeight;

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, cameraWidth / cameraHeight);
  camera.far = 10000;
  camera.position.z = 36;
  let controls = null;
  let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  let renderFlag = false;

  renderer.setClearColor(0x000000, 0);

  let container = document.querySelector(selector);

  let nbVerticesPlane = 0;
  let planeGeo1 = null;
  let planeGeo2 = null;
  let planeGeo3 = null;

  let material1 = null;
  let material2 = null;
  let material3 = null;

  let nbSegments = 64;
  let lengthPlane = 90;
  let widthPlane = 12;
  let widthPlaneMini = 8;

  let globalGroup = new THREE.Group();

  let frame = 0;
  let flagCount = 0;
  let tWave1 = 0;
  let twist1 = 0;
  let tY1 = 0;
  let tWave2 = 0;
  let twist2 = 0;
  let tY2 = 0;
  let tWave3 = 0;
  let tY3 = 0;

  let mousemoveX = 0;
  let mousemoveY = 0;
  let mouse = { x: 0, y: 0 };

  let scrollY = 0;
  let y = {
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    anim1: 0.65,
    anim2: 0.65,
    anim3: 0.65,
  };
  let finalY = { val1: 0, val2: 0, val3: 0, val4: 0 };

  resizeCanvas();
  createLights();
  createTextures();
  createGeometries();
  twistPlanes();

  renderScene(1);

  scene.add(globalGroup);

  function createLights() {
    const light = new THREE.AmbientLight(0xffffff);

    const spotLightTop = new THREE.SpotLight(0xababab, 2);
    spotLightTop.position.set(0, 0, 2000);
    spotLightTop.angle = Math.PI / 12;
    spotLightTop.distance = 3000;
    spotLightTop.penumbra = 1;
    spotLightTop.castShadow = false;

    globalGroup.add(spotLightTop);
    scene.add(spotLightTop.target);
    globalGroup.add(light);
  }

  function createTextures() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = '';
    const textureAlpha = textureLoader.load(AlphaTextureImg);
    const wireframeTexture = textureLoader.load(WireframeTextureImg);

    const gradientGreen = new THREE.Texture(createGradient('#c0f4fe', '#fff3df'));
    gradientGreen.needsUpdate = true;
    material1 = new THREE.MeshBasicMaterial({
      map: gradientGreen,
      side: THREE.DoubleSide,
      transparent: true,
    });
    material1.alphaMap = textureAlpha;
    material1.alphaMap.magFilter = THREE.NearestFilter;

    const gradientBlue = new THREE.Texture(createGradient('#d0e3fd', '#ecfffe'));
    gradientBlue.needsUpdate = true;
    material2 = new THREE.MeshBasicMaterial({
      map: gradientBlue,
      side: THREE.DoubleSide,
      transparent: true,
    });
    material2.alphaMap = textureAlpha;
    material2.alphaMap.magFilter = THREE.NearestFilter;

    material3 = new THREE.MeshBasicMaterial({
      color: 0x94d3fd,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    });
    material3.alphaMap = wireframeTexture;
    material3.alphaMap.magFilter = THREE.NearestFilter;
  }

  function createGeometries() {
    planeGeo1 = new THREE.PlaneGeometry(widthPlane, lengthPlane, nbSegments, nbSegments);
    const plane1 = new THREE.Mesh(planeGeo1, material1);
    plane1.rotation.y = Math.PI / 2;

    planeGeo2 = new THREE.PlaneGeometry(widthPlane, lengthPlane, nbSegments, nbSegments);
    const plane2 = new THREE.Mesh(planeGeo2, material2);
    plane2.rotation.y = Math.PI / 2;

    planeGeo3 = new THREE.PlaneGeometry(widthPlaneMini, lengthPlane, nbSegments, nbSegments);
    const plane3 = new THREE.Mesh(planeGeo3, material3);

    nbVerticesPlane = planeGeo1.vertices.length;

    globalGroup.add(plane1);
    globalGroup.add(plane2);
    globalGroup.add(plane3);
  }

  function twistPlanes() {
    let flagCount = 0;
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;

    let frame = 0;
    let j = nbVerticesPlane;
    let easing = 1;
    let t = 0;

    for (let i = 0; i < nbVerticesPlane; i++) {
      t = (1 / nbVerticesPlane) * j;
      easing = (t -= 1) * t * t + 1;

      x1 = planeGeo1.vertices[i].x * easing + Math.sin(1.45 + frame / 8) * (-6 * easing);
      x2 = planeGeo2.vertices[i].x * easing + Math.sin(1.45 + frame / 8) * (8 * easing);
      x3 = planeGeo3.vertices[i].x * easing + Math.sin(0.88 + frame / -5) * (3 * easing);

      planeGeo1.vertices[i].x = x1;
      planeGeo2.vertices[i].x = x2;
      planeGeo3.vertices[i].x = x3;

      if (flagCount === nbSegments) {
        frame += 1;
        flagCount = -1;
      }
      flagCount += 1;
      j -= 1;
    }
  }

  function createGradient(leftColor, rightColor) {
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

    return canvas;
  }

  function updateMouseMove(x, y) {
    mousemoveX = x;
    mousemoveY = y;
  }

  function showHelix() {
    TweenLite.killTweensOf(y);
    renderFlag = true;

    TweenLite.to(y, 2, { anim1: -0.45, ease: 'Power2.easeIn' });
    TweenLite.to(y, 1.9, { anim2: -0.45, ease: 'Power2.easeIn' });
    TweenLite.to(y, 2.1, { anim3: -0.45, ease: 'Power2.easeIn' });
  }

  function renderScene(myPixelRatio) {
    renderer.sortObjects = true;

    renderer.setPixelRatio(myPixelRatio);
    renderer.setSize(cameraWidth, cameraHeight);
    container.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    render();
  }

  function resizeCanvas() {
    cameraWidth = window.innerWidth;
    cameraHeight = window.innerHeight;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function loopWaveAnimation() {
    let j = 0;
    let k = nbVerticesPlane;
    let t = 0;
    let easing = 0;
    let twistVar = 0;

    for (let i = 0; i < nbVerticesPlane; i++) {
      t = (1 / nbVerticesPlane) * k;
      easing = (t -= 1) * t * t + 1;

      tWave1 = Math.sin(frame / 400000 + i / 10) * (1.2 * easing);
      twist1 = Math.sin((flagCount + twistVar) / 45) * (-6 * easing) * (1 + mouse.y);
      tY1 = (1.2 + Math.sin(j / 10) * -10) * (1 + mouse.x);

      tWave2 = Math.sin(frame / 400000 + i / 10) * (1.2 * easing);
      twist2 = Math.sin((flagCount + twistVar) / 45) * (4 * easing) * (1 + mouse.y);
      tY2 = Math.sin(3.4 + j / 10) * -4 * (1 + mouse.y);

      tWave3 = Math.sin(frame / 400000 + i / 10) * (3 * easing);
      tY3 = (Math.sin(3.4 + j / -40) * 6 + 18 * easing) * (1 + mouse.x);

      planeGeo1.vertices[i].z = (tWave1 + twist1 + tY1) * easing;
      planeGeo1.verticesNeedUpdate = true;

      planeGeo2.vertices[i].z = (tWave2 + twist2 + tY2) * easing;
      planeGeo2.verticesNeedUpdate = true;

      planeGeo3.vertices[i].z = (tWave3 + tY3) * easing;
      planeGeo3.verticesNeedUpdate = true;

      if (flagCount === nbSegments) {
        j += 1;
        flagCount = -1;
      }
      twistVar += 0.1;
      flagCount += 1;
      frame += 1;
      k -= 1;
    }
  }

  function mousemoveLoopAnimation() {
    mouse.x = 0.035 * (mousemoveX / 7500 - mouse.x) + mouse.x;
    mouse.y = 0.035 * (mousemoveY / 7500 - mouse.y) + mouse.y;

    globalGroup.rotation.y = mouse.x / 10;
  }

  function scrollLoopAnimation() {
    const relativeValue = cameraHeight * 0.65;

    y.val1 = 0.1 * (scrollY / relativeValue - y.val1) + y.val1;
    y.val2 = 0.1 * (scrollY / relativeValue - y.val2) + y.val2;
    y.val3 = 0.1 * (scrollY / relativeValue - y.val3) + y.val3;

    finalY.val1 = y.val1 + y.anim1;
    finalY.val2 = y.val2 + y.anim2;
    finalY.val3 = y.val3 + y.anim3;

    if (material1 !== null) {
      material1.map.offset.y = finalY.val1;
      material2.map.offset.y = finalY.val2;
      material3.alphaMap.offset.y = finalY.val3;
    }
  }

  function helixYmovement() {
    y.val4 = scrollY / (cameraHeight * 0.025);

    globalGroup.position.y = y.val4;
  }

  function hideCanvasOnScroll() {
    scrollY = window.scrollY;
  }

  function render() {
    if (renderFlag) {
      renderer.render(scene, camera);

      if (controls !== null) {
        controls.update();
      }

      loopWaveAnimation();
      scrollLoopAnimation();
      mousemoveLoopAnimation();
      helixYmovement();
    }

    requestAnimationFrame(render);
  }

  if (container !== null) {
    showHelix();
  }

  function setCanvasHeight() {
    if (window.matchMedia('(min-width: 767px)').matches) {
      return;
    }

    container.style.height = `${window.innerHeight}px`;
  }

  function onResize() {
    const currentInnerWidth = window.innerWidth;

    if (innerWidth !== currentInnerWidth || window.matchMedia('(min-width: 767px)').matches) {
      setCanvasHeight();
      resizeCanvas();
    }
  }

  function onMousemove(e) {
    const moveMiddleX = e.pageX - window.innerWidth / 2;
    const moveMiddleY = e.screenY - window.innerHeight / 2;

    updateMouseMove(moveMiddleX, moveMiddleY);
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMousemove);
  window.addEventListener('scroll', hideCanvasOnScroll);
}

mainCanvas('#main-canvas');
