import * as THREE from "../build/three.module.js";

class APP {
	constructor() {
		const divContainer = document.querySelector("#webgl-container");
		this._divContainer = divContainer; // �ٸ� ������ ������ �� �ְ� �Ѱ���

		const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias Ȱ��ȭ�ϸ� ������ �� �� ������� �ȳ�Ÿ��
		renderer.setPixelRatio(window.devicePixelRatio); // ȭ�� �ȼ� ���� ����� ���� ��� �� ����
		divContainer.appendChild(renderer.domElement);
		this._renderer = renderer; // �ٸ� ������ ������ �� �ְ� �Ѱ���

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
		const geometry = new THREE.BoxGeometry(1, 1, 1); // ���� ���� ����
		const material = new THREE.MeshPhongMaterial({ color: 0x0aeb6b });

		const cube = new THREE.Mesh(geometry, material); // ��ü ����

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
