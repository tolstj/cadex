import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';

let camera, scene, renderer;
let controls;

export function display3d() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  controls = new OrbitControls( camera, renderer.domElement );
}

function animation() {
  controls.update();
  renderer.render(scene, camera);
}

export function renderNewCone(triangulation) {
  clearThree(scene);
  triangulation.forEach((triangle) => {
    const geom = new THREE.Geometry();

    geom.vertices.push(
      new THREE.Vector3(triangle.A.x, triangle.A.y, triangle.A.z),
      new THREE.Vector3(triangle.Pi.x, triangle.Pi.y, triangle.Pi.z),
      new THREE.Vector3(triangle['Pi+1'].x, triangle['Pi+1'].y, triangle['Pi+1'].z),
    );

    const face = new THREE.Face3(0, 1, 2);
    face.vertexNormals.push(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(triangle.Pi.normal.x, triangle.Pi.normal.y, triangle.Pi.normal.z),
      new THREE.Vector3(triangle['Pi+1'].normal.x, triangle['Pi+1'].normal.y, triangle['Pi+1'].normal.z),
    );
    geom.faces.push(face);

    const mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({
      color: 0x00FF00,
      side: THREE.DoubleSide,
    }));
    scene.add(mesh);
  });

  const height = triangulation[0].A.z;
  camera.position.z = height + 5;
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(5, 5, 5);
  scene.add(light);
}

function clearThree(obj) {
  while(obj.children.length > 0){ 
    clearThree(obj.children[0])
    obj.remove(obj.children[0]);
  }
  if(obj.geometry) obj.geometry.dispose()
  if(obj.material) obj.material.dispose()
  if(obj.texture) obj.texture.dispose()
}  
