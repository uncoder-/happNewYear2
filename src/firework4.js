import gsap from '../web_modules/gsap.js';
const snow1 = './src/assets/yuanbao.png';

// Set friction.
const friction = 0.93;
// Set gravity.
const gravity = 0.7;
// 烟花
function genFirework4(sx, sy, sz, c) {
    const geometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const sizes = [];
    const opacitys = [];
    const speeds = [];
    const angles = [];
    const particles = 120;
    for (let i = 0; i < particles; i++) {
        // 初始位置
        positions.push(sx, sy, sz);
        // speeds
        const angleX = THREE.Math.randFloat(-1, 1) * Math.PI;
        const angleY = THREE.Math.randFloat(-1, 1) * Math.PI;
        const angleZ =
            (Math.random() < 0.5 ? -1 : 1) *
            THREE.Math.randFloat(-1, 1) *
            0.5 *
            Math.PI;
        angles.push(angleX, angleY, angleZ);
        const speed = THREE.Math.randFloat(-3, 3);
        speeds.push(speed);
        // colors
        colors.push(c.r, c.g, c.b);
        // scales
        sizes.push(20);
        // opacity
        opacitys.push(1.0);
    }
    geometry.addAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.addAttribute(
        'opacity',
        new THREE.Float32BufferAttribute(opacitys, 1)
    );
    const mesh = new THREE.Points(
        geometry,
        new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: {
                    value: new THREE.TextureLoader().load(snow1)
                }
            },
            vertexShader: document.getElementById('vertexshader2').textContent,
            fragmentShader: document.getElementById('fragmentshader2')
                .textContent,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        })
    );
    mesh.userData.animate = callback => {
        const tl = gsap.timeline();
        tl.to({ percent: 1 }, 0.75, {
            percent: 100,
            onUpdate: function() {
                const progress = this.progress();
                // 大小，透明度
                const sizes = geometry.attributes.size.array;
                const opacitys = geometry.attributes.opacity.array;
                for (let i = 0; i < particles; i++) {
                    sizes[i] = 24 - 20 * progress;
                    opacitys[i] = (2 - progress) / 2;
                }
                geometry.attributes.size.needsUpdate = true;
                geometry.attributes.opacity.needsUpdate = true;
                // 颜色
                const color = geometry.attributes.color.array;
                // 位置
                const position = geometry.attributes.position.array;
                for (let i = 0; i < position.length; i += 3) {
                    const angleX = angles[i];
                    const angleY = angles[i + 1];
                    const angleZ = angles[i + 2];
                    let speed = speeds[i / 3] * friction;
                    speeds[i / 3] = speed;
                    position[i] += speed * Math.cos(angleX);
                    position[i + 1] += speed * Math.sin(angleY) - gravity;
                    position[i + 2] += speed * Math.cos(angleZ);
                    color[i] += (speed * angleX) / 12;
                    color[i + 1] += (speed * angleY) / 12;
                    color[i + 2] += (speed * angleZ) / 12;
                }
                geometry.attributes.color.needsUpdate = true;
                geometry.attributes.position.needsUpdate = true;
            },
            onComplete: () => {
                if (callback) {
                    callback();
                }
            },
            ease: 'circ.out'
        });
    };
    return mesh;
}

export { genFirework4 };
