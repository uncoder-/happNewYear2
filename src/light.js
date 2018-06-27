import * as THREE from 'three';

// 灯光
export function createLight() {
    var group = new THREE.Group();
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight.position.set(0, 0, 1).normalize();
    group.add(dirLight);

    var pointLight = new THREE.PointLight(0xff0000, 1.5);
    pointLight.position.set(999, 999, 999);
    group.add(pointLight);
    return group;
}