

// 地面
const x = 0;
const y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

const extrudeSettings = {
    steps: 2,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2
};

const geometry = new THREE.ExtrudeBufferGeometry(heartShape, extrudeSettings);
const topLeft = new THREE.Color(0xc77a3a);
const topRight = new THREE.Color(0xffeedd);
const bottomRight = new THREE.Color(0xc77a3a);
const bottomLeft = new THREE.Color(0xff2200);
const data = new Uint8Array([
    Math.round(bottomLeft.r * 255),
    Math.round(bottomLeft.g * 255),
    Math.round(bottomLeft.b * 255),
    Math.round(bottomRight.r * 255),
    Math.round(bottomRight.g * 255),
    Math.round(bottomRight.b * 255),
    Math.round(topLeft.r * 255),
    Math.round(topLeft.g * 255),
    Math.round(topLeft.b * 255),
    Math.round(topRight.r * 255),
    Math.round(topRight.g * 255),
    Math.round(topRight.b * 255)
]);
const backgroundTexture = new THREE.DataTexture(data, 1, 1, THREE.RGBFormat);
backgroundTexture.magFilter = THREE.LinearFilter;
backgroundTexture.needsUpdate = true;
const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color('rgb(242, 190, 69)'),
    // map: backgroundTexture
});
const plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;

// 以自身中心为旋转轴，绕 x 轴顺时针旋转 45 度
plane.rotation.x = 1.5 * Math.PI;
// plane.rotation.z = -0.75 * Math.PI;
plane.scale.set(3, 3, 3);
plane.position.set(-15, -4, 30);

export default plane;
