import * as THREE from 'three';
import { TweenLite, TimelineLite, TimelineMax, Expo } from 'gsap/TweenMax';
import json from './assets/font.json';

const loader = new THREE.FontLoader();
const font = loader.parse(json);

const wishes = new THREE.Group();
wishes.castShadow = true;
wishes.receiveShadow = true;
const str = '新年好'.split('');
for (let i = 0; i < str.length; i++) {
    const textGeo = new THREE.TextGeometry(str[i], {
        font,
        size: 10,
        height: 1
    });
    //为每个点附上材质
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('rgb(255, 0, 0)')
    });
    const textMesh = new THREE.Mesh(textGeo, material);
    textMesh.castShadow = true;
    textMesh.receiveShadow = true;
    textMesh.position.set((i - 1) * 20, 0, 0);
    const timeline = new TimelineMax({ paused: true });
    timeline.to(textMesh.position, 1, {
        x: (i - 1) * 20,
        y: 10,
        z: 0,
        ease: Expo.easeInOut
    });
    textMesh.userData.key = 'wishes';
    textMesh.userData.animate = () => {
        timeline.play();
    };
    wishes.add(textMesh);
}
wishes.position.set(-7, 0, -20);
// wishes.rotation.x = -Math.PI / 8;
export { wishes };
