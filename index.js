/*
 * @Author: uncoder 
 * @Date: 2018-01-17 15:38:47 
 * @Last Modified by: uncoder
 * @Last Modified time: 2018-01-18 17:33:49
 */
// 获取浏览器窗口的宽高，后续会用
var width = window.innerWidth;
var height = window.innerHeight;
// 初始化 stats
function initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats;
}
// 坐标轴
function setAxis() {
    // 坐标轴
    var axisHelper = new THREE.AxesHelper(600);
    return axisHelper;
}
// 平面
function createPlane() {
    // 创建一个平面 PlaneGeometry(width, height, widthSegments, heightSegments)
    var planeGeometry = new THREE.PlaneGeometry(1550, 1550, 1, 1);

    // 创建 Lambert 材质：会对场景中的光源作出反应，但表现为暗淡，而不光亮。
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // 以自身中心为旋转轴，绕 x 轴顺时针旋转 45 度
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, -10.5, -20);
    return plane;
}
// 雪花
function createSnow() {
    var snow = [];
    var materials = [];
    // 几何形状
    var geometry = new THREE.Geometry();
    for (i = 0; i < 1000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
    }
    // 参数
    var parameters = [6.5, 5.5, 4.5, 3.5, 2.5];
    // 雪花
    var textureLoader = new THREE.TextureLoader();
    var sprite = textureLoader.load("textures/snow-1.png");
    for (i = 0; i < parameters.length; i++) {
        var size = parameters[i] * 5;
        materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, depthTest: false, transparent: true });
        var particles = new THREE.Points(geometry, materials[i]);
        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;
        console.log("particles", particles)
        snow.push(particles)
    }
    return snow;
}
// 雪花2
function createSnow2() {
    var group = new THREE.Group();
    // 参数
    var parameters = [6.5, 5.5, 4.5, 3.5, 2.5];
    var textureLoader = new THREE.TextureLoader();
    var mapA = textureLoader.load("textures/snow-1.png");
    for (i = 0; i < 1000; i++) {
        // 材质
        var spriteMaterial = new THREE.SpriteMaterial({ map: mapA, color: 0xffffff });
        // 雪花
        var sprite = new THREE.Sprite(spriteMaterial);
        var x = Math.random() * 2000 - 1000;
        var y = height;
        var z = Math.random() * 2000 - 1000;
        // 初始位置坐标
        sprite.position.set(x, y, z);
        // 存储延迟移动时间
        sprite.delayMoveTime = Math.round(Math.random() * height);
        // 存储计算值，方便动画时候计算
        sprite.delayCount = 0;
        // 存储原始坐标
        sprite.originPosition = { x: x, y: y, z: z };
        // 精灵大小
        sprite.scale.set(50, 50, 5);
        group.add(sprite);
    }
    return group;
}

window.onload = function () {
    // 初始化 stats
    var stats = initStats();
    // 字体需要异步加载后使用，因此我这里就先加载了字体。
    // 再来初始化，可能造成等待时间过长，
    // 因此需要我们对加载的字体进行删减优化
    var loader = new THREE.FontLoader();
    loader.load('fonts/font.json', function (font) {
        var camera, scene, renderer, snowPoints;
        var step = 0;

        init(font);
        animate();
        // 初始化
        function init(font) {
            // 创建一个渲染器
            renderer = new THREE.WebGLRenderer();
            // 设置渲染器的清除颜色（即背景色）,尺寸,清晰度
            // renderer.setClearColor(0xffffff);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            // 将渲染器的输出（此处是canvas元素）插入到 body
            document.body.appendChild(renderer.domElement);

            // 创建一个场景
            scene = new THREE.Scene();

            // 创建一个具有透视效果的摄像机
            var fav = 45;
            var aspect = width / height;
            camera = new THREE.PerspectiveCamera(fav, aspect, 0.1, 1500);
            camera.position.set(999, 333, 999);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            // 坐标轴
            var axis = setAxis();
            scene.add(axis);
            // 雪花
            snowPoints = createSnow2();
            scene.add(snowPoints);
            // 交互
            var controls = new THREE.OrbitControls(camera, renderer.domElement);
            // controls.target = new THREE.Vector3(222, 222, 222);
            // controls.maxPolarAngle = Math.PI / 2;
        }
        // 动画
        function animate() {
            stats.update();
            requestAnimationFrame(animate);
            render();
        }
        // 渲染
        function render() {
            var time = Date.now() * 0.00005;
            // 动画补偿
            step += 1;
            for (var i = 0, l = snowPoints.children.length; i < l; i++) {
                var sprite = snowPoints.children[i];
                var delayCount = sprite.delayCount;
                var delayMoveTime = sprite.delayMoveTime;
                var position = sprite.position;
                var material = sprite.material;
                // 自转圈圈
                material.rotation += 0.01 * (i / l);
                if (delayCount < delayMoveTime) {
                    delayCount++;
                    sprite.delayCount = delayCount;
                    continue;
                }
                if (position.y > 0) {
                    sprite.position.y -= 1.5;
                    sprite.position.x -= Math.sin(step / 360 * 2 * Math.PI) * 1;
                } else {
                    sprite.position.y = height;
                }
                var scale = Math.sin(step) * 0.3 + 10;
                sprite.scale.set(scale, scale, 1.0);
            }
            // snowPoints.rotation.x = time * 0.75;
            // 渲染，即摄像机拍下此刻的场景
            renderer.clear();
            renderer.render(scene, camera);
        }
    })
}