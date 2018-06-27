import * as THREE from 'three';

const width = window.innerWidth;
// 祝福语
export function wish(font, text, x, y, z, delay) {
    var group = new THREE.Group();
    var textGeo = new THREE.TextGeometry(text, {
        font: font,
        size: 100,
        height: 4
    });
    //为每个点附上材质
    var material = new THREE.SpriteMaterial({
        color: 0xFF0000
    });
    var vl = textGeo.vertices.length;
    for (var i = 0; i < vl; i++) {
        if (i % 4 == 0) {
            var particle = new THREE.Sprite(material);
            particle.position.x = width / 2 + 80;
            particle.position.y = 80;
            particle.position.z = z;
            particle.scale.set(2, 2);
            //为每个点加动画
            var timerandom = 1 * Math.random();
            TweenLite.to(
                particle.position,
                timerandom,
                {
                    x: textGeo.vertices[i].x,
                    y: textGeo.vertices[i].y,
                    z: textGeo.vertices[i].z,
                    delay: 2
                }
            );
            group.add(particle);
        }
    }
    console.log(group.children.length)
    return group;
}
export function createWish(font) {
    var group = new THREE.Group();
    var textGeo = new THREE.TextGeometry('小傻师哥', {
        font: font,
        size: 45,
        height: 10
    });
    var materials = [
        new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
        new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];
    var textMesh1 = new THREE.Mesh(textGeo, materials);
    textMesh1.position.set(0, 600, 0);
    textMesh1.rotation.y = 0.1 * Math.PI;
    textMesh1.position.x = -250;
    group.add(textMesh1);
    return group;
}
export function createWish2(font) {
    var group = new THREE.Group();
    var one = wish(font, '小傻师哥', -width / 2, 600, 0, 1);
    // var two = wish(font, '祝大家:', -width / 2, 600, 0, 1);
    // var three = wish(font, '身体健康', -width / 2, 600, 0, 1);
    // var four = wish(font, '万事如意', -width / 2, 600, 0, 1);
    one.position.set(-width / 2 - 210, 555, 0);
    one.rotation.set(0, 0.25 * Math.PI, 0);
    // two.position.set(-width / 2, 500, 0);
    // three.position.set(-width / 2, 400, 0);
    // four.position.set(-width / 2, 300, 0);
    group.add(one);
    // group.add(two);
    // group.add(three);
    // group.add(four);
    return group;
}