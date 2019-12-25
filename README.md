# 介绍

这个是 3d 的，2d 在[这里](https://github.com/uncoder-/happyNewYear)

## 1.下雪的场景

使用网格系统

# 运行

```shell
yarn
yarn start
```

## threejs 学习

## 坐标系

1. 右手坐标系
2. 坐标系原点在画布中心（canvas.width / 2, canvas.height / 2）
3. 坐标系可视化

```
  // Three.js 提供很多种辅助函数(helper)，它有助于调试
  // 创建坐标轴（RGB颜色 分别代表 XYZ轴）
  var axisHelper = new THREE.AxisHelper(6)
  // 将立方体网格加入到场景中
  scene.add(axisHelper)
```

## 相机

1. 默认方向是正 Z 轴看向负 Z 轴，即向屏幕里面看
2. 位置 position
3. 放置 up，以那个方向为上方，平放，侧放。
4. 看向 lookAt

## 字体

转换字体为[json](https://gero3.github.io/facetype.js/)

## 几何体 Geometry

## 材料 Material

## 纹理 Texture

## 网格 Mesh
