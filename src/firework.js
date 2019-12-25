import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap/TweenMax';

// 烟花
function genFirework(x, y, z, c) {
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 50; i++) {
        const color = c || new THREE.Color(Math.random() * 0xffffff);
        const fire = new THREE.Vector3(x, y, z);
        fire.startPosition = { x, y, z };
        fire.endPosition = {
            x: THREE.Math.randInt(
                x - (22 + Math.random() * 22),
                x + (22 + Math.random() * 22)
            ),
            y: THREE.Math.randInt(
                y - (22 + Math.random() * 22),
                y + (22 + Math.random() * 22)
            ),
            z: THREE.Math.randInt(
                z - (22 + Math.random() * 22),
                z + (22 + Math.random() * 22)
            )
        };
        geometry.vertices.push(fire);
        geometry.colors.push(color);
    }
    const mesh = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({
            size: 2,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false
        })
    );
    const timeline = new TimelineMax({ paused: true });
    timeline.to({ percent: 1 }, 2, {
        percent: 100,
        onUpdateParams: ['{self}'],
        onUpdate: tl => {
            const progress = tl.progress();
            // console.log(progress);
            geometry.vertices.forEach(fire => {
                const { startPosition, endPosition } = fire;
                const { x, y, z } = startPosition;
                fire.x = x + (endPosition.x - x) * progress;
                fire.y = y + (endPosition.y - y) * progress;
                fire.z = z + (endPosition.z - z) * progress;
            });
            geometry.verticesNeedUpdate = true;
            // 修改透明度
            mesh.material.opacity = 1.25 - progress;
            mesh.material.colorsNeedUpdate = true;
        },
        onComplete: () => {},
        ease: Expo.easeOut
    });
    mesh.userData.animate = callback => {
        timeline.play();
        if (callback) {
            timeline.addCallback(callback);
        }
    };
    return mesh;
}

export { genFirework };
