# find-beauty-in-douyin
使用 ADB 和 Node.js 训练抖音模型，自动关注抖音里好看的小姐姐

训练过程的简单视频可以在 [https://www.youtube.com/watch?v=-_Gwd3DHJZU](https://www.youtube.com/watch?v=-_Gwd3DHJZU) 或者 [http://www.iqiyi.com/w_19saaayji1.html](http://www.iqiyi.com/w_19saaayji1.html) 看到

![](./logo.jpg)

## 使用

### 1.克隆项目

### 2.安装 ADB

```bash
brew cask install android-platform-tools
```
### 3.连接手机

打开手机的开发者模式

![](https://user-gold-cdn.xitu.io/2019/7/14/16bec4576942ca66?w=324&h=684&f=png&s=69355)

方式一：通过 USB 直接连接即可

方式二：通过 wifi 连接，参考这篇文章：[Android studio使用---WiFi ADB使用以及连接手机调试](https://blog.csdn.net/xiabing082/article/details/54376461)

### 4.安装依赖

```bash
npm i
```

### 5.将 face++ 对应的 `api_key` 和 `api_secret` 填入 `config.js` 文件

![](https://user-gold-cdn.xitu.io/2019/7/13/16bebef6729ff184?w=2396&h=406&f=png&s=66331)

### 6.启动

```bash
npm run start
```

