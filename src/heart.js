import * as THREE from 'three';

function genHeart(sx, sy, sz, endY, color) {
    const heartShape = new THREE.Shape();
    const x = 0;
    const y = 0;
    heartShape.moveTo(x - 5, y - 5);
    heartShape.bezierCurveTo(x - 5, y - 5, x - 4, y, x, y);
    heartShape.bezierCurveTo(x + 6, y, x + 6, y - 7, x + 6, y - 7);
    heartShape.bezierCurveTo(x + 6, y - 11, x + 3, y - 15.4, x - 5, y - 19);
    heartShape.bezierCurveTo(x - 12, y - 15.4, x - 16, y - 11, x - 16, y - 7);
    heartShape.bezierCurveTo(x - 16, y - 7, x - 16, y, x - 10, y);
    heartShape.bezierCurveTo(x - 7, y, x - 5, y - 5, x - 5, y - 5);
    const geometry = new THREE.ExtrudeBufferGeometry(heartShape, {
        steps: 2,
        depth: 2,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 2
    });
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: color || new THREE.Color().setHSL(Math.random(), 1, 0.5)
    });
    // material.color.setHSL(Math.random(), 1, 0.5);
    // 拼接
    const heart = new THREE.Mesh(geometry, material);
    heart.scale.set(0.01, 0.01, 0.01);
    heart.position.set(sx, sy, sz);
    heart.userData.key = 'heart';
    // 动画
    const timeline = new TimelineMax({ paused: true });
    timeline.to({ percent: 1 }, 1, {
        percent: 100,
        onUpdateParams: ['{self}'],
        onUpdate: tl => {
            const progress = tl.progress();
            heart.position.set(sx, endY * progress, sz);
            heart.scale.set(
                0.01 + progress / 10,
                0.01 + progress / 4,
                0.01 + progress / 4
            );
        },
        ease: Expo.easeIn
    });
    heart.userData.animate = callback => {
        timeline.play();
        if (callback) {
            timeline.addCallback(callback);
        }
    };
    return heart;
}
export { genHeart };
