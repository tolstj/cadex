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
    const v1 = new THREE.Vector3(triangle.A[0], triangle.A[1], triangle.A[2]);
    const v2 = new THREE.Vector3(triangle.Pi[0], triangle.Pi[1], triangle.Pi[2]);
    const v3 = new THREE.Vector3(triangle['Pi+1'][0], triangle['Pi+1'][1], triangle['Pi+1'][2]);

    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);

    geom.faces.push(new THREE.Face3(0, 1, 2));
    geom.computeFaceNormals();

    const mesh = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());
    scene.add(mesh);
  });
  const height = triangulation[0].A[2];
  camera.position.z = height + 5;
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