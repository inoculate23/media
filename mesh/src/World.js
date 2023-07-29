import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

console.log("WARNING: sandbox.config.json.infiniteLoopProtection = false");

/* 
Credit where credit is due:
https://discoverthreejs.com/ content helped me to strucutre this code
https://discourse.threejs.org/ helped to debug the code
https://threejs.org/docs/#api/en/core/Raycaster - Raycaster normailization code
*/

/* 
- This is the clock for the scene.
- It contains the updateables array, with each element is a object to be animated
- Each object on the screen should have a tick method that defines how it should be animated
- This tick function accepts the delta (time between frames) and total time since clock started
*/
class renderClock {
  constructor(camera, scene, renderer) {
    this._camera = camera;
    this._scene = scene;
    this._renderer = renderer;
    // Contains a list of all items that need to be animated each render
    this.updateables = [];
    this.clock = new THREE.Clock();
  }
  start() {
    // Use setAnimationLoop instead of requestAnimationFrame to deal with WebXR Device API
    this._renderer.setAnimationLoop(() => {
      this.tickManager();
      // console.log("Rendering");
      this._renderer.render(this._scene, this._camera);
    });
  }
  stop() {
    this._renderer.setAnimationLoop(null);
  }
  tickManager() {
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.elapsedTime;
    for (let obj of this.updateables) {
      obj.tick(delta, elapsedTime);
    }
  }
}
/* 
- This is the entire scene itself in one package
- Each aspect, weather it be a camera or light, is a method of this class.
- This is very basic. More complex creation of light systems would be their own classes,
in their own files if needed. This is just a basic scene setup.
- The container is passed into the class. 
- Notice how I use a #app container. Orbit controls uses the container to add click and 
drag event listerns.If you used the body element as the container, dat.gui would not work nor any other
interactive html on the rest of the page
*/
export default class WorldTemplate {
  constructor(container) {
    // Basic scene setup
    this._container = container;
    this._scene = new THREE.Scene();
    this._renderer = this._createRenderer();
    this._container.append(this._renderer.domElement);
    this._camera = this._createCamera();
    this._camera.position.set(2, 2, 2);
    this._renderClock = new renderClock(
      this._camera,
      this._scene,
      this._renderer
    );
    this._controls = this._createOrbitControls();
    this._renderClock.updateables.push(this._controls);
    // If the lights were animated, they would be added to updateables.
    this._lights = this._createLights();
    this._scene.add(...this._lights);
    // Create sidebar controlls
    this._GUI = new GUI();
    // This function is where all of the object creation on the screen should go
    this._createDisplay();
    // Create a raycaster. Raycasters are laggy on planes of high amounts of vertices,
    // so don't use a raycaster with thie _createDisplay() default plane
    // this._createRayCaster(this._rayCastCallback);
  }
  _createDisplay() {
    let plane = this._createPlane();
    this._renderClock.updateables.push(plane);
    this._scene.add(plane);
  }
  _createCamera() {
    return new THREE.PerspectiveCamera(
      75,
      this._container.clientWidth / this._container.clientHeight,
      0.1,
      1000
    );
  }
  _rayCastCallback(intersects) {
    // Do what you want with the raycasted items here
    console.log(intersects);
  }
  // Callback is where the interescting objects are passed into
  _createRayCaster(callback) {
    this._pointer = new THREE.Vector2();
    this._raycaster = new THREE.Raycaster();
    window.addEventListener("pointerdown", (event) => {
      // Normalize the pointer coordinates from -1 and 1
      this._pointer.x = (event.clientX / this._container.clientWidth) * 2 - 1;
      this._pointer.y = -(event.clientY / this._container.clientHeight) * 2 + 1;
      // Calculate the intersecting object using cameara position
      this._raycaster.setFromCamera(this._pointer, this._camera);
      // pass objects into callback
      callback(this._raycaster.intersectObjects(this._scene.children));
    });
  }
  _createOrbitControls() {
    const controls = new OrbitControls(this._camera, this._container);
    controls.enableDamping = true;
    // Enable the dampening requires update each frame
    controls.tick = () => controls.update();
    return controls;
  }
  _createLights() {
    // Creates all the lights for the scene
    const dir = new THREE.DirectionalLight();
    dir.position.set(10, 10, 10);
    const amb = new THREE.HemisphereLight(0x0ffff0, 0x6d6e6d, 0.7);
    return [dir, amb];
  }
  _createRenderer() {
    const renderer = new THREE.WebGL1Renderer({
      antialias: true,
      physicallyCorrectLights: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(this._container.clientWidth, this._container.clientHeight);
    return renderer;
  }
  _createCube() {
    // Creates a single rotating cube.
    const material = new THREE.MeshStandardMaterial({
      color: 0x0f0fff
    });
    const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
    const mesh = new THREE.Mesh(geometry, material);
    // Example of a tick function. Uses delta so the animation is event across all frame rates
    mesh.tick = (delta, elapsedTime) => {
      mesh.rotation.x += delta * 0.1 * Math.sin(elapsedTime) * 20;
      mesh.rotation.y += delta * 0.1 * Math.sin(elapsedTime) * 15;
      mesh.rotation.z += delta * 0.1 * Math.sin(elapsedTime) * 10;
    };
    return mesh;
  }
  /// _createPlane  is a example of intergrating dat.gui with a three object
  _createPlane() {
    // This object contains all of the values for my dat.gui popup. They are controller values.
    let planeSpecs = {
      scaler: 1,
      speed: 1,
      sinXY: true,
      sinX: false,
      sinY: false
    };
    let planeMat = new THREE.MeshStandardMaterial({
      color: 0x663399,
      side: THREE.DoubleSide,
      wireframe: true
    });
    // The parameters are; width, height, segmentsWidth, segmentsHeight
    let planeGeo = new THREE.PlaneGeometry(50, 50, 250, 250);
    var plane = new THREE.Mesh(planeGeo, planeMat);
    // Each folder can contain sub gui inputs. Folders help to organize large gui's
    const planeFolder = this._GUI.addFolder("Plane");
    planeFolder.add(planeSpecs, "scaler", 0.1, 10);
    planeFolder.add(planeSpecs, "speed", 0.1, 25);
    // Checkbox gui controllers are more complex, they require a event listerner.
    planeFolder
      .add(planeSpecs, "sinXY")
      .listen()
      .onChange((newValue) => {
        planeSpecs.sinXY = newValue;
      });
    planeFolder
      .add(planeSpecs, "sinX")
      .listen()
      .onChange((newValue) => {
        planeSpecs.sinX = newValue;
      });
    planeFolder
      .add(planeSpecs, "sinY")
      .listen()
      .onChange((newValue) => {
        planeSpecs.sinY = newValue;
      });
    planeFolder.open();
    // Rotates the plane 90 degrees. This is why the z varaible goes up and not the y.
    plane.rotation.set(Math.PI / 2, 0, 0);
    // Various equations to product the various types of sin waves
    const sinXY = (x, y, et, speed, scale) =>
      Math.sin(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + et * speed) * scale;
    const sinX = (x, et, speed, scale) => Math.sin(x + et * speed) * scale;
    // This animation function is a example of how a object's vertices can be accessed and manuplated
    plane.tick = (delta, elapsedTime) => {
      const { position } = planeGeo.attributes;
      for (let i = 0; i < position.count; i++) {
        let x = position.getX(i);
        let y = position.getY(i);
        let z = position.getZ(i);
        // Due to rotation, we change z and not y.
        // If you want some cool affects, change these values around so it adds to all three axis
        z = 0;
        if (planeSpecs.sinXY) {
          z += sinXY(x, y, elapsedTime, planeSpecs.speed, planeSpecs.scaler);
        }
        if (planeSpecs.sinX) {
          z += sinX(x, elapsedTime, planeSpecs.speed, planeSpecs.scaler);
        }
        if (planeSpecs.sinY) {
          z += sinX(y, elapsedTime, planeSpecs.speed, planeSpecs.scaler);
        }
        position.setXYZ(i, x, y, z);
      }
      position.needsUpdate = true;
    };
    return plane;
  }
  randomInt(min, max) {
    return Math.random() * (max - min) + min;
  }
  // For if rendering just 1 frame is needed.
  renderFrame() {
    this._renderer.render(this._scene, this._camera);
  }
  start() {
    this._renderClock.start();
  }
  stop() {
    this._renderClock.stop();
  }
}
