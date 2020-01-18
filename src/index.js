import * as THREE from 'three';
import Stats from 'stats.js';
const OrbitControls = require('three-orbit-controls')(THREE);
// 地板
import { lightGroup } from './light';
import { moon } from './moon';
import plane from './plane-heart';
import { snows, snowsAnimate } from './snow';
import { wishes } from './wish';
import { rocket } from './rocket';
import { genFirework } from './firework';
import { genFirework2 } from './firework2';
import { genFirework3 } from './firework3';
import { genFirework4 } from './firework4';
import { genHeart } from './heart';
import { initAudio, play } from './audio';

window.onload = async function() {
    const audioAshData = await initAudio('./assets/ash (mp3cut.net).mp3');
    const audioBoomData = await initAudio('./assets/pow1.mp3');
    // 状态
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    // 透视摄像机
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        4000
    );
    camera.position.set(0, 66, 170);
    // camera.up.set(0, 0, 0);
    // camera.lookAt(0, 0, 0);

    // 场景
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 0.1);
    // scene.background = new THREE.Color('red');
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setClearColor('#000000');
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 开启阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // 拖拽交互
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 50, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.update();
    // 辅助线
    const axisHelper = new THREE.AxesHelper(1000);
    scene.add(axisHelper);
    // 辅助网格对象
    const gridHelper = new THREE.GridHelper(300, 300);
    // scene.add(gridHelper);

    // start
    scene.add(lightGroup);
    scene.add(moon);
    scene.add(plane);
    scene.add(snows);
    scene.add(wishes);
    scene.add(rocket);
    // scene.add(fire);
    // end

    let step = 1;
    function animate() {
        stats.begin();
        snowsAnimate(snows.geometry, step);
        renderer.render(scene, camera);
        // controls.update();
        step++;
        stats.end();
        requestAnimationFrame(animate);
    }
    animate();

    // event listener
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    window.addEventListener('mousedown', event => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            const { object } = intersects[0];
            const { userData } = object;
            if (userData.key === 'rocket') {
                const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
                const endY = THREE.Math.randInt(70, 90);
                const heart = genHeart(0, 0, 0, endY, color);
                scene.add(heart);
                // 音频
                play(audioAshData);
                heart.userData.animate(() => {
                    scene.remove(heart);
                    play(audioBoomData);
                    const firework =
                        Math.random() < 0.5
                        // false
                            ? genFirework3(0, endY, 0, color)
                            : genFirework4(0, endY, 0, color);
                    scene.add(firework);
                    firework.userData.animate(() => {
                        scene.remove(firework);
                    });
                });
            } else if (userData.key === 'wishes') {
                userData.animate();
            }
        }
    });

    // Observe a scene or a renderer
    if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
        __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent('observe', { detail: scene })
        );
        __THREE_DEVTOOLS__.dispatchEvent(
            new CustomEvent('observe', { detail: renderer })
        );
    }
};
