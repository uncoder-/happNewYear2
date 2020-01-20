
const snow1 = './src/assets/snow-1.png';

// 参数
const distanceX = 2000;
const distanceY = 2000;
const distanceZ = 2000;

const getPosition = i => {
    let x = 0;
    let y = Math.random() * distanceY;
    let z = 0;
    switch (i) {
        case 0:
            x = Math.random() * distanceX;
            z = Math.random() * distanceZ;
            break;
        case 1:
            x = -Math.random() * distanceX;
            z = -Math.random() * distanceZ;
            break;
        case 2:
            x = -Math.random() * distanceX;
            z = Math.random() * distanceZ;
            break;
        case 3:
            x = Math.random() * distanceX;
            z = -Math.random() * distanceZ;
            break;
    }
    return [x, y, z];
};

const geometry = new THREE.Geometry();
for (let i = 0; i < 800; i++) {
    const index = Math.floor(i / 200);
    const position = getPosition(index);
    const snow = new THREE.Vector3(position[0], position[1], position[2]);
    snow.velocityY = THREE.Math.randInt(1.5, 2.2);
    snow.originPosition = position;
    geometry.vertices.push(snow);
}
const textureLoader = new THREE.TextureLoader();
const snowTexture = textureLoader.load(snow1);
const snowMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 30,
    map: snowTexture,
    // lights: true,
    // 带透明背景的图片需开启transparent
    transparent: true
    // 看情况而定,图片出现白边/黑边时设置为false
    // depthTest: false
});
const snows = new THREE.Points(geometry, snowMaterial);
function snowsAnimate(geometry, step) {
    geometry.vertices.forEach(snow => {
        let { x, y, velocityY, originPosition } = snow;
        // 自转圈圈
        if (y > -500) {
            snow.y = y - velocityY;
            snow.x = x - Math.sin((step / 360) * 2 * Math.PI);
        } else {
            snow.y = originPosition[1];
        }
    });
    geometry.verticesNeedUpdate = true;
}
export { snows, snowsAnimate };
