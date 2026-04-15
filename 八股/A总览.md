### 本知识库介绍：
主要突出速成的少而非全 精选高频提问优先背 喜欢看某网站一大坨的八股那没话说

当然全量的八股/面经合集也有 只做有考频的内容

算法的话 就是[https://codetop.cc/home](https://codetop.cc/home)，选前端，然后频度从高到低，大概60-80题 然后再补hot100剩下的基本上就差不多了 图的题不想刷也可以跳过

#### html：
其实不多 可以全看

事件冒泡 事件捕获 及其使用场景

#### css：
flex布局，两栏布局三栏布局，bfc，居中，响应式布局，display，position，css3新特性，<font style="color:rgb(36, 41, 47);">伪类与伪元素的区别，画三角形</font>

#### js：
<font style="color:#DF2A3F;background-color:#FBDE28;">Promise的理解</font>、

<font style="color:#DF2A3F;background-color:#FBDE28;">原型原型链</font>、

<font style="color:rgb(0, 0, 0);">let const var 相关</font>

<font style="color:rgb(0, 0, 0);">js有哪些数据类型</font>

<font style="color:rgb(0, 0, 0);">判断数据类型的方法</font>

js数组方法，可能会让你尽可能的说名，什么样的数组方法不改变原数组

forEach map push pop shift unshift splice slice concat join sort reverse some every filter

ES6新特性

this的指向

bind apply call 区别

箭头函数

<font style="color:#DF2A3F;background-color:#FBDE28;">闭包</font>

事件循环机制

<font style="color:rgb(51, 51, 51);">宏任务主要包括：setTimeout、setInterval</font>

<font style="color:rgb(51, 51, 51);">微任务主要包括：promise、process.nextTick()</font>

<font style="color:rgb(51, 51, 51);">执行规则：同步代码直接进入主线程执行，JS引擎判断主线程是否为空，如果为空，则读取 微任务Event Queue 中所有的消息，并依次执行。主线程和微任务 Event Queue 都为空后，读取 宏任务Event Queue 中的第一个消息进入主线程执行，来回微宏。</font>

简历如果要写ts：就准备下泛型，interface和type区别，ts在项目中的好处

#### 网络：
GET和POST的请求的区别

<font style="color:#DF2A3F;background-color:#FBDE28;">http1.1和2区别 优缺点</font>

<font style="color:#DF2A3F;background-color:#FBDE28;">http2解决了什么问题 </font>（次重点-仍然有什么解决不了的问题 http3+udp怎么解决）

<font style="color:#DF2A3F;background-color:#FBDE28;">https和http的区别，它用了什么机制去保证安全</font>

<font style="color:#DF2A3F;background-color:#FBDE28;">http状态码</font>

常见的http请求方法

与缓存相关的HTTP请求头有哪些

强缓存：

+ Expires 1.0
+ Cache-Control 1，1

协商缓存：

+ Etag、If-None-Match 1.1
+ Last-Modified、If-Modified-Since（1.0）

输入url会发生什么

跨域-同源策略

#### 框架：
vue：

+ Vue3 的比vue2优点
+ 组合式 API 理解
+ 数据响应式原理（数据劫持）
+ MVVM 模型
+ 状态管理的各种方案
+ 等具体看单独文件

react：这边只有比较浅的 不含太多原理，适合速成

#### 手写题：
<font style="color:#DF2A3F;background-color:#FBDE28;">防抖、节流</font>

<font style="color:#DF2A3F;background-color:#FBDE28;">深浅拷贝</font>

<font style="color:#DF2A3F;background-color:#FBDE28;">promise.all</font>

new

instanceof

flat（数组扁平化）

call

函数柯里化

数组api

url解析、千分位隔开

数组转树 暴力递归和哈希解法

#### 算法题：
算法题：[https://codetop.cc/home](https://codetop.cc/home) 切换成前端 然后频度降序 就是时间问题可能没啥时间刷 如果中小厂优先手写题

#### 代码输出题：
可以大概看一下 有时间的话可以去掘金找那种大合集 重点感觉就是<font style="color:#DF2A3F;background-color:#FBDE28;">this指向 和事件循环的题</font>

这个大厂问的也比较多 我是百度滴滴美团的日常实习被问这个了 看简单的就好 太复杂的不用管 就是最简单的你不能不会 难的不会是可以理解的

#### 浏览器的知识
浏览器渲染的完成流程

浏览器有什么进程 js进程里面又有什么线程

垃圾回收机制等等

简单看一下吧目录里面的几个题，或者去掘金搜一下相关八股

#### 我贴个面筋大概展示一下面试难度
你实习的话应该比这个简单

字节国际电商 base珠海 这个是一面（校招）

1. 自我介绍（可以说一下你想要介绍的项目和亮点）
2. 问介绍内容中项目里为什么要用到这个技术，他有什么优势，为什么要用这个技术栈有了解吗？
3. 状态管理的问题，你们用usecontext比rematch好在哪里，可以类比一下他可能会问别的对比你项目里的技术。
4. 接下来是基础部分：对计算机网络了解吗？http2的优势是什么，他解决了http的什么问题。服务器推送这个功能在实际实践中会使用，你有了解过有什么页面或者项目有用这个东西做服务器推送。
5. http3结合udp比tcp有什么优势，他解决了http2现在的一些什么问题
6. tcp的握手挥手分别有几次，大概是什么样的一个过程
7. 为什么挥手一定要四次，而握手三次就能
8. 接下来问js，js的几个基本数据类型是什么，bigint是什么样的范围
9. 你一般用symnol去做什么，你平常怎么判断数据类型
10. 你对闭包怎么理解，他有什么作用和缺点
11. 那怎么去避免内存泄漏呢。首先你怎么去检测到一个网页可能存在内存泄漏
12. 浏览器的缓存有哪些（背强缓存协商缓存。http1.0靠什么字段，1.1靠什么字段）
13. 强缓存一般会用在哪一些资源，我想让他在失效时间还没到就让他失效怎么处理。
14. 浏览器的渲染进程有哪些线程
15. web server了解吗 和webwork有什么区别（冷门的）
16. 然后是写一个mid算法题和手写一个usestate
17. 最后是反问

#### 更难一点的工程相关
+ 如何捕获错误
+ 如何应对白屏问题
+ vite or wbp的构建流程和区别
+ Plugin 与 Loader 概念
+ 使用过哪些插件
+ ESM 和 UMD 区别（如何同时输出两种格式）
+ monorepo 理解（如果简历写了）
+ npm 与 pnpm 区别

#### 场景题
最基础的能力就是要拥有白板写一个vue或者react组件的能力

比如说封装一个input组件等
