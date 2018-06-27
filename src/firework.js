import * as THREE from 'three';

// 烟花
function firework(x, y, z, delay) {
    var group = new THREE.Group();
    var geometry = new THREE.SphereGeometry(35, 32, 32);
    var vl = geometry.vertices.length;
    for (var i = 0; i < vl; i++) {
        if (i % 8 == 0) {
            //为每个点附上材质
            var material = new THREE.SpriteMaterial({
                color: 0xFF0000
            });
            var particle = new THREE.Sprite(material);
            particle.position.x = x;
            particle.position.y = y;
            particle.position.z = z;
            var size = Math.random() * 5 + 1;
            particle.scale.set(size, size);
            var timerandom = 1 * Math.random();
            //为每个点加动画
            TweenLite.to(
                particle.position,
                timerandom,
                {
                    x: geometry.vertices[i].x + (0.5 - Math.random()) * 88 + x,
                    y: geometry.vertices[i].y + y,
                    z: geometry.vertices[i].z + (0.5 - Math.random()) * 88 + z,
                    delay: delay
                }
            );
            group.add(particle);
        }
    }
    return group;
}
export function createFirework() {
    var group = new THREE.Group();
    var one = firework(200, 555, 0, 1);
    group.add(one);
    return group;
}