function decisionCloudAnimation() {
  let siteLocation = window.location.origin;

  if (siteLocation == 'https://dev.viewdemo.co') {
    siteLocation = 'https://dev.viewdemo.co/wp/aera';
  } else if (siteLocation == 'http://localhost:8888') {
    siteLocation = 'http://localhost:8888/aera';
  }

  const AlphaTextureImg = `${siteLocation}/wp-content/themes/aera-theme/widgets/decision-cloud-how-animation/assets/img/texture-alpha.png`;
  const TechAnimation1 = `${siteLocation}/wp-content/themes/aera-theme/widgets/decision-cloud-how-animation/assets/json/techAnimation1.json`;
  const TechAnimation2 = `${siteLocation}/wp-content/themes/aera-theme/widgets/decision-cloud-how-animation/assets/json/techAnimation2.json`;
  const TechAnimation3 = `${siteLocation}/wp-content/themes/aera-theme/widgets/decision-cloud-how-animation/assets/json/techAnimation3.json`;
  const TechAnimation4 = `${siteLocation}/wp-content/themes/aera-theme/widgets/decision-cloud-how-animation/assets/json/techAnimation4.json`;

  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
  camera.far = 10000;
  camera.position.z = 56;
  let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  let controls = null;
  let myRequestAnimationFrame = null;

  renderer.setClearColor(0x000000, 0);

  let sphereGeometry = null;
  let sphereSaved = [];

  let sphereMesh = null;

  let material1 = null;
  let material2 = null;
  let arrayT = null;

  let container = document.querySelector('#aera-dc-animation__canvas');

  let globalGroup = new THREE.Group();

  let nbSegments = 64;

  let t1 = 0;
  let t2 = 0;
  let t3 = 0;
  let nbVerticesSphere = null;
  let frame = 0;
  let m = {
    rotate: 1,
  };

  window.setTimeout(() => {
    resizeCanvas();
  }, 250);

  createLights();
  createTextures();
  createGeometries();
  squeezeSphere();
  renderScene(1);

  scene.add(globalGroup);

  function createLights() {
    const light = new THREE.AmbientLight(0xffffff);

    globalGroup.add(light);
  }

  function createTextures() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = '';
    const textureAlpha = textureLoader.load(AlphaTextureImg);

    // green gradient texture
    const gradientGreen = new THREE.Texture(createGradient('#e0fafe', '#f4fff4'));
    gradientGreen.needsUpdate = true;

    material1 = new THREE.MeshBasicMaterial({
      map: gradientGreen,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.5,
      opacity: 1,
    });
    material1.alphaMap = textureAlpha;
    material1.alphaMap.magFilter = THREE.NearestFilter;

    // blue gradient
    const gradientBlue = new THREE.Texture(createGradient('#d5e6fd', '#f0fffe'));
    gradientBlue.needsUpdate = true;

    material2 = new THREE.MeshBasicMaterial({
      map: gradientBlue,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.5,
      opacity: 0,
    });
    material2.alphaMap = textureAlpha;
    material2.alphaMap.magFilter = THREE.NearestFilter;
  }

  function createGeometries() {
    sphereGeometry = new THREE.SphereGeometry(30, nbSegments, nbSegments);
    nbVerticesSphere = sphereGeometry.vertices.length;

    const faceVertexUvs = sphereGeometry.faceVertexUvs[0];

    for (let i = 0; i < faceVertexUvs.length; i++) {
      const uvs = faceVertexUvs[i];
      const face = sphereGeometry.faces[i];

      for (let j = 0; j < 3; j++) {
        uvs[j].x = face.vertexNormals[j].x * 0.5 + 0.5;
        uvs[j].y = face.vertexNormals[j].y * 0.5 + 0.5;
      }
    }

    arrayT = [material1, material2];

    sphereMesh = THREE.SceneUtils.createMultiMaterialObject(sphereGeometry, arrayT);

    sphereMesh.rotation.set(-0.5, -0.2, 1);
    sphereMesh.position.set(5, 0, 0);

    globalGroup.add(sphereMesh);
  }

  function squeezeSphere() {
    let squeeze = 0;
    let flagCount = 0;
    let frame = 0;

    for (let i = 0; i < nbVerticesSphere; i++) {
      squeeze = sphereGeometry.vertices[i].x + Math.sin(frame / 6) * 3;

      sphereGeometry.vertices[i].x = squeeze;

      sphereSaved.push({
        x: sphereGeometry.vertices[i].x,
        y: sphereGeometry.vertices[i].y,
        z: sphereGeometry.vertices[i].z,
      });

      if (flagCount === nbSegments) {
        frame += 1;
        flagCount = -1;
      }

      flagCount += 1;
    }
  }

  function createGradient(leftColor, rightColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const context = canvas.getContext('2d');
    context.rect(0, 0, 32, 32);

    const gradient = context.createLinearGradient(32 / 2, 0, 32 / 2, 32);
    gradient.addColorStop(0, leftColor);
    gradient.addColorStop(0.4, leftColor);
    gradient.addColorStop(1, rightColor);
    context.fillStyle = gradient;
    context.fill();

    return canvas;
  }

  function switchTexture(index) {
    if (index % 2 === 0) {
      TweenLite.to(arrayT[0], 1, { opacity: 1, ease: 'Power3.easeOut' });
      TweenLite.to(arrayT[1], 1, { opacity: 0, ease: 'Power3.easeOut' });
    }
    if (index % 2 === 1) {
      TweenLite.to(arrayT[1], 1, { opacity: 1, ease: 'Power3.easeOut' });
    }

    TweenLite.to(m, 2, { rotate: '+=1', ease: 'Power3.easeOut' });
  }

  function renderScene(myPixelRatio) {
    const calcHeight = container.offsetWidth / (488 / 400);
    renderer.sortObjects = true;

    renderer.setPixelRatio(myPixelRatio);
    renderer.setSize(container.offsetWidth, calcHeight);
    container.insertBefore(renderer.domElement, container.firstChild);

    renderer.render(scene, camera);

    render();
  }

  function resizeCanvas() {
    const calcHeight = container.offsetWidth / (488 / 400);

    camera.aspect = container.offsetWidth / calcHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, calcHeight);
  }

  function loopWaveAnimation() {
    for (let i = 0; i < nbVerticesSphere; i++) {
      t1 = Math.sin(m.rotate + frame / 500000 + i / 10) * -2.8;
      t2 = Math.sin(m.rotate + frame / 900000 + i / 10) * 2.8;
      t3 = Math.sin(m.rotate + frame / 500000 + i / 10) * -2.8;

      sphereGeometry.vertices[i].x = sphereSaved[i].x + t1;
      sphereGeometry.vertices[i].y = sphereSaved[i].y + t2;
      sphereGeometry.vertices[i].z = sphereSaved[i].z + t3;
      sphereGeometry.verticesNeedUpdate = true;
      frame += 1;
    }
  }

  function render() {
    renderer.render(scene, camera);

    if (controls !== null) {
      controls.update();
    }

    loopWaveAnimation();

    myRequestAnimationFrame = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resizeCanvas);
  // // canvas animation

  // // lottie animation
  let sauvIndex = null;
  let itemPlayed = 1;
  let currentIndex = 0;

  let paramArray = [
    {
      container: document.querySelector('#aera-dc-animation__lottie-first'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: TechAnimation1,
    },
    {
      container: document.querySelector('#aera-dc-animation__lottie-second'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: TechAnimation2,
    },
    {
      container: document.querySelector('#aera-dc-animation__lottie-third'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: TechAnimation3,
    },
    {
      container: document.querySelector('#aera-dc-animation__lottie-fourth'),
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: TechAnimation4,
    },
  ];

  let animArray = [
    bodymovin.loadAnimation(paramArray[0]),
    bodymovin.loadAnimation(paramArray[1]),
    bodymovin.loadAnimation(paramArray[2]),
    bodymovin.loadAnimation(paramArray[3]),
  ];

  bodyMovinAnimation(0, -1, animArray[0].currentFrame);

  document.addEventListener('scroll', () => {
    const skills1 = document.querySelector('#aera-dc-animation__content-first');
    const skills2 = document.querySelector('#aera-dc-animation__content-second');
    const skills3 = document.querySelector('#aera-dc-animation__content-third');
    const skills4 = document.querySelector('#aera-dc-animation__content-fourth');

    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let offsetMinusSection = 270;

    if (window.matchMedia('(min-height: 810px) and (max-height: 880px)').matches) {
      offsetMinusSection = 300;
    } else if (window.matchMedia('(min-height: 881px) and (max-height: 1260px)').matches) {
      offsetMinusSection = 350;
    } else if (window.matchMedia('(min-height: 1261px) and (max-height: 1500px)').matches) {
      offsetMinusSection = 500;
    } else if (window.matchMedia('(min-height: 1501px)').matches) {
      offsetMinusSection = 700;
    }

    let skills1Offset = offset(skills1) - offsetMinusSection - 150;
    let skills2Offset = offset(skills2) - offsetMinusSection;
    let skills3Offset = offset(skills3) - offsetMinusSection;
    let skills4Offset = offset(skills4) - (offsetMinusSection + 100);

    if (winScroll < skills1Offset) {
      currentIndex = 0;
    }

    if (winScroll > skills1Offset) {
      currentIndex = 1;
    }

    if (winScroll > skills2Offset) {
      currentIndex = 2;
    }

    if (winScroll > skills3Offset) {
      currentIndex = 3;
    }

    if (winScroll > skills4Offset) {
      currentIndex = 4;
    }

    let arrayIndex = currentIndex - 1;

    const elWrapper = document.querySelector('.aera-dc-animation__left-lotties');

    if (currentIndex !== sauvIndex && currentIndex === 0) {
      TweenMax.to(elWrapper.children[0], 0.3, { opacity: 1 });
    }

    if (currentIndex !== sauvIndex) {
      // forward animation
      if (currentIndex > sauvIndex && currentIndex >= 0 && currentIndex <= 4) {
        bodyMovinAnimation(arrayIndex, 1, 0);
        itemPlayed = arrayIndex;
      } else if (currentIndex > sauvIndex && currentIndex === 4 && itemPlayed !== 3) {
        bodyMovinAnimation(3, 1, 0);
        itemPlayed = 3;
      }

      // backward animation
      if (currentIndex < sauvIndex && currentIndex >= 1 && currentIndex <= 3) {
        bodyMovinAnimation(currentIndex, -1, animArray[arrayIndex].totalFrames);
        itemPlayed = arrayIndex;
      } else if (currentIndex < sauvIndex && currentIndex === 0 && sauvIndex === 1) {
        bodyMovinAnimation(0, -1, animArray[0].currentFrame);
        itemPlayed = 0;
      }

      if (currentIndex < 4) {
        switchTexture(currentIndex, sauvIndex);
      }
    }

    sauvIndex = currentIndex;
  });

  function bodyMovinAnimation(index, direction, frame) {
    const animation = animArray[index];
    const elWrapper = document.querySelector('.aera-dc-animation__left-lotties');

    if (!animation) return;

    TweenMax.killTweensOf(elWrapper.children);
    TweenMax.to(elWrapper.children, 0.2, { opacity: 0 });
    TweenMax.to(elWrapper.children[index], 0.2, { opacity: 1 });
    animation.setDirection(direction);
    animation.goToAndStop(frame, true);
    animation.setSpeed(1.8);
    animation.play();
  }

  function offset(el) {
    let rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }
}

if (window.matchMedia('(min-width: 767px)').matches) {
  decisionCloudAnimation();
}
