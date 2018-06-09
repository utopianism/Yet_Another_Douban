# Yet_Another_Douban

![image](https://github.com/utopianism/Yet_Another_Douban/blob/master/douban.gif)

又一个仿 `豆瓣` 的项目

环境：
* Xcode 9.3.1
* React Native 0.55.4

主要使用到:
  * React Native
  * Redux
  * Redux Thunk
  * React Navigation

项目基本遵循原豆瓣上的 UI 细节和交互

主要 Feature:
  * `AsyncImage` 用于图片异步加载
  * 进入电影详情页面时，获取相应电影封面的主要颜色 <- 此处是桥接原生层实现的
  * `fluid-transitions`， 类似 iOS11 之中的 AppStore 里面的转场效果
  * 详情页面导航栏的背景颜色透明值和标题跟随 `ScrollView` 变动
  
  
TODO:
  * 电影详情页面增加图片浏览功能
  * 增加 TOP 几的标签 Buttom
  * 点击头像查看用户
  * ...etc


