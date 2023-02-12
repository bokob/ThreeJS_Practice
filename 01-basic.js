import * as THREE from "../build/three.module.js";

class APP {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer; // 다른 곳에서 참조할 수 있게 한거임

		const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias 활성화하면 렌더링 할 때 계단현상 안나타남
		renderer.setPixelRatio(window.devicePixelRatio); // 화면 픽셀 비율 모니터 설정 까보면 그 값임
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer; // 다른 곳에서 참조할 수 있게 한거임

		const scene = new THREE.Scene();
		this._scene = scene;

		this._setupCamera();
		this._setupLight();
		this._setupModel();

		window.onresize = this.resize.bind(this);
		this.resize();

		requestAnimationFrame(this.render.bind(this));
	}

	_setupCamera() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.z = 2;
		this._camera = camera;
	}

	_setupLight() {
		const color = 0xffffff;
		const intensity = 1;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(-1, 2, 4);
		this._scene.add(light);
	}

	_setupModel() {
		const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로 세로 깊이
		const material = new THREE.MeshPhongMaterial({ color: 0x0aeb6b });

		const cube = new THREE.Mesh(geometry, material); // 객체 생성

		this._scene.add(cube);
		this._cube = cube;
	}

	resize() {
		const width = this._divContainer.clientWidth;
		const height = this._divContainer.clientHeight;

		this._camera.aspect = width / height;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(width, height);
	}

	render(time) {
		this._renderer.render(this._scene, this._camera);
		this.update(time);
		requestAnimationFrame(this.render.bind(this));
	}

	update(time) {
		time *= 0.001;
		this._cube.rotation.x = time;
		this._cube.rotation.y = time;
	}
}

window.onload = function () {
	new APP();
};
