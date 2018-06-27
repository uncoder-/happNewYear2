# 介绍

这个是3d的，2d在[这里](https://github.com/uncoder-/happyNewYear)
# 运行

```shell
yarn
yarn start
```

## threejs学习

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
  1. 默认方向是正Z轴看向负Z轴，即向屏幕里面看
  2. 位置position
  3. 放置up，以那个方向为上方，平放，侧放。
  4. 看向lookAt
## 字体

转换字体为[json](https://gero3.github.io/facetype.js/)

## 几何体Geometry

## 材料Material

## 纹理Texture

## 网格Mesh