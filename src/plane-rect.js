import * as THREE from 'three';

const topLeft = new THREE.Color(0x00ffff);
const topRight = new THREE.Color(0xffffff);
const bottomRight = new THREE.Color(0xff00ff);
const bottomLeft = new THREE.Color(0xffffff);
const data = new Uint8Array([
    Math.round(bottomLeft.r * 255),
    Math.round(bottomLeft.g * 255),
    Math.round(bottomLeft.b * 255),
    Math.round(bottomRight.r * 255),
    Math.round(bottomRight.g * 255),
    Math.round(bottomRight.b * 255),
    Math.round(topLeft.r * 255),
    Math.round(topLeft.g * 255),
    Math.round(topLeft.b * 255),
    Math.round(topRight.r * 255),
    Math.round(topRight.g * 255),
    Math.round(topRight.b * 255)
]);
const backgroundTexture = new THREE.DataTexture(data, 2, 2, THREE.RGBFormat);
backgroundTexture.magFilter = THREE.LinearFilter;
backgroundTexture.needsUpdate = true;
const material = new THREE.MeshStandardMaterial({
    // color: 0xffffff,
    map: backgroundTexture
});
const geometry = new THREE.BoxBufferGeometry(100, 1, 100);
const mesh = new THREE.Mesh(geometry, material);
mesh.receiveShadow = true;
mesh.position.set(0, -2, 0);

export default mesh;
