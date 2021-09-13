# 塞尔达传说旷野之息之瓦片地图加载

![zelda](http://127.0.0.1:8080/readMeImages/zelda.png)

## 背景

最近在 `肝🤕` 塞尔达，同时公司有地图加载的需求，于是想以 `旷野之息` 地图为例，学习实践一下前端开发相关的地图知识，本文内容主要介绍通过使用瓦片地图加载原理，实现 `塞尔达旷野之息` 地图加载并添加交互锚点。

## 基础知识

### 瓦片地图 `🗺`

瓦片地图url https://www.cnblogs.com/feiquan/p/14304660.html

瓦片地图原理 https://www.cnblogs.com/yjh1995/p/13893170.html

瓦片地图原理 https://www.jianshu.com/p/e9e83b427045

`瓦片地图` 金字塔模型是一种多分辨率层次模型，从瓦片金字塔的底层到顶层，分辨率越来越低，但表示的地理范围不变。首先确定地图服务平台所要提供的缩放级别的数量N，把缩放级别最高、地图比例尺最大的地图图片作为金字塔的底层，即第0层，并对其进行分块，从地图图片的左上角开始，从左至右、从上到下进行切割，分割成相同大小(比如256x256像素)的正方形地图瓦片，形成第0层瓦片矩阵;在第0层地图图片的基础上，按每像素分割为2×2个像素的方法生成第1层地图图片，并对其进行分块，分割成与下一层相同大小的正方形地图瓦片，形成第1层瓦片矩阵;采用同样的方法生成第2层瓦片矩阵;…;如此下去，直到第N一1层，构成整个瓦片金字塔。

![tile_0](http://127.0.0.1:8080/readMeImages/tile_0.png)

![tile_1](http://127.0.0.1:8080/readMeImages/tile_1.png)

瓦片地图原理

首先用（如ArcGIS软件等）对地图数据进行处理，配成需要的图层方案，并保存方案。
再用软件自带功能进行切片，切片过程中选择切片方案，根据所选方案不同，例如金字塔级别不同，地图切片范围不同等，都会影响到切片的速度。切片之后的数据称为瓦片。
越来越多的地图服务用到瓦片技术，例如我国实行发布的天地图服务就运用了地图瓦片技术。其实切片之后的地图瓦片是栅格图像，并不具备定位信息，不过切片运用了相关切片算法之后，可以计算出具体定位的位置。例如采用WGS84大地坐标系为空间参考，对地图进行切片，采用一定的切片算法，例如用经纬度步长等比例分割形成地图瓦片，当需要对一个具体地方进行定位时，可以根据经纬度步长来计算具体位置，以此来达到定位的功能。

在游戏开发过程中，我们会遇到超过屏幕大小的地图，例如在即时战略游戏中，它使得玩家可以在地图中滚动游戏画面。这类游戏通常会有丰富的背景元素，如果直接使用背景图切换的方式，需要为每个不同的场景准备一张背景图，而且每个背景图都不小，这样会造成资源浪费。

瓦片地图就是为了解决这问题而产生的。一张大的世界地图或者背景图可以由几种地形来表示，每种地形对应一张小的的图片，我们称这些小的地形图片为瓦片。把这些瓦片拼接在一起，一个完整的地图就组合出来了，这就是瓦片地图的原理。

有很多工具可以用来制作瓦片地图，Tiled 就是其中一款流行的制作工具，它有一个活跃的用户社区。推荐你去使用，上面的屏幕截图就来自 Tiled 的项目。(https://www.mapeditor.org/)

瓦片地图生成工具：arcgis：https://developers.arcgis.com

### 墨卡托投影

墨卡托投影，是正轴等角圆柱投影，又称等角圆柱投影，圆柱投影的一种，由荷兰地图学家墨卡托（G. Mercator）于1569年创拟。为地图投影方法中影响最大的。
设想一个与地轴方向一致的圆柱切于或割于地球，按等角条件将经纬网投影到圆柱面上，将圆柱面展为平面后，得平面经纬线网。投影后经线是一组竖直的等距离平行直线，纬线是垂直于经线的一组平行直线。各相邻纬线间隔由赤道向两极增大。一点上任何方向的长度比均相等，即没有角度变形，而面积变形显著，随远离基准纬线而增大。该投影具有等角航线被表示成直线的特性，故广泛用于编制航海图和航空图等。
墨卡托投影，是一种"等角正切圆柱投影”，由荷兰地图学家墨卡托（Gerhardus Mercator 1512－1594）在1569年拟定。
假设地球被围在一中空的圆柱里，其基准纬线与圆柱相切（赤道）接触，然后再假想地球中心有一盏灯，把球面上的图形投影到圆柱体上，再把圆柱体展开，这就是一幅选定基准纬线上的“墨卡托投影”绘制出的地图。

### Leaflet.js `🌿`

`Leaflet (https://leafletjs.com)` 是一个为建设交互性好适用于移动设备地图，而开发的现代的、开源的 JavaScript 库。使用它我们可以部署简单，交互式，轻量级的Web地图。

* 代码仅有 `33 KB`，但它具有开发在线地图的大部分功能。
* 允许使用图层，`WMS`，标记，弹出窗口，矢量图层（折线，多边形，圆形等），图像叠加层和 `GeoJSON` 等图层。
* 可以通过拖动地图，缩放（通过双击或滚轮滚动），使用键盘，使用事件处理以及拖动标记来与 `Leaflet` 地图进行交互。
* 浏览器支持桌面端 `Chrome`，Firefox，Safari 5 +，Opera 12 +，IE 7-11，以及Safari，Android，Chrome，Firefox等手机浏览器。

![hr](http://127.0.0.1:8080/readMeImages/hr.png)

## 实现

在页面的 `<head>` 标签中引入 `Leaflet`的 `css` 文件和 `js` 文件。在想要创建地图的地方创建一个带有 id 的 div，示例中用 `#mapContainer` 元素承载地图。

```html
<head>
  <link href="assets/libs/leaflet/leaflet.css" rel="stylesheet"/>
  <script src="assets/libs/leaflet/leaflet-src.js"></script>
</head>
<body>
  <div id="mapContainer"></div>
</body>
```

确保地图有一个明确的高度, 例如在CSS中添加如下全屏显示的样式。

```css
#mapContainer {
  width: 100%;
  height: 100%;
}
```

现在地图的初始化已经完成了，可以准备用它做一些事情了。

添加地图
```js
var bounds = new L.LatLngBounds(new L.LatLng(-49.875, 34.25), new L.LatLng(-206, 221));
var map = L.map('mapContainer', {
  crs: L.CRS.Simple,
  attributionControl: false,
  maxBounds: bounds,
  maxBoundsViscosity: 1.0,
  // 1.初始化地图，并将其视图设置为我们所选择的地理坐标和缩放级别：
}).setView([0, 0], 2);
var layer = L.tileLayer('assets/maps/{z}_{x}_{y}.png', {
  attribution: '&copy; David',
  minZoom: 2,
  maxZoom: 7,
  noWrap: true,
  bounds: bounds
// 2.显示地图。
}).addTo(map);
```

默认情况下（因为我们在创建地图实例时没有设置任何参数），地图上的所有鼠标事件和触摸交互功能都是开启的，并且它具有缩放和属性控件。

> 确保所有代码都在用于显示地图的 div 和 leaflet.js 包含之后调用。

![map_0](http://127.0.0.1:8080/readMeImages/map_0.png)

拖动、缩放

![map_0.5](http://127.0.0.1:8080/readMeImages/map_0.5.png)

添加标记

L.marker([x, y])：除了瓦片之外，你还可以轻松地在地图中添加其他东西，包括标记、折线、多边形、圆圈和弹出窗口。
bindPopup: 弹出窗口通常用于将某些信息附加到地图上的特定对象上。Leaflet为此有一个非常简单的方法：

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
    // 自定义图标
    icon: L.divIcon({
      className: className,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10],
    })
  }).addTo(map).bindPopup(popupHtml);
});
```

尝试点击我们的对象。bindPopup方法将具有指定HTML内容的弹出窗口附加到标记上，因此当您单击对象时弹出窗口出现，openPopup方法（仅用于标记）立即打开所附的弹出窗口。
您还可以把弹出窗口设置为层（当您需要更多的东西，而不是附加弹出窗口到一个对象）：
var popup = L.popup() .setLatLng([51.5, -0.09]) .setContent("I am a standalone popup.") .openOn(mymap);
这里我们使用 openOn 而不是 addTo 因为它在打开一个新的弹出窗口时，处理以前打开的弹出窗口的自动关闭，这样可以增强可用性。

处理事件
每次在Leaflet中发生某些事情，例如用户单击标记或地图缩放更改时，相应的对象都会发送一个事件，您可以通过函数来处理该事件，它允许您对用户交互作出反应：

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}
mymap.on('click', onMapClick);
每个对象都有自己的事件集,侦听器函数的第一个参数是事件对象,它包含关于发生的事件的有用信息。例如，MAP单击事件对象（在上面的示例中为e）具有latlng属性，latlng属性是单击发生的位置。

让我们通过使用弹出而不是alert来改进我们的示例：

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
mymap.on('click', onMapClick);
试着点击地图，你就会看到弹出窗口中的坐标。查看完整的例子 ：

![map_1](http://127.0.0.1:8080/readMeImages/map_1.png)

扩展
![map_2](http://127.0.0.1:8080/readMeImages/map_2.png)


页面请求

![request](http://127.0.0.1:8080/readMeImages/request.png)

## 实现效果

![map](http://127.0.0.1:8080/readMeImages/map.gif)

![hr](http://127.0.0.1:8080/readMeImages/hr_light.png)

## 总结

## 参考资料 `🔗`

* 瓦片地图生成工具 `Tiled` 项目：<https://www.mapeditor.org>
* 瓦片地图生成工具 `arcgis`：<https://developers.arcgis.com>
* 开放地理空间实验室 `Leaflet.js`: <http://webgis.cn/leaflet-index.html>
* 墨卡托投影：<https://baike.baidu.com/item/%E5%A2%A8%E5%8D%A1%E6%89%98%E6%8A%95%E5%BD%B1>


![footer](http://127.0.0.1:8080/readMeImages/footer.png)
