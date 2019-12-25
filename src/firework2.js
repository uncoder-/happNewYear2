import * as THREE from 'three';
import { TimelineMax, Expo } from 'gsap/TweenMax';
import snow1 from './assets/snow-1.png';
// 粒子
function Particle() {}

// 烟花
function genFirework2(sx, sy, sz, c) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const endPositions = [];
    const colors = [];
    const sizes = [];
    const particles = 50;
    const r = 50;
    for (let i = 0; i < particles; i++) {
        const x = THREE.Math.randInt(
            sx - Math.random() * r,
            sx + Math.random() * r
        );
        const y = THREE.Math.randInt(
            sy - Math.random() * r,
            sy + Math.random() * r
        );
        const z = THREE.Math.randInt(
            sz - Math.random() * r,
            sz + Math.random() * r
        );
        positions.push(0, sy, sz);
        endPositions.push(x, y, z);
        // colors
        colors.push(c.r, c.g, c.b);
        sizes.push(20);
    }
    geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute(
        'size',
        new THREE.Float32BufferAttribute(sizes, 1).setUsage(
            THREE.DynamicDrawUsage
        )
    );
    const mesh = new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: {
                    value: new THREE.TextureLoader().load(snow1)
                }
            },
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader')
                .textContent,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        })
    );
    const timeline = new TimelineMax({ paused: true });
    timeline.to({ percent: 1 }, 2, {
        percent: 100,
        onUpdateParams: ['{self}'],
        onUpdate: tl => {
            const progress = tl.progress();
            // console.log(progress);
            // 大小
            const sizes = geometry.attributes.size.array;
            for (let i = 0; i < particles; i++) {
                sizes[i] = 20 - 20 * progress;
            }
            geometry.attributes.size.needsUpdate = true;
            // 位置
            const positions = geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const endX = endPositions[i];
                const endY = endPositions[i + 1];
                const endZ = endPositions[i + 2];
                // const vy = 2 * sinA;
                // const vx = 2 * cosA * cosB;
                // const vz = 2 * cosA * sinB;
                positions[i] = endX * progress;
                positions[i + 1] = sy + (endY - sy) * progress;
                positions[i + 2] = sz + (endZ - sz) * progress;
            }
            geometry.attributes.position.needsUpdate = true;
        },
        onComplete: () => {
            // console.log(
            //     'geometry',
            //     geometry.attributes.position.array.length,
            //     endPositions.length
            // );
        },
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

export { genFirework2 };
