import * as THREE from 'three';
import snow1 from './textures/snow-1.png';
import snow2 from './textures/snow-2 2.png';

const height = window.innerHeight;
// 雪花
export function createSnow() {
    var snow = [];
    var materials = [];
    // 几何形状
    var geometry = new THREE.Geometry();
    for (i = 0; i < 1000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
    }
    // 参数
    var parameters = [6.5, 5.5, 4.5, 3.5, 2.5];
    // 雪花
    var textureLoader = new THREE.TextureLoader();
    var sprite = textureLoader.load(snow1);
    for (i = 0; i < parameters.length; i++) {
        var size = parameters[i] * 5;
        materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, depthTest: false, transparent: true });
        var particles = new THREE.Points(geometry, materials[i]);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        console.log("particles", particles)
        snow.push(particles)
    }
    return snow;
}
// 雪花2
export function createSnow2() {
    var group = new THREE.Group();
    // 参数
    var textureLoader = new THREE.TextureLoader();
    var mapA = textureLoader.load(snow1);
    var mapB = textureLoader.load(snow2);
    for (let i = 0; i < 555; i++) {
        // 材质
        var spriteMaterial = new THREE.SpriteMaterial({ map: Math.floor(Math.random() * 10) > 5 ? mapA : mapB, color: 0xffffff });
        // 雪花
        var sprite = new THREE.Sprite(spriteMaterial);
        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 2000 - 1000;
        var z = Math.random() * 2000 - 1000;
        // 初始位置坐标
        sprite.position.set(x, y, z);
        // 存储延迟移动时间
        sprite.delayMoveTime = Math.round(Math.random() * height);
        // 存储计算值，方便动画时候计算
        sprite.delayCount = 0;
        // 存储原始坐标
        sprite.originPosition = { x: x, y: y, z: z };
        // 精灵大小
        // sprite.scale.set(50, 50, 5);
        group.add(sprite);
    }
    return group;
}
