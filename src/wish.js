import * as THREE from 'three';
const initConfig = require('./config');
// 祝福语
export function Wish(font, text, delay) {
    const group = new THREE.Group();
    const textGeo = new THREE.TextGeometry(text, {
        font: font,
        size: 100,
        height: 4
    });
    //为每个点附上材质
    const material = new THREE.SpriteMaterial({
        color: 0xFF0000
    });
    const tv = textGeo.vertices;
    for (let i = 0; i < tv.length; i++) {
        if (i % 4 == 0) {
            const particle = new THREE.Sprite(material);
            particle.position.x = 50;
            particle.position.y = 50;
            particle.position.z = 0;
            particle.scale.set(2, 2);
            //为每个点加动画
            const timerandom = 3 * Math.random();
            TweenLite.to(
                particle.position,
                timerandom,
                {
                    x: tv[i].x,
                    y: tv[i].y,
                    z: tv[i].z,
                    delay: 0
                }
            );
            group.add(particle);
        }
    }
    // console.log(group.children.length)
    return group;
}
export function createWish(font) {
    const group = new THREE.Group();
    const textGeo = new THREE.TextGeometry('小傻师哥', {
        font: font,
        size: 45,
        height: 10
    });
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];
    const textMesh1 = new THREE.Mesh(textGeo, materials);
    textMesh1.position.set(0, 600, 0);
    textMesh1.rotation.y = 0.1 * Math.PI;
    textMesh1.position.x = -250;
    group.add(textMesh1);
    return group;
}
export function createWish2(font, i) {
    const wishes = ['小', '傻', '师', '哥'];
    const { x, y, z } = initConfig.rocketPosition[i];
    let wish = Wish(font, wishes[i], x, y, z);
    wish.position.set(x - 50 - 10 * i, y - 50, z);
    wish.rotation.set(0, 0.25 * Math.PI, 0);
    return wish;
}