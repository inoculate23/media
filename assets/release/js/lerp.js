import * as THREE from 'https://inoculate.media/assets/release/js/build/three'
import { OrbitControls } from 'https://inoculate.media/assets/release/js/jsm/OrbitControls.js'
import Stats from 'https://inoculate.media/assets/release/js/jsm/stats.module.js'
let camera, scene, renderer;

let t = 0;

const day = new THREE.Color(0xB8F4FF);
const duskdawn = new THREE.Color(0xFF571F);

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    scene = new THREE.Scene();
    scene.background = new THREE.Color();

    const geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function animate() {
    requestAnimationFrame(animate);

    t += 0.01;

    scene.background.copy(day).lerp(duskdawn, 0.5 * (Math.sin(t) + 1));

    renderer.render(scene, camera);

}