import * as THREE from 'three';
import bao from './assets/baozhu-32267914_3.jpg';

function Rocket() {
    // 火箭体
    const geometry = new THREE.CylinderGeometry(
        5,
        5,
        10,
        64,
        1,
        false,
        0,
        Math.PI * 2
    );
    const textureLoader = new THREE.TextureLoader();
    const baozhuTexture = textureLoader.load(bao);
    baozhuTexture.wrapS = THREE.RepeatWrapping;
    baozhuTexture.wrapT = THREE.RepeatWrapping;
    baozhuTexture.repeat.set(3, 1);
    const materials = [
        new THREE.MeshStandardMaterial({
            map: baozhuTexture
            // side: THREE.DoubleSide
        }),
        new THREE.MeshPhongMaterial({ color: 0xff2200 }),
        new THREE.MeshPhongMaterial({ color: 0xff2200 })
    ];
    const body = new THREE.Mesh(geometry, materials);
    body.rotation.y = Math.PI / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    // 火箭尾巴
    return body;
}

const rocket = new Rocket();
rocket.position.set(0, 4, 0);
rocket.userData.key = 'rocket';
export { rocket };
