import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import GUI from "lil-gui";

const gui = new GUI();
const canvas = document.getElementById("canvas");
const sizes = { width: window.innerWidth, height: window.innerHeight };
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
camera.position.z = 10;

const ambientLight = new THREE.AmbientLight(0xffffff, 10);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);
directionalLight.castShadow = false;
directionalLight.position.set(0, 5, 9);
directionalLight.rotation.set(0, 2, 0);

// helper

const direcitonalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
  0xff0000
);
scene.add(direcitonalLightHelper);
const pointLight = new THREE.PointLight(0xffffff, 1);
scene.add(pointLight);
pointLight.position.set(-2.78, 0.66, 5.25);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 1, 0xff0000);
scene.add(pointLightHelper);

const loader = new GLTFLoader();
let model;
loader.load("./lens.gltf", (gltf) => {
  model = gltf.scene;
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.metalness = 0.9;
      child.material.roughness = 0.76;

      const materialFolder = gui.addFolder(`Material: ${child.name}`);
      materialFolder
        .add(child.material, "metalness", 0, 1, 0.01)
        .name("Metalness");
      materialFolder
        .add(child.material, "roughness", 0, 1, 0.01)
        .name("Roughness");
    }
  });
  scene.add(model);
});

const controls = new OrbitControls(camera, canvas);
controls.enableZoom = true;
controls.enableDamping = true;

const tick = () => {
  requestAnimationFrame(tick);
  controls.update();
  renderer.render(scene, camera);
};

tick();

// directional Light Controller
const directionalLightControl = gui.addFolder("directional light");
directionalLightControl
  .add(directionalLight.position, "x", -10, 10)
  .name("position x");
directionalLightControl
  .add(directionalLight.position, "y", -10, 10)
  .name("position y");
directionalLightControl
  .add(directionalLight.position, "z", -10, 20)
  .name("position z");
directionalLightControl
  .add(directionalLight.rotation, "x", -10, 20)
  .name("rotation x");
directionalLightControl
  .add(directionalLight.rotation, "y", -10, 20)
  .name("rotation y");
directionalLightControl
  .add(directionalLight.rotation, "z", -10, 20)
  .name("rotation z");
directionalLightControl
  .add(directionalLight, "intensity", -10, 10)
  .name("강도");

const pointLightControl = gui.addFolder("point light");
pointLightControl.add(pointLight.position, "x", -10, 10).name("position x");
pointLightControl.add(pointLight.position, "y", -10, 10).name("position y");
pointLightControl.add(pointLight.position, "z", -10, 20).name("position z");
pointLightControl.add(pointLight, "intensity", -10, 10).name("강도");
