
const moonImage = './src/assets/lroc_color_poles_1k.jpg';
const moonImage2 = './src/assets/ldem_3_8bit.jpg';

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(moonImage);
const displacementMap = textureLoader.load(moonImage2);
const moonGeometry = new THREE.SphereGeometry(10, 50, 50);
const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
    displacementMap: displacementMap,
    displacementScale: 0.06,
    bumpMap: displacementMap,
    bumpScale: 0.04,
    reflectivity: 0,
    shininess: 0
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-50, 120, -250);
export { moon };
