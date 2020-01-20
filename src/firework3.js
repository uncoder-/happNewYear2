import gsap from '../web_modules/gsap.js';
const snow1 = './src/assets/snow-1.png';

// 烟花
function genFirework3(sx, sy, sz, c) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];
    const opacitys = [];
    const speeds = [];
    const particles = 100;
    for (let i = 0; i < particles; i++) {
        // 初始位置
        positions.push(sx, sy, sz);
        // speeds
        const a = THREE.Math.randFloat(-1, 1) * Math.PI;
        const b = THREE.Math.randFloat(-1, 1) * 0.5 * Math.PI;
        const velocityX = Math.cos(a) * Math.sin(b);
        const velocityY = Math.sin(a) * Math.sin(b);
        const velocityZ = (Math.random() < 0.5 ? -1 : 1) * Math.cos(b);
        speeds.push(velocityX, velocityY, velocityZ);
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
                    position[i] += speeds[i];
                    position[i + 1] += speeds[i + 1];
                    position[i + 2] += speeds[i + 2];
                    color[i] += speeds[i] / 12;
                    color[i + 1] += speeds[i + 1] / 12;
                    color[i + 2] += speeds[i + 2] / 12;
                }
                geometry.attributes.color.needsUpdate = true;
                geometry.attributes.position.needsUpdate = true;
            },
            ease: 'expo.out'
        }).to({ percent: 1 }, 0.75, {
            percent: 100,
            onUpdate: function() {
                const progress = this.progress();
                // 位置
                const position = geometry.attributes.position.array;
                for (let i = 0; i < position.length; i += 3) {
                    position[i] += speeds[i];
                    position[i + 1] -= 0.5 * 5 * progress * progress;
                    position[i + 2] += speeds[i + 2];
                }
                const opacitys = geometry.attributes.opacity.array;
                for (let i = 0; i < particles; i++) {
                    opacitys[i] = 0.5 - 0.5 * progress;
                }
                geometry.attributes.opacity.needsUpdate = true;
                geometry.attributes.position.needsUpdate = true;
            },
            onComplete: () => {
                if (callback) {
                    callback();
                }
            },
            ease: 'expo.easeOut'
        });
    };
    return mesh;
}

export { genFirework3 };
