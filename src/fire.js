import * as THREE from 'three';

const sx = 10;
const sy = 10;
const sz = 10;
const geometry = new THREE.Geometry();
for (let i = 0; i < 50; i++) {
    const x = THREE.Math.randInt(sx - 2, sx + 2);
    const y = THREE.Math.randInt(sy - 2, sy + 2);
    const z = THREE.Math.randInt(sz - 2, sz + 2);
    const fire = new THREE.Vector3(x, y, z);
    geometry.vertices.push(fire);
}
const material = new THREE.PointsMaterial({ color: 0x00ffff, size: 1 });
const fire = new THREE.Points(geometry, material);

export { fire };
