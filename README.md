# 前端瓦片地图加载之塞尔达传说旷野之息

![zelda](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913221947310-2095791606.png)

## 背景

最近在 `肝🤕` 塞尔达旷野之息，希望 `2022年` 新作发布前可以救出公主 `👸`。 同时公司有地图加载的需求，于是想以 `旷野之息` 地图为例，学习实践一下前端开发相关的地图知识，本文内容主要介绍通过使用瓦片地图加载原理，实现 `塞尔达旷野之息` 地图加载并添加交互锚点。

## 基础知识

### 瓦片地图 `🗺`

在游戏开发过程中，经常会遇到**超过屏幕大小的地图**，例如在即时战略游戏中，它使得玩家可以在地图中滚动游戏画面。这类游戏通常会有丰富的背景元素，如果直接使用背景图切换的方式，需要为每个不同的场景准备一张背景图，但是每个背景图都不小，这样会造成资源浪费。

**瓦片地图**就是为了解决此类问题产生的，一张大的世界地图或者背景图可以由几种地形来表示，每种地形对应一张小的的图片，我们称这些小的地形图片为瓦片。把这些瓦片拼接在一起，一个完整的地图就组合出来了，这就是瓦片地图的原理。

![tile_1](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222226471-2123749536.png)

**瓦片地图金字塔模型是一种多分辨率层次模型，从瓦片金字塔的底层到顶层，分辨率越来越低，但表示的地理范围不变。** 首先确定地图服务平台所要提供的缩放级别的数量 `N`，把缩放级别最高、地图比例尺最大的地图图片作为金字塔的底层，即第 `0` 层，并对其进行分块，从地图图片的左上角开始，从左至右、从上到下进行切割，分割成相同大小的正方形地图瓦片，形成第 `0` 层瓦片矩阵；在第 `0` 层地图图片的基础上，按每像素分割为 `2×2` 个像素的方法生成第 `1` 层地图图片，并对其进行分块，分割成与下一层相同大小的正方形地图瓦片，形成第1层瓦片矩阵；采用同样的方法生成第 `2` 层瓦片矩阵；...... 如此下去，直到第 `N-1` 层，构成整个`瓦片金字塔`。

![tile_0](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222252803-140916376.png)

> 瓦片地图一般采用`ZXY规范`的地图瓦片。（瓦片`层级`、瓦片 `x坐标`、瓦片 `y坐标`）

### 墨卡托投影

**瓦片地图采用的都是墨卡托投影**，即正轴等角圆柱投影，又称等角圆柱投影， 是圆柱投影的一种，由荷兰地图学家墨卡托（`Gerhardus Mercator`）拟定。基本原理是假设地球被围在一中空的圆柱里，其基准纬线与圆柱相切（赤道）接触，然后再假想地球中心有一盏灯，把球面上的图形投影到圆柱体上，再把圆柱体展开，这就是一幅选定基准纬线上的 `墨卡托投影` 绘制出的地图。百度地图、高德地图及 `Google Maps` 使用的投影方法都是墨卡托投影。

![mercator](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222321081-2138471477.png)

> 瓦片地图不用自己生成，有很多工具可以用来制作瓦片地图，`Tiled`、`Arcgis` 等都是非常流行的制作工具。

![hr](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222343283-344854572.png)

## 实现

在本例中，`塞尔达旷野之息`瓦片地图来源网络开源地图，加载瓦片地图使用 `Leaflet` `web` 地图库，开发之前简要了解一下。

### Leaflet.js

`Leaflet 🌿 (https://leafletjs.com)` 是一个为建设交互性好适用于移动设备地图，而开发的现代的、开源的 JavaScript 库。使用它我们可以部署简单，交互式，轻量级的Web地图。

* 代码仅 `33 KB`，但它具有开发在线地图的大部分功能。
* 允许使用图层，`WMS`，标记，弹出窗口，矢量图层（折线，多边形，圆形等），图像叠加层和 `GeoJSON` 等图层。
* 可以通过拖动地图，缩放（通过双击或滚轮滚动），使用键盘，使用事件处理以及拖动标记来与 `Leaflet` 地图进行交互。
* 浏览器支持桌面端 `Chrome`、`Firefox`、`Safari 5+`、`Opera 12+`、`IE 7-11` 以及 `Safari`、`Android`、`Chrome`、`Firefox`等手机浏览器。

### 代码实现

在页面的 `head` 标签中引入 `Leaflet`的 `css` 文件和 `js` 文件。在想要创建地图的地方创建一个带有 `id` 的 `div`，示例中用 `#mapContainer` 元素承载地图。

```html
<head>
  <link href="assets/libs/leaflet/leaflet.css" rel="stylesheet"/>
  <script src="assets/libs/leaflet/leaflet-src.js"></script>
</head>
<body>
  <div id="mapContainer"></div>
</body>
```

需要确保地图有一个明确的高度, 可以在 `CSS` 中添加如下全屏显示的样式。

```css
#mapContainer {
  width: 100%;
  height: 100%;
}
```

现在地图的初始化已经完成了，这一步进行瓦片地图加载。

