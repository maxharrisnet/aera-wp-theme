import * as THREE from 'three';
import { gsap } from 'gsap';
import alphaTextureImg from '../../assets/images/background/texture-alpha.png';
import wireframeTextureImg from '../../assets/images/background/texture-wireframe.png';

// Nobody likes your console logs mr. THREE.bs
const consoleLog = console.log; // eslint-disable-line no-console
// eslint-disable-next-line no-console
console.log = (first, ...args) => (first !== 'THREE.WebGLRenderer') && consoleLog.call(console, first, ...args);

const COLOR_GRADIENTS = {
	green: ['#c0f4fe', '#fff3df'],
	blue: ['#d0e3fd', '#ecfffe'],
};

export default class WebglScene {
	constructor(container) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		// scene set up
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, this.width / this.height);
		this.camera.far = 10000;
		this.camera.position.z = 36;
		this.controls = null;
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		this.renderFlag = false;

		// canvas background to transparent
		this.renderer.setClearColor(0x000000, 0);

		// dom element
		this.container = container;

		// geometries
		this.nbVerticesPlane = 0;
		this.planeGeo1 = null;
		this.planeGeo2 = null;
		this.planeGeo3 = null;

		// materials
		this.material1 = null;
		this.material2 = null;
		this.material3 = null;

		// geometries var
		this.nbSegments = 64;
		this.lengthPlane = 90;
		this.widthPlane = 12;
		this.widthPlaneMini = 8;

		// groups
		this.globalGroup = new THREE.Group();

		// animation vars
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

		// mousemove
		this.mousemoveX = 0;
		this.mousemoveY = 0;
		this.mouse = { x: 0, y: 0 };

		// scroll
		this.scrollY = 0;
		this.y = {
			val1: 0, val2: 0, val3: 0, val4: 0, anim1: 0.65, anim2: 0.65, anim3: 0.65,
		};
		this.finalY = { val1: 0, val2: 0, val3: 0, val4: 0 };
		this.sauvScrollY = 0;

		// show hide helix
		this.helixActive = false;

		// functions
		this.resizeCanvas();
		this.createLights();
		this.createTextures();
		this.createGeometries();
		this.twistPlanes();

		this.renderScene(1);

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
		// loader util
		const textureLoader = new THREE.TextureLoader();
		textureLoader.crossOrigin = '';
		const textureAlpha = textureLoader.load(alphaTextureImg);
		const wireframeTexture = textureLoader.load(wireframeTextureImg);

		// green gradient texture
		const gradientGreen = new THREE.Texture(this.createGradient(...COLOR_GRADIENTS.green));
		gradientGreen.needsUpdate = true;
		this.material1 = new THREE.MeshBasicMaterial({
			map: gradientGreen,
			side: THREE.DoubleSide,
			transparent: true,
		});
		this.material1.alphaMap = textureAlpha;
		this.material1.alphaMap.magFilter = THREE.NearestFilter;

		// blue gradient texture
		const gradientBlue = new THREE.Texture(this.createGradient(...COLOR_GRADIENTS.blue));
		gradientBlue.needsUpdate = true;
		this.material2 = new THREE.MeshBasicMaterial({
			map: gradientBlue,
			side: THREE.DoubleSide,
			transparent: true,
		});
		this.material2.alphaMap = textureAlpha;
		this.material2.alphaMap.magFilter = THREE.NearestFilter;

		this.material3 = new THREE.MeshBasicMaterial({
			color: 0x94d3fd,
			side: THREE.DoubleSide,
			transparent: true,
			depthWrite: false,
		});
		this.material3.alphaMap = wireframeTexture;
		this.material3.alphaMap.magFilter = THREE.NearestFilter;
	}

	createGradient(leftColor, rightColor) {
		const canvas = document.createElement('canvas');
		canvas.width = 512;
		canvas.height = 512;

		// get context
		const context = canvas.getContext('2d');

		// draw gradient
		context.rect(0, 0, 512, 512);
		const gradient = context.createLinearGradient(0, 0, 512, 512);
		gradient.addColorStop(0, leftColor);
		gradient.addColorStop(1, rightColor);
		context.fillStyle = gradient;
		context.fill();

		return canvas;
	}

	createGeometries() {
		// first geometry
		this.planeGeo1 = new THREE.PlaneGeometry(
			this.widthPlane, this.lengthPlane, this.nbSegments, this.nbSegments,
		);
		const plane1 = new THREE.Mesh(this.planeGeo1, this.material1);
		plane1.rotation.y = Math.PI / 2;

		// second geometry
		this.planeGeo2 = new THREE.PlaneGeometry(
			this.widthPlane, this.lengthPlane, this.nbSegments, this.nbSegments,
		);
		const plane2 = new THREE.Mesh(this.planeGeo2, this.material2);
		plane2.rotation.y = Math.PI / 2;

		// third geometry
		this.planeGeo3 = new THREE.PlaneGeometry(
			this.widthPlaneMini, this.lengthPlane, this.nbSegments, this.nbSegments,
		);
		const plane3 = new THREE.Mesh(this.planeGeo3, this.material3);

		// nb vertices
		this.nbVerticesPlane = this.planeGeo1.vertices.length;

		this.globalGroup.add(plane1);
		this.globalGroup.add(plane2);
		this.globalGroup.add(plane3);
	}

	twistPlanes() {
		let flagCount = 0;
		let x1 = 0;
		let x2 = 0;
		let x3 = 0;

		let frame = 0;
		let j = this.nbVerticesPlane;
		let easing = 1;
		let t = 0;

		for (let i = 0; i < this.nbVerticesPlane; i++) {
			t = (1 / this.nbVerticesPlane) * j;
			easing = (((t -= 1) * t) * t) + 1;

			x1 = (this.planeGeo1.vertices[i].x * easing) + (Math.sin(1.45 + (frame / 8)) * (-6 * easing));
			x2 = (this.planeGeo2.vertices[i].x * easing) + (Math.sin(1.45 + (frame / 8)) * (8 * easing));
			x3 = (this.planeGeo3.vertices[i].x * easing) + (Math.sin(0.88 + (frame / -5)) * (3 * easing));

			this.planeGeo1.vertices[i].x = x1;
			this.planeGeo2.vertices[i].x = x2;
			this.planeGeo3.vertices[i].x = x3;

			if (flagCount === this.nbSegments) {
				frame += 1;
				flagCount = -1;
			}
			flagCount += 1;
			j -= 1;
		}
	}

	updateMouseMove(x, y) {
		this.mousemoveX = x;
		this.mousemoveY = y;
	}

	showHelix() {
		gsap.killTweensOf(this.y);
		this.renderFlag = true;

		// Using modern GSAP API with original ease values (Power2.easeIn maps to power2.in in GSAP v3+)
		gsap.to(this.y, { duration: 2, anim1: -0.45, ease: 'power2.in' });
		gsap.to(this.y, { duration: 1.9, anim2: -0.45, ease: 'power2.in' });
		gsap.to(this.y, { duration: 2.1, anim3: -0.45, ease: 'power2.in' });
	}

	hideHelix() {
		gsap.killTweensOf(this.y);

		gsap.to(this.y, { duration: 2, anim1: 0.65, ease: 'power2.out' });
		gsap.to(this.y, { duration: 2, anim2: 0.65, ease: 'power2.out' });
		gsap.to(this.y, {
			duration: 2,
			anim3: 0.65,
			ease: 'power2.out',
			onComplete: () => {
				this.renderFlag = false;
			},
		});
	}

	renderScene(myPixelRatio) {
		const { width, height } = this;
		this.renderer.sortObjects = true;

		this.renderer.setPixelRatio(myPixelRatio);
		this.renderer.setSize(width, height);
		this.container.appendChild(this.renderer.domElement);

		// Render for the first time to dont show black canvas.
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
		let t = 0;
		let easing = 0;
		let twistVar = 0;

		for (let i = 0; i < this.nbVerticesPlane; i++) {
			t = (1 / this.nbVerticesPlane) * k;
			easing = (((t -= 1) * t) * t) + 1;

			this.tWave1 = (Math.sin((this.frame / 400000) + (i / 10)) * (1.2 * easing));
			this.twist1 = Math.sin((this.flagCount + twistVar) / 45) * (-6 * easing) * (1 + this.mouse.y);
			this.tY1 = (1.2 + (Math.sin((j / 10)) * -10)) * (1 + this.mouse.x);

			this.tWave2 = (Math.sin((this.frame / 400000) + (i / 10)) * (1.2 * easing));
			this.twist2 = Math.sin((this.flagCount + twistVar) / 45) * (4 * easing) * (1 + this.mouse.y);
			this.tY2 = ((Math.sin(3.4 + (j / 10)) * -4)) * (1 + this.mouse.y);

			this.tWave3 = (Math.sin((this.frame / 400000) + (i / 10)) * (3 * easing));
			this.tY3 = ((Math.sin(3.4 + (j / -40)) * 6) + (18 * easing)) * (1 + this.mouse.x);

			this.planeGeo1.vertices[i].z = (this.tWave1 + this.twist1 + this.tY1) * easing;
			this.planeGeo1.verticesNeedUpdate = true;

			this.planeGeo2.vertices[i].z = (this.tWave2 + this.twist2 + this.tY2) * easing;
			this.planeGeo2.verticesNeedUpdate = true;

			this.planeGeo3.vertices[i].z = (this.tWave3 + this.tY3) * easing;
			this.planeGeo3.verticesNeedUpdate = true;

			if (this.flagCount === this.nbSegments) {
				j += 1;
				this.flagCount = -1;
			}
			twistVar += 0.1;
			this.flagCount += 1;
			this.frame += 1;
			k -= 1;
		}
	}

	mousemoveLoopAnimation() {
		this.mouse.x = (0.035 * ((this.mousemoveX / 7500) - this.mouse.x)) + this.mouse.x;
		this.mouse.y = (0.035 * ((this.mousemoveY / 7500) - this.mouse.y)) + this.mouse.y;

		this.globalGroup.rotation.y = this.mouse.x / 10;
	}

	scrollLoopAnimation() {
		const relativeValue = this.height * 0.65;
		// plane mask animation
		this.y.val1 = ((0.1 * (((this.scrollY / relativeValue) - this.y.val1))) + this.y.val1);
		this.y.val2 = (0.1 * (((this.scrollY / relativeValue) - this.y.val2))) + this.y.val2;
		this.y.val3 = (0.1 * (((this.scrollY / relativeValue) - this.y.val3))) + this.y.val3;

		// adding show hide animation
		this.finalY.val1 = this.y.val1 + this.y.anim1;
		this.finalY.val2 = this.y.val2 + this.y.anim2;
		this.finalY.val3 = this.y.val3 + this.y.anim3;

		// apply the values
		if (this.material1 !== null) {
			this.material1.map.offset.y = this.finalY.val1;
			this.material2.map.offset.y = this.finalY.val2;
			this.material3.alphaMap.offset.y = this.finalY.val3;
		}
	}

	helixYmovement() {
		// global group movement
		this.y.val4 = this.scrollY / (this.height * 0.025);

		this.globalGroup.position.y = this.y.val4;
	}

	render = () => {
		if (this.renderFlag) {
			this.renderer.render(this.scene, this.camera);

			if (this.controls !== null) {
				this.controls.update();
			}

			this.loopWaveAnimation();
			this.scrollLoopAnimation();
			this.mousemoveLoopAnimation();
			this.helixYmovement();
		}
		requestAnimationFrame(this.render);
	}
}
