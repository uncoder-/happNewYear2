import * as THREE from 'three';
const initConfig = require('./config');
// 小火箭
function Rocket(x, y, z) {
    var group = new THREE.Group();
    // 火箭帽🚀
    var geometry = new THREE.ConeGeometry(7, 5, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var head = new THREE.Mesh(geometry, material);
    head.position.set(x, 10 + y, z);
    group.add(head);
    // 火箭体
    var geometry = new THREE.CylinderGeometry(5, 1, 8, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var body = new THREE.Mesh(geometry, material);
    body.position.set(x, 4 + y, z);
    group.add(body);
    // 火箭尾巴
    return group;
}
export function createRocket() {
    const group = [];
    for (let i = 0; i < initConfig.rocketPosition.length; i++) {
        const { x, y, z } = initConfig.rocketPosition[i];
        const rocket = Rocket(0, 0, 0);
        rocket.toPosition = {
            x, y, z
        }
        group.push(rocket);
    }
    return group;
}