* `L.LatLngBounds(西南角点,东北角点)`：通过定义矩形西南角点和东北角点来创建经纬度的矩形框。
* `setView`：初始化地图，并将其视图设置为我们所选择的地理坐标和缩放级别。
* `L.tileLayer`：加载瓦片图层。
* `addTo`：显示地图。

```js
var bounds = new L.LatLngBounds(
  new L.LatLng(-49.875, 34.25), new L.LatLng(-206, 221)
);

var map = L.map('mapContainer', {
  crs: L.CRS.Simple,
  attributionControl: false,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
}).setView([0, 0], 2);

var layer = L.tileLayer('assets/maps/{z}_{x}_{y}.png', {
  attribution: '&copy; David',
  minZoom: 2,
  maxZoom: 7,
  noWrap: true,
  bounds: bounds
}).addTo(map);
```

![map_0](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222420900-256619218.png)

> 确保所有代码都在用于显示地图的 `div` 和 `leaflet.js` 包含之后调用。默认情况下（因为我们在创建地图实例时没有设置任何参数），地图上的所有鼠标事件和触摸交互功能都是开启的，并且它具有缩放和属性控件。

此时我们在页面中对地图进行拖动、缩放等操作，并打开浏览器控制台查看 `network` 中的 `img` 选项，随着操作的触发，不同的地图瓦片被浏览器加载显示。

![map_0.5](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222438964-1482137175.png)

`塞尔达旷野之息` 地图非常大，据国外 `油管阿婆主` 测试，林克从最北走到地图最南端需要 `20` 多分钟。在如此宏大的地图上进行游戏，探索的神庙、地图塔、人马等怪物点等位置需要花很大精力，如果使用已有数据进行标注，可以节省很多精力（但也失去了探索的乐趣 `😂`）。此时可以利用 `Leaflet` 的地图标注功能，在地图上进行标记。其中标注数据来源于网络资料。以下内容以神庙 `🛕` 为例，实现在瓦片地图上的标注和交互功能。

* `L.marker([x, y])`：除了瓦片之外，可以轻松地在地图中添加其他东西，包括标记、折线、多边形、圆圈和弹出窗口。
* `L.divIcon`: 自定义图标。
* `bindPopup`: 弹出窗口通常用于将某些信息附加到地图上的特定对象上。

```js
$.each(markerData, function () {
  var key = this.markerCategoryId + "-" + this.id + "-" + this.name.replace(/[^A-Z]/gi, "-");
  var popupHtml = '<div class="popupContainer">';
  popupHtml += '<strong class="name">' + this.name + '</strong>';
  popupHtml += '<div class="buttonContainer">';
  popupHtml += '<span class="markButton" onclick="markPoint(this)" data-key="' + key + '">标记</span>';
  popupHtml += '</div>';
  var className = "mark-" + key;
  className += " markIcon";
  className += " icon-" + markerStyle[this.markerCategoryId];
  var marker = L.marker([this.y, this.x], {
    title: this.name,
    icon: L.divIcon({
      className: className,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
    })
  }).addTo(map).bindPopup(popupHtml);
});
```

至此，通过遍历，将数据中神庙的坐标点添加到了地图上，同时在dom结构中添加了点击事件，点击神庙可以进行交互。

![map_1](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222510270-2033807280.png)

使用同样的方法，可以将地图塔、村庄、人马、呀哈哈 `😂`、回忆点、子任务点等位置信息标注在地图中方便查找。

![map_2](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222524908-1100798347.png)

## 实现效果

![map](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222547970-1308207067.gif)

> 在线预览：<https://dragonir.github.io/zelda-map>

![hr_light](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222628506-822174502.png)

## 总结

使用瓦片地图，可以做到地图的整体和局部都能高清展示，并且能够做到按需加载，需要注意的是，分层较多的地图瓦片图片也会指数增长，需要做好缓存处理，这样就能提升地图页面加载速度，提升用户体验。`leaflet.js` 虽然很轻量，但是功能非常强大，本例中只用到它的一些基础功能，其他高级用法还要在后续开发中继续探索。

## 参考资料

* 塞尔达旷野之息地图标注来源：<https://github.com>
* 瓦片地图生成工具 `Tiled` 项目：<https://www.mapeditor.org>
* 瓦片地图生成工具 `arcgis`：<https://developers.arcgis.com>
* 开放地理空间实验室 `Leaflet.js`: <http://webgis.cn/leaflet-index.html>
* 墨卡托投影：<https://baike.baidu.com/item/%E5%A2%A8%E5%8D%A1%E6%89%98%E6%8A%95%E5%BD%B1>
* <https://www.cnblogs.com/fwc1994/p/6519229.html>
* ZXY标准瓦片 <http://support.supermap.com.cn/DataWarehouse/WebDocHelp/iServer/Subject_introduce/Cache/MapCache/TileFormat/ZXY_format.htm>

![footer](https://img2020.cnblogs.com/blog/772544/202109/772544-20210913222650061-1454509090.png)

> 作者：dragonir 本文地址：
