import * as THREE from 'three';
const lightGroup = new THREE.Group();

// 半球光
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 200, 0);
lightGroup.add(hemiLight);

// 环境光
const lightEnvironment = new THREE.AmbientLight(0xffffff, 1); // soft white light
lightGroup.add(lightEnvironment);

// 方向光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.position.set(30, 20, 30);
lightGroup.add(light);
light.target.position.set(2, 2, -1);
light.target.updateMatrixWorld();
lightGroup.add(light.target);
// 方向光helper
const helper = new THREE.DirectionalLightHelper(light);
helper.update();
// lightGroup.add(helper);

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.castShadow = true;
// pointLight.shadow.camera.zoom.set(0.01, 1.5, 0.01);
pointLight.position.set(0, 200, 200);
lightGroup.add(pointLight);

const helper2 = new THREE.PointLightHelper(pointLight, 10);
helper2.update();
// lightGroup.add(helper2);

// 摄像机光线辅助
// const helper = new THREE.CameraHelper(pointLight.shadow.camera);
// lightGroup.add(helper);

export { lightGroup };
