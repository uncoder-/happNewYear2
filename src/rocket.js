import * as THREE from 'three';
import { TweenLite, TimelineLite, TimelineMax, Expo } from 'gsap/TweenMax';

function Rocket() {
    // 火箭体
    const gb = new THREE.CylinderGeometry(4, 4, 6, 16);
    const gbm = new THREE.MeshStandardMaterial({
        color: new THREE.Color('rgb(255,0,0)')
    });
    const body = new THREE.Mesh(gb, gbm);
    body.castShadow = true;
    body.receiveShadow = true;
    // 火箭尾巴
    return body;
}

const rocket = new Rocket();
rocket.position.set(0, 0, 20);
rocket.userData.key = 'rocket';
export { rocket };
