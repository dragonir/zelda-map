# 塞尔达传说旷野之息之瓦片地图加载

![zelda](http://127.0.0.1:8080/readMeImages/zelda.png)

![tile](http://127.0.0.1:8080/readMeImages/tile.png)

## 背景

## 基础知识

### 瓦片地图

瓦片地图url https://www.cnblogs.com/feiquan/p/14304660.html

瓦片地图原理 https://www.cnblogs.com/yjh1995/p/13893170.html

瓦片地图原理 https://www.jianshu.com/p/e9e83b427045

https://juejin.cn/post/6844904036840243207

瓦片地图金字塔模型是一种多分辨率层次模型，从瓦片金字塔的底层到顶层，分辨率越来越低，但表示的地理范围不变。首先确定地图服务平台所要提供的缩放级别的数量N，把缩放级别最高、地图比例尺最大的地图图片作为金字塔的底层，即第0层，并对其进行分块，从地图图片的左上角开始，从左至右、从上到下进行切割，分割成相同大小(比如256x256像素)的正方形地图瓦片，形成第0层瓦片矩阵;在第0层地图图片的基础上，按每像素分割为2×2个像素的方法生成第1层地图图片，并对其进行分块，分割成与下一层相同大小的正方形地图瓦片，形成第1层瓦片矩阵;采用同样的方法生成第2层瓦片矩阵;…;如此下去，直到第N一1层，构成整个瓦片金字塔。

瓦片地图原理

首先用（如ArcGIS软件等）对地图数据进行处理，配成需要的图层方案，并保存方案。
再用软件自带功能进行切片，切片过程中选择切片方案，根据所选方案不同，例如金字塔级别不同，地图切片范围不同等，都会影响到切片的速度。切片之后的数据称为瓦片。
越来越多的地图服务用到瓦片技术，例如我国实行发布的天地图服务就运用了地图瓦片技术。其实切片之后的地图瓦片是栅格图像，并不具备定位信息，不过切片运用了相关切片算法之后，可以计算出具体定位的位置。例如采用WGS84大地坐标系为空间参考，对地图进行切片，采用一定的切片算法，例如用经纬度步长等比例分割形成地图瓦片，当需要对一个具体地方进行定位时，可以根据经纬度步长来计算具体位置，以此来达到定位的功能。

在游戏开发过程中，我们会遇到超过屏幕大小的地图，例如在即时战略游戏中，它使得玩家可以在地图中滚动游戏画面。这类游戏通常会有丰富的背景元素，如果直接使用背景图切换的方式，需要为每个不同的场景准备一张背景图，而且每个背景图都不小，这样会造成资源浪费。

瓦片地图就是为了解决这问题而产生的。一张大的世界地图或者背景图可以由几种地形来表示，每种地形对应一张小的的图片，我们称这些小的地形图片为瓦片。把这些瓦片拼接在一起，一个完整的地图就组合出来了，这就是瓦片地图的原理。

有很多工具可以用来制作瓦片地图，Tiled 就是其中一款流行的制作工具，它有一个活跃的用户社区。推荐你去使用，上面的屏幕截图就来自 Tiled 的项目。(https://www.mapeditor.org/)

![hr](http://127.0.0.1:8080/readMeImages/hr.png)


## 实现

### leafletjs
https://leafletjs.com/
http://webgis.cn/leaflet-quickstart.html
https://iowiki.com/leafletjs/leafletjs_getting_started.html

什么是Leaflet.js
Leaflet.js是一个开源库，使用它我们可以部署简单，交互式，轻量级的Web地图。

Leaflet JavaScript库允许您使用图层，WMS，标记，弹出窗口，矢量图层（折线，多边形，圆形等），图像叠加层和GeoJSON等图层。

您可以通过拖动地图，缩放（通过双击或滚轮滚动），使用键盘，使用事件处理以及拖动标记来与Leaflet地图进行交互。

Leaflet支持浏览器，如桌面上的Chrome，Firefox，Safari 5 +，Opera 12 +，IE 7-11，以及Safari，Android，Chrome，Firefox等手机浏览器


`#mapContainer` 元素用于承载地图。

```html
<body>
  <div id="mapContainer"></div>
</body>
```

添加地图
```js
var bounds = new L.LatLngBounds(new L.LatLng(-49.875, 34.25), new L.LatLng(-206, 221));
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
![map_0](http://127.0.0.1:8080/readMeImages/map_0.png)

拖动、缩放

![map_0.5](http://127.0.0.1:8080/readMeImages/map_0.5.png)

添加标记
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
![map_1](http://127.0.0.1:8080/readMeImages/map_1.png)

扩展
![map_2](http://127.0.0.1:8080/readMeImages/map_2.png)


页面请求

![request](http://127.0.0.1:8080/readMeImages/request.png)

## 实现效果

![map](http://127.0.0.1:8080/readMeImages/map.gif)

## 总结


![footer](http://127.0.0.1:8080/readMeImages/footer.png)
