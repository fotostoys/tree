//import './style.css'
//import * as THREE from 'three';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
//import { OrbitControls } from '/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(25);
//camera.position.setX(-3);
renderer.render(scene, camera);

const normal = new THREE.TextureLoader().load('normal.jpg');
const moona = new THREE.TextureLoader().load('moon.jpg');


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const material = new THREE.MeshStandardMaterial({ 
  //color: 0xff6347,
  color: 0x666ff7,
  map: moona,
  normalMap: normal, 
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//centra un rombo de iluminacion
const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
//scene.add(lightHelper);

//traza una linea horizontal
 const gridHelper = new THREE.GridHelper(200, 50);
 scene.add(lightHelper, gridHelper)

 // agrega una grilla al hacer clic y mover el mouse
 //const controls = new OrbitControls(camera, renderer.domElement);

 function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 48, 48);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);


// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
const jeffTexture = new THREE.TextureLoader().load('jeff.png');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);
scene.add(jeff);

// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

/*moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;*/



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();