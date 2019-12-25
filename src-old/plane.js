import * as THREE from 'three';

// 地面
export function createPlane() {
    var x = 0, y = 0;

    var heartShape = new THREE.Shape();

    heartShape.moveTo(x + 5, y + 5);
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

    var geometry = new THREE.ShapeBufferGeometry(heartShape);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff2200
    });
    var plane = new THREE.Mesh(geometry, material);
    // 以自身中心为旋转轴，绕 x 轴顺时针旋转 45 度
    plane.rotation.x = 1.5 * Math.PI;
    plane.rotation.z = -0.75 * Math.PI;
    plane.scale.set(50, 30, 30);
    plane.position.set(70, 0, -35);
    return plane;
}
