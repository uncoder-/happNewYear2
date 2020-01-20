import gsap from '../web_modules/gsap.js';
// const fontUrl = './src/assets/font.json';

const loader = new THREE.FontLoader();
const font = loader.parse(fontJson);

const wishes = [];
// wishes.castShadow = true;
wishes.receiveShadow = true;
const str = '身体健康万事如意'.split('');
for (let i = 0; i < str.length; i++) {
    const g = new THREE.Group();
    const textGeo = new THREE.TextGeometry(str[i], {
        font,
        size: 2.5,
        height: 1
    });
    //为每个点附上材质
    const material = new THREE.MeshStandardMaterial({
        color:
            i % 2 == 0
                ? new THREE.Color('rgb(242, 85, 0)')
                : new THREE.Color('rgb(242, 190, 69)')
    });
    const textMesh = new THREE.Mesh(textGeo, material);
    textMesh.castShadow = true;
    // 设置自转轴
    textMesh.position.set(-5, 0, -2);
    textMesh.userData.key = 'wishes';
    textMesh.userData.animate = () => {
        const tl = gsap.timeline();
        tl.to(textMesh.position, 1, {
            x: (i - 1) * 20,
            y: 10,
            z: 0,
            ease: 'expo.easeInOut'
        });
    };
    g.add(textMesh);
    wishes.push(g);
}

export { wishes };
