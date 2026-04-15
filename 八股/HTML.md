不是特别重要 也不多 熟悉一下就行

#### src与herf的区别
+ href 是超文本引用，它是指向资源的位置，建立与目标文件的联系；
+ src 目的是把资源下载到页面中；

浏览器解析 href 不会阻塞对文档的处理（这就是官方建议使用 link 引入而不是 @ import 的原因），src 会阻塞对文档的处理。

#### 页面导入样式时，使用 link 和 @import 有什么区别？
link 标签定义文档与外部资源的关系。只能存在于head内部。

 （1）从属关系区别。 @import 是 **CSS**** 提供**的语法规则，只有导入样式表的作用；link 是**HTML**** 提供**的标签，不仅可以加载 CSS 文件，还可以定义 RSS（是一种描述和同步网站内容的格式）、rel 连接属性（定义了链接资源和当前文档之间的关系）、引入网站图标等。

 （2）加载顺序区别。加载页面时，link 标签引入的 CSS **被同时加载**；@import 引入的 CSS 将在**页面加载完毕**后被加载。

 （3）兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。

link支持使用JS控制DOM改变样式；而@import不支持

#### 对HTML语义化的理解 
根据内容的结构选择合适的标签

优点

增加代码的可读性，结构清晰，有利于开发和维护

有利于SEO 搜索引擎的爬虫也依赖于HTML的标记确定上下文的权重

即使在没有CSS的情况下也可以呈现容易阅读的内容结构

##### 语义化标签 
 header footer main aside article section 

#### script标签中defer和async的区别
如果没有defer或async属性，浏览器会**立即加载并执行相应**的**脚本**。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

下图可以直观的看出三者之间的区别:

<img src="https://cdn.nlark.com/yuque/0/2025/png/27092124/1749469316874-2007abee-8258-4e68-8895-87f4874b081b.png" width="689" title="" crop="0,0,1,1" id="u131b208c" class="ne-image">

其中蓝色代表js脚本网络加载时间，红色代表js脚本执行时间，绿色代表html解析。

**defer 和 async属性都是去异步加载外部的****JS脚本****文件，它们都不会阻塞页面的解析**，其区别如下：

+ **执行顺序：**多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行；
+ defer 和 async 的共同点是都是可以并行加载JS文件，不会阻塞页面的加载，不同点是 defer的加载完成之后，JS会等待整个页面全部加载完成了再执行，而带async属性的JS是加载完成之后，会马上执行
+  JS脚本的执行需要等待文档所有元 素解析完之后，load和DOMContentLoaded事件之前执行 

#### meta标签
表示网页的基础配置

使用 `name` 和 `content` 属性进行定义

name 和 content 一起使用，前者表示元数据的名称，后者是元数据的值

常用的meta标签：

（1）`charset`，用来描述HTML文档的编码类型

常用的meta标签：

（1）charset，用来描述HTML文档的编码类型：

<meta charset="UTF-8">

（2） keywords，页面关键词：

<meta name="keywords" content="关键词"/>

（3）description，页面描述：

<meta name="description" content="页面描述内容"/>

（4）refresh，页面重定向和刷新：

<meta http-equiv="refresh"content="0;url="/>

（5）viewport，适配移动端，可以控制视口的大小和比例：

<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

其中，content 参数有以下几种：

+ width viewport ：宽度(数值/device-width)
+ height viewport ：高度(数值/device-height)
+ initial-scale ：初始缩放比例
+ maximum-scale ：最大缩放比例
+ minimum-scale ：最小缩放比例
+ user-scalable ：是否允许用户缩放(yes/no）

（6）搜索引擎索引方式：

<meta name="robots" content="index,follow"/>

其中，content 参数有以下几种：

+ all：文件将被检索，且页面上的链接可以被查询；
+ none：文件将不被检索，且页面上的链接不可以被查询；
+ index：文件将被检索；
+ follow：页面上的链接可以被查询；
+ noindex：文件将不被检索；
+ nofollow：页面上的链接不可以被查询。

#### HTML5有哪些更新
+ 新的选择器 `document.querySelector`、`document.querySelectorAll`
+ 媒体播放的 `video` 和 `audio` 标签 
    - 以前用的 flash 实现
+ 本地存储 `localStorage` 和 `sessionStorage`
+ 浏览器通知 `Notifications`
+ **<u>语义化标签，例如 </u>**`**<u>header</u>**`**<u>，</u>**`**<u>nav</u>**`**<u>，</u>**`**<u>footer</u>**`**<u>，</u>**`**<u>section</u>**`**<u>，</u>**`**<u>article</u>**`**<u> 等标签</u>**
+ 地理位置 `Geolocation`
+ 多任务处理 `web worker`

运行在后台的JS，独立于其他脚本，不影响性能

#### 对 web worker 的理解
  Web Workers 使得一个Web应用程序可以在与主执行线程分离的后台线程中运行一个脚本操作。这样做的好处是可以在一个单独的线程中执行费时的处理任务，从而允许主（通常是UI）线程运行而不被阻塞。

#### DOCTYPE 的作用是什么？
<!DOCTYPE>声明位于 HTML文档中的第一行。告知浏览器的解析器用什么文档标准解析这个文档。

DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示，模拟老式浏览器的行为以防止站点无法工作。

PS: HTML5 不基于 SGML，因此不需要对 DTD 进行引用

#### 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
+ 行内元素有：`a b span img input select strong button label textarea`
+ 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`；

空元素，即没有内容的HTML元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

+ 常见的有：`<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`；
+ <img /> 标签属于替换元素，具有内置的宽高属性，所以可以设置

#### img标签title、alt、srcset
alt：图片加载失败时，显示alt的内容，利于SEO

title：鼠标移动到图片上时，显示title的内容

响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的srcset属性。srcset属性用于设置不同屏幕密度下，img 会自动加载不同的图片。

srcset属性用于指定不同分辨率的图像

#### iframe
iframe 元素 可以在一个网站里面嵌入另一个网站内容

优点

1. 实现一个窗口同时加载多个第三方域名下内容
2. 增加代码复用性

缺点：

1. 搜索引擎无法识别、不利于SEO
2. 影响首页首屏加载时间
3. 兼容性差
4. 阻塞主页面的 onload 事件

#### title与h1的区别、b与strong的区别、i与em的区别？
+ strong标签有语义，是起到加重语气的效果，而b标签是没有的，b标签只是一个简单加粗标签。b标签之间的字符都设为粗体，strong标签加强字符的语气都是通过粗体来实现的，而搜索引擎更侧重strong标签。
+ title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取有很大的影响
+ **i内容展示为斜体，em表示强调的文本**

#### head 标签有什么作用
<head> 标签用于定义文档的头部，它是所有头部元素的容器。<head> 中的元素可以引用脚本、指示样式表、提供元信息等。

文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。

下面这些标签可用在 head 部分：<base>, <link>, <meta>, <script>, <style>, <title>。 

其中 <title> 定义文档的标题，它是 head 部分中唯一必需的元素。

#### 标准模式与兼容模式各有什么区别？
标准模式的渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。

在兼容模式中，页面以宽松的向后兼容的方式显示

#### 布局模型
1、流动模型（Flow） 块状元素都会在所处的包含元素内自上而下按顺序垂直延伸分布. 

2、浮动模型 (Float) 浮动

3、层模型（Layer） 定位
