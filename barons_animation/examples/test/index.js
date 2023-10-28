// Create an empty scene, needed for the renderer
const scene = new THREE.Scene();
// Create a camera and translate it
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 1, 2);

// Create a WebGL renderer and enable the antialias effect
const renderer = new THREE.WebGLRenderer({ antialias: true });
// Define the size and append the <canvas> in our document
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls to allow the user to move in the scene
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create a cube with basic geometry & material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x66ccff,
  wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

/// Render the scene on each frame
function render () {  
  // Rotate the cube a little on each frame
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(render);