系统覆盖 CSS 核心知识点、进阶概念及实际应用场景

## 基础概念
### 1.1 选择器与优先级
#### CSS 选择器有哪些类型？优先级如何计算？
****

**选择器类型（从低到高）：**

| 选择器类型 | 示例 | 权重值 |
| --- | --- | --- |
| 通配符/继承 | * | 0 |
| 元素/伪元素 | div, ::before | 1 |
| 类/属性/伪类 | .class, [type], :hover | 10 |
| ID | #id | 100 |
| 行内样式 | style="" | 1000 |
| !important | color: red !important | 无穷大 |


**优先级计算规则：**

选择器优先级 = (a, b, c, d)

+ a: 行内样式 (0 或 1)
+ b: ID 选择器数量
+ c: 类/属性/伪类数量
+ d: 元素/伪元素数量

**比较规则：** 从左到右逐位比较，较大者胜出。

**示例：**

```css
/* 优先级: (0, 1, 0, 1) = 101 */
#nav .menu li { }

/* 优先级: (0, 0, 2, 1) = 21 */
.nav .menu li { }

/* 优先级: (0, 1, 1, 0) = 110 */
#nav .menu { }
```

#### 伪类和伪元素有什么区别？
****

| 特性 | 伪类 (Pseudo-class) | 伪元素 (Pseudo-element) |
| --- | --- | --- |
| 语法 | 单冒号 :hover | 双冒号 ::before (单冒号兼容) |
| 作用 | 选择元素的特定状态 | 创建虚拟元素 |
| 本质 | 不创建新元素 | 在 DOM 中创建虚拟元素 |
| 数量限制 | 可叠加使用 | 一个选择器只能有一个，且在末尾 |
| 优先级 | 同类选择器 (10) | 同元素选择器 (1) |


**常见伪类：**

```css
/* 状态伪类 */
:hover, :active, :focus, :visited

/* 结构伪类 */
:first-child, :last-child, :nth-child(n), :nth-of-type(n)
:not(), :is(), :where()

/* 表单伪类 */
:checked, :disabled, :valid, :invalid
```

**常见伪元素：**

```css
::before, ::after      /* 在元素内容前后插入 */
::first-line           /* 首行文本 */
::first-letter         /* 首字母 */
::selection            /* 选中文本 */
::placeholder          /* 占位符 */
```

### 1.2 盒模型
#### 标准盒模型和 IE 盒模型有什么区别？
****

**标准盒模型 (content-box)：**

+ width = content
+ 总宽度 = width + padding + border + margin

**IE 盒模型 (border-box)：**

+ width = content + padding + border
+ 总宽度 = width + margin

**对比说明：**

标准盒模型中，设置的 width 只包含 content 区域。当添加 padding 和 border 时，元素实际占据的空间会增大。

IE 盒模型中，设置的 width 已经包含了 content、padding 和 border。添加 padding 和 border 不会改变元素的实际占据空间。

**设置方式：**

```css
/* 标准盒模型 (默认) */
.box { box-sizing: content-box; }

/* IE 盒模型 (推荐) */
.box { box-sizing: border-box; }

/* 全局设置 */
*, *::before, *::after {
  box-sizing: border-box;
}
```

#### margin 重叠（外边距合并）是什么？如何解决？
****

**发生条件：**

1. 相邻兄弟元素之间
2. 父元素与第一个/最后一个子元素之间
3. 空块级元素的上下 margin

**解决方式：**

```css
/* 1. 使用 BFC */
.container { overflow: hidden; }

/* 2. 使用 padding 代替 margin */
.child { padding-top: 20px; }

/* 3. 使用 border */
.container { border: 1px solid transparent; }

/* 4. 使用 flex 布局 */
.container { display: flex; flex-direction: column; }

/* 5. 子元素设置为行内块 */
.child { display: inline-block; }
```

### 1.3 BFC（块级格式化上下文）
#### 什么是 BFC？如何创建？有什么作用？
****

**定义：** BFC (Block Formatting Context) 是页面上一个独立的渲染区域，内部元素的布局不会影响外部元素。

**创建方式：**

```css
/* 以下任一属性均可创建 BFC */
.container {
  overflow: hidden | auto | scroll;
  display: inline-block | flex | grid | table-cell;
  position: absolute | fixed;
  float: left | right;
  contain: layout | content | strict;
}
```

**作用：**

| 作用 | 说明 |
| --- | --- |
| 清除浮动 | 包含浮动子元素，防止高度塌陷 |
| 阻止 margin 重叠 | BFC 内部与外部 margin 不合并 |
| 阻止元素被浮动覆盖 | 自适应两栏布局 |


**应用场景：**

```css
/* 1. 清除浮动 */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}

/* 2. 防止 margin 重叠 */
.bfc-container {
  overflow: hidden;
}

/* 3. 自适应两栏布局 */
.left { float: left; width: 200px; }
.right { overflow: hidden; } /* 创建 BFC，避开浮动 */
```

## 布局技术
### 2.1 Flexbox 布局
#### Flex 布局有哪些核心概念？常用属性有哪些？
****

**核心概念：**

Flex 布局包含两个核心概念：Flex 容器（Flex Container）和 Flex 项目（Flex Item）。

+ 主轴（main axis）：Flex 项目排列的主要方向，默认为水平方向
+ 交叉轴（cross axis）：垂直于主轴的方向，默认为垂直方向
+ justify-content：控制项目在主轴上的对齐方式
+ align-items：控制项目在交叉轴上的对齐方式

**容器属性：**

| 属性 | 作用 | 常用值 |
| --- | --- | --- |
| display | 开启 Flex | flex, inline-flex |
| flex-direction | 主轴方向 | row, row-reverse, column, column-reverse |
| flex-wrap | 换行 | nowrap, wrap, wrap-reverse |
| flex-flow | 简写 | direction + wrap |
| justify-content | 主轴对齐 | flex-start, center, flex-end, space-between, space-around, space-evenly |
| align-items | 交叉轴对齐 | stretch, flex-start, center, flex-end, baseline |
| align-content | 多行对齐 | 同 justify-content |
| gap | 项目间距 | 10px, 10px 20px |


**项目属性：**

| 属性 | 作用 | 示例 |
| --- | --- | --- |
| flex-grow | 放大比例 | 1 (等分剩余空间) |
| flex-shrink | 缩小比例 | 0 (不缩小) |
| flex-basis | 基础大小 | 200px, auto |
| flex | 简写 | 0 1 auto (默认), 1 (等分) |
| align-self | 单独对齐 | 覆盖 align-items |
| order | 排列顺序 | 数值越小越靠前 |


#### 使用 Flex 实现以下布局：
1. 水平垂直居中
2. 左侧固定，右侧自适应
3. 三栏布局（左右固定，中间自适应）

****

```css
/* 1. 水平垂直居中 */
.center-container {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;      /* 垂直居中 */
  height: 100vh;
}

/* 2. 左侧固定，右侧自适应 */
.two-column {
  display: flex;
}
.two-column .left {
  width: 200px;
  flex-shrink: 0;  /* 不缩小 */
}
.two-column .right {
  flex: 1;  /* 占据剩余空间 */
}

/* 3. 三栏布局（左右固定，中间自适应） */
.three-column {
  display: flex;
}
.three-column .left,
.three-column .right {
  width: 200px;
  flex-shrink: 0;
}
.three-column .center {
  flex: 1;
}

/* 或者使用 order 调整顺序（圣杯布局） */
.holy-grail {
  display: flex;
}
.holy-grail .center {
  flex: 1;
  order: 2;
}
.holy-grail .left {
  width: 200px;
  order: 1;
}
.holy-grail .right {
  width: 200px;
  order: 3;
}
```

### 2.2 Grid 布局
#### Grid 布局与 Flex 布局有什么区别？适用场景分别是什么？
****

| 特性 | Flexbox | Grid |
| --- | --- | --- |
| 维度 | 一维布局（行或列） | 二维布局（行和列同时） |
| 内容驱动 | 内容决定布局 | 容器决定布局 |
| 对齐方式 | 单轴对齐 | 双轴对齐 |
| 适用场景 | 组件级布局、导航栏 | 页面级布局、复杂网格 |


**适用场景：**

+ **Flexbox**：导航栏、按钮组、卡片列表、居中布局
+ **Grid**：整体页面布局、复杂表单、图片画廊、仪表盘

#### 使用 Grid 实现以下布局：
1. 九宫格
2. 圣杯布局
3. 不规则网格（部分单元格跨行列）

****

```css
/* 1. 九宫格 */
.grid-nine {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3列等分 */
  grid-template-rows: repeat(3, 1fr);     /* 3行等分 */
  gap: 10px;
}

/* 2. 圣杯布局 */
.grid-holy-grail {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  /* 左 中 右 */
  grid-template-rows: auto 1fr auto;       /* 头 内容 尾 */
  grid-template-areas:
    "header header header"
    "left center right"
    "footer footer footer";
  min-height: 100vh;
}
.grid-holy-grail header { grid-area: header; }
.grid-holy-grail .left { grid-area: left; }
.grid-holy-grail .center { grid-area: center; }
.grid-holy-grail .right { grid-area: right; }
.grid-holy-grail footer { grid-area: footer; }

/* 3. 不规则网格 */
.grid-irregular {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}
.grid-irregular .item1 {
  grid-column: 1 / 3;  /* 跨2列 */
  grid-row: 1 / 3;     /* 跨2行 */
}
.grid-irregular .item2 {
  grid-column: 3 / 5;  /* 跨2列 */
}
```

### 2.3 定位系统
#### position 属性的各个值有什么区别？
****

| 值 | 定位基准 | 是否脱离文档流 | 应用场景 |
| --- | --- | --- | --- |
| static | 正常文档流 | 否 | 默认值 |
| relative | 自身原位置 | 否（占位保留） | 微调位置、作为 absolute 参照 |
| absolute | 最近定位祖先 | 是 | 弹窗、下拉菜单、悬浮按钮 |
| fixed | 视口 | 是 | 固定导航、回到顶部 |
| sticky | 滚动容器 | 否（滚动时固定） | 吸顶表头、侧边栏 |


**z-index 注意事项：**

+ 仅在定位元素（非 static）上有效
+ 创建层叠上下文（Stacking Context）
+ 父元素的 z-index 会影响子元素

## 样式处理
### 3.1 继承与层叠
#### 哪些 CSS 属性可以继承？如何利用继承？
****

**可继承属性（主要是文本相关）：**

```css
/* 字体相关 */
font-family, font-size, font-weight, font-style, line-height

/* 文本相关 */
color, text-align, text-indent, text-transform, letter-spacing, word-spacing

/* 其他 */
visibility, cursor, list-style
```

**不可继承属性（主要是盒模型相关）：**

```css
/* 盒模型 */
width, height, margin, padding, border

/* 背景 */
background, background-color, background-image

/* 定位 */
position, top, left, right, bottom

/* 显示 */
display, float, clear, overflow
```

**强制继承：**

```css
.child {
  width: inherit;  /* 强制继承父元素 width */
  box-sizing: inherit;
}

/* 全局统一盒模型 */
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

### 3.2 CSS 变量
#### CSS 变量（自定义属性）有什么优势？如何使用？
****

**定义与使用：**

```css
/* 定义变量 */
:root {
  --primary-color: #1890ff;
  --text-color: #333;
  --border-radius: 4px;
  --spacing-unit: 8px;
}

/* 使用变量 */
.button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 2);
}

/* 提供默认值 */
.button {
  background-color: var(--primary-color, #1890ff);
}
```

**优势：**

1. **动态修改**：通过 JS 实时更新主题
2. **作用域**：支持局部变量覆盖全局
3. **计算支持**：配合 calc() 使用
4. **语义化**：变量名表达意图

**JS 操作：**

```javascript
// 获取变量
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// 修改变量
document.documentElement.style.setProperty('--primary-color', '#ff4d4f');

// 切换主题
function switchTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.style.setProperty('--bg-color', '#141414');
    root.style.setProperty('--text-color', '#fff');
  } else {
    root.style.setProperty('--bg-color', '#fff');
    root.style.setProperty('--text-color', '#333');
  }
}
```

### 3.3 单位系统
#### CSS 中常用单位有哪些？rem 和 em 有什么区别？
****

**绝对单位：**

+ px：像素，最常用的单位
+ pt：磅，印刷单位
+ cm/mm/in：物理单位

**相对单位：**

| 单位 | 相对基准 | 应用场景 |
| --- | --- | --- |
| em | 父元素字体大小 | 组件内部比例 |
| rem | 根元素 (html) 字体大小 | 全局响应式布局 |
| vw | 视口宽度的 1% | 视口相关布局 |
| vh | 视口高度的 1% | 视口相关布局 |
| % | 父元素对应属性 | 自适应布局 |
| ch | 字符 "0" 的宽度 | 等宽字体排版 |


**rem vs em：**

```css
html { font-size: 16px; }

.parent {
  font-size: 20px;
  padding: 2em;      /* 40px (相对于自身 20px) */
}

.child {
  font-size: 1.5rem; /* 24px (相对于 html 16px) */
  margin: 1em;       /* 24px (相对于自身 24px) */
}
```

**rem 适配方案：**

```javascript
// 根据视口宽度动态设置 html font-size
function setRem() {
  const designWidth = 375;  // 设计稿宽度
  const baseFontSize = 100; // 1rem = 100px
  const scale = document.documentElement.clientWidth / designWidth;
  document.documentElement.style.fontSize = baseFontSize * scale + 'px';
}
window.addEventListener('resize', setRem);
setRem();
```

## 响应式设计
### 4.1 媒体查询
#### 媒体查询的使用方式有哪些？如何实现移动端优先和桌面端优先？
**基本语法：**

```css
/* 方式1: 外链样式表 */
<link rel="stylesheet" media="screen and (max-width: 768px)" href="mobile.css">

/* 方式2: @media 规则 */
@media screen and (max-width: 768px) {
  /* 样式 */
}
```

**媒体特性：**

```css
/* 宽度 */
@media (min-width: 768px) { }    /* >= 768px */
@media (max-width: 768px) { }    /* <= 768px */
@media (width: 768px) { }        /* = 768px */

/* 范围 */
@media (768px <= width <= 1200px) { }  /* 现代浏览器 */

/* 方向 */
@media (orientation: portrait) { }   /* 竖屏 */
@media (orientation: landscape) { }  /* 横屏 */

/* 其他 */
@media (hover: hover) { }           /* 支持悬停 */
@media (prefers-color-scheme: dark) { } /* 深色模式 */
```

**移动端优先 (Mobile First)：**

```css
/* 基础样式：移动端 */
.container {
  width: 100%;
  padding: 10px;
}

/* 平板 */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* 桌面 */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```

**桌面端优先 (Desktop First)：**

```css
/* 基础样式：桌面端 */
.container {
  width: 1170px;
  margin: 0 auto;
}

/* 平板 */
@media (max-width: 1199px) {
  .container {
    width: 750px;
  }
}

/* 移动端 */
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
```

### 4.2 适配方案
#### 移动端适配有哪些方案？各有什么优缺点？
| 方案 | 原理 | 优点 | 缺点 |
| --- | --- | --- | --- |
| Viewport 缩放 | 固定宽度，缩放适配 | 简单，1:1还原设计稿 | 字体/线条可能模糊 |
| Rem 适配 | 根字体动态计算 | 精确控制，兼容性好 | 需要 JS 支持 |
| Vw/Vh 适配 | 视口百分比 | 原生支持，无需 JS | 兼容性稍差，小数像素 |
| Flexible 方案 | 动态 viewport + rem | 综合优势 | 复杂度较高 |


**Viewport 设置：**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**现代推荐方案（vw）：**

```css
/* 设计稿 375px，1vw = 3.75px */
.container {
  width: 100vw;
  padding: 2.6667vw;  /* 10px / 3.75 */
  font-size: 4.2667vw; /* 16px / 3.75 */
}

/* 使用 CSS 预处理器简化 */
@function vw($px) {
  @return ($px / 375) * 100vw;
}

.container {
  padding: vw(10);
  font-size: vw(16);
}
```

## 性能优化
### 5.1 渲染机制
#### 浏览器渲染页面有哪些步骤？什么是重排和重绘？
****

**渲染流程：**

1. HTML 解析生成 DOM Tree
2. CSS 解析生成 CSSOM Tree
3. DOM 和 CSSOM 合并生成 Render Tree（渲染树）
4. Layout（布局/重排）：计算元素位置和大小
5. Paint（绘制/重绘）：绘制像素到屏幕
6. Composite（合成）：将图层合成为最终页面

**重排 (Reflow)：**

+ 当元素尺寸、位置发生变化时触发
+ 需要重新计算布局
+ 代价高，会触发后续重绘

**触发重排的属性：**

```css
/* 几何属性 */
width, height, padding, margin, border
position, top, left, right, bottom
display, float, clear
overflow, overflow-x/y
```

**重绘 (Repaint)：**

+ 当元素外观变化但不影响布局时触发
+ 只需重新绘制像素
+ 代价较低

**触发重绘的属性：**

```css
/* 外观属性 */
color, background-color, background-image
border-color, border-radius
box-shadow, text-shadow
visibility, opacity
```

**优化策略：**

```javascript
// 1. 批量修改样式（使用 cssText 或 class）
const el = document.getElementById('box');

// 不好：触发3次重排
el.style.width = '100px';
el.style.height = '100px';
el.style.margin = '10px';

// 好：只触发1次
el.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
// 或
el.className = 'new-class';

// 2. 离线操作（DocumentFragment）
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);

// 3. 使用 transform 代替位置属性
// 不好
box.style.left = '100px';

// 好（不会触发重排，使用 GPU 加速）
box.style.transform = 'translateX(100px)';

// 4. 避免强制同步布局
// 不好
const width = box.offsetWidth;  // 读取
box.style.width = width + 10 + 'px';  // 写入
const height = box.offsetHeight;  // 再次读取（强制同步布局）

// 好：先读后写
const width = box.offsetWidth;
const height = box.offsetHeight;
box.style.width = width + 10 + 'px';
box.style.height = height + 10 + 'px';
```



### 5.2 优化策略
#### CSS 性能优化有哪些常用手段？
****

**1. 选择器优化**

```css
/* 避免过深的选择器 */
/* 不好 */
.header .nav ul li a span { }

/* 好 */
.nav-link span { }

/* 避免通配符 */
/* 不好 */
* { margin: 0; }

/* 好 */
body, h1, h2, p { margin: 0; }
```

**2. 减少重排重绘**

```css
/* 使用 transform 和 opacity（GPU 加速） */
.animated {
  will-change: transform;  /* 提前告知浏览器 */
  transform: translateZ(0); /* 开启硬件加速 */
}

/* 使用 contain 隔离 */
.module {
  contain: layout style paint;  /* 限制影响范围 */
}
```

**3. 资源加载优化**

```css
/* 关键 CSS 内联 */
<style>
  /* 首屏关键样式 */
</style>
/* 非关键 CSS 异步加载 */
<link rel="preload" href="non-critical.css" as="style" onload="this.rel='stylesheet'">

/* 字体优化 */
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;  /* 先显示后备字体 */
}
```

**4. 其他优化**

```css
/* 使用 CSS 变量减少重复 */
:root {
  --primary: #1890ff;
}

/* 使用 content-visibility 延迟渲染 */
.card {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

## 高级特性
### 6.1 过渡与动画
#### transition 和 animation 有什么区别？
| 特性 | Transition | Animation |
| --- | --- | --- |
| 触发方式 | 需要事件触发 | 自动播放 |
| 关键帧 | 只有开始和结束 | 支持多关键帧 |
| 循环播放 | 不支持 | 支持 |
| 播放控制 | 有限 | 完整控制（暂停、播放等） |
| 适用场景 | 简单状态变化 | 复杂动画效果 |


**Transition：**

```css
.box {
  width: 100px;
  transition: width 0.3s ease-in-out 0.1s;
  /* property duration timing-function delay */
}
.box:hover {
  width: 200px;
}
```

**Animation：**

```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.box {
  animation: slideIn 0.5s ease-out forwards;
  /* name duration timing-function fill-mode */
}
```

#### 如何实现一个平滑的加载骨架屏动画？
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 使用 */
.skeleton-text {
  height: 16px;
  margin-bottom: 8px;
  border-radius: 4px;
}
.skeleton-text:nth-child(2) {
  width: 80%;
}
.skeleton-text:nth-child(3) {
  width: 60%;
}
```

### 工程化实践
### 7.1 预处理器
#### CSS 预处理器（Sass/Less/Stylus）有用过吗 有什么优势？常用功能有哪些？
**优势：**

1. **变量**：可复用的值
2. **嵌套**：更清晰的层级结构
3. **混入 (Mixin)**：可复用的代码块
4. **继承**：代码复用
5. **运算**：数学计算
6. **函数**：复杂的逻辑处理
7. **模块化**：文件拆分与导入

**Sass 示例：**

```sass
// 变量
$primary-color: #1890ff;
$spacing-unit: 8px;

// 嵌套
.nav {
  background: $primary-color;
  
  &__list {  // & 表示父选择器，编译为 .nav__list
    display: flex;
  }
  
  &__item {
    padding: $spacing-unit * 2;
    
    &:hover {
      background: darken($primary-color, 10%);
    }
  }
}

// Mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include flex-center;
}

// 带参数的 Mixin
@mixin button($bg-color, $text-color: white) {
  background: $bg-color;
  color: $text-color;
  padding: 8px 16px;
  border-radius: 4px;
  
  &:hover {
    background: darken($bg-color, 10%);
  }
}

.btn-primary {
  @include button(#1890ff);
}

.btn-danger {
  @include button(#ff4d4f);
}

// 继承
%clearfix {
  &::after {
    content: '';
    display: block;
    clear: both;
  }
}

.container {
  @extend %clearfix;
}

// 函数
@function rem($px) {
  @return $px / 16 * 1rem;
}

.title {
  font-size: rem(24);
}

// 条件与循环
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

// 模块化
@import 'variables';
@import 'mixins';
@import 'components/button';
```

### 7.2 CSS 模块化方案
#### CSS Modules、BEM、CSS-in-JS 各有什么特点？如何选择？
| 方案 | 原理 | 优点 | 缺点 | 适用场景 |
| --- | --- | --- | --- | --- |
| BEM | 命名规范 | 简单，无构建依赖 | 类名冗长 | 传统项目 |
| CSS Modules | 构建时转换 | 局部作用域，无冲突 | 需要构建工具 | React/Vue 项目 |
| CSS-in-JS | JS 运行时生成 | 动态样式，组件化 | 运行时开销 | React 项目 |
| Scoped CSS | 属性选择器 | 原生支持 | 深度选择器问题 | Vue 项目 |


**BEM：**

```css
/* Block Element Modifier */
.card { }                    /* Block */
.card__title { }             /* Element */
.card__button { }
.card--large { }             /* Modifier */
.card__button--primary { }
```

**CSS Modules：**

```css
/* Button.module.css */
.button {
  background: blue;
}
.primary {
  composes: button;
  background: green;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.primary}>Click</button>;
  // 编译后: class="Button_primary__3d7x2"
}
```

**CSS-in-JS (Styled-components)：**

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 8px 16px;
  
  &:hover {
    opacity: 0.8;
  }
`;

// 使用
<Button primary>Primary</Button>
<Button>Default</Button>

```

**选择建议：**

+ **Vue 项目**：Scoped CSS + BEM
+ **React 项目**：CSS Modules 或 CSS-in-JS
+ **大型项目**：CSS Modules（性能更好）
+ **需要动态样式**：CSS-in-JS

### 7.3 PostCSS 与现代 CSS
#### PostCSS 是什么？有哪些常用插件？
****

**PostCSS** 是用 JavaScript 工具和插件转换 CSS 的工具。

**常用插件：**

| 插件 | 作用 |
| --- | --- |
| autoprefixer | 自动添加浏览器前缀 |
| postcss-preset-env | 使用未来 CSS 特性 |
| postcss-nested | 嵌套语法 |
| cssnano | CSS 压缩 |
| postcss-import | @import 处理 |
| tailwindcss | 原子化 CSS 框架 |


**配置示例：**

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-preset-env')({
      stage: 1,  // 使用实验性特性
      features: {
        'nesting-rules': true,
      },
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
```

**未来 CSS 特性：**

```css
/* 嵌套（原生支持） */
.card {
  background: white;
  
  &:hover {
    background: gray;
  }
  
  /* 等价于 .card .title */
  .title {
    font-size: 16px;
  }
}

/* 容器查询 */
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}

/* 层叠层 */
@layer base, components, utilities;

@layer base {
  body { margin: 0; }
}

@layer components {
  .btn { padding: 8px; }
}

/* 作用域样式 */
@scope (.card) {
  .title { /* 只匹配 .card 内部的 .title */ }
}
```

## 写题专区
### 8.1 常见布局实现
#### 实现一个三角形
```css
/* 等边三角形 */
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 86.6px solid red;  /* 50 * 根号3 约等于 86.6 */
}

/* 直角三角形 */
.triangle-right {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-bottom: 50px solid red;
}

/* 箭头 */
.arrow-up {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid black;
}
```

#### 实现一个圆形进度条
```html
<div class="progress-circle">
  <svg viewBox="0 0 100 100">
    <circle class="bg" cx="50" cy="50" r="45"></circle>
    <circle class="progress" cx="50" cy="50" r="45"></circle>
  </svg>
  <span class="text">75%</span>
</div>

```

```css
.progress-circle {
  position: relative;
  width: 100px;
  height: 100px;
}

.progress-circle svg {
  transform: rotate(-90deg);
}

.progress-circle circle {
  fill: none;
  stroke-width: 8;
}

.bg {
  stroke: #e6e6e6;
}

.progress {
  stroke: #1890ff;
  stroke-linecap: round;
  stroke-dasharray: 283;  /* 2 * 3.14 * 45 约等于 283 */
  stroke-dashoffset: 70.75;  /* 283 * (1 - 0.75) */
  transition: stroke-dashoffset 0.5s;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
}
```

---

#### 实现文字渐变效果
```css
.gradient-text {
  background: linear-gradient(45deg, #1890ff, #ff4d4f);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 48px;
  font-weight: bold;
}
```

#### 实现毛玻璃效果
```css
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  padding: 20px;
}
```

#### 实现水平垂直居中的 5 种方式
```css
/* 1. Flexbox (推荐) */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. Grid */
.center-grid {
  display: grid;
  place-items: center;
}

/* 3. 绝对定位 + transform */
.center-transform {
  position: relative;
}
.center-transform .child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. 绝对定位 + margin auto */
.center-margin {
  position: relative;
}
.center-margin .child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
}

/* 5. 绝对定位 + calc */
.center-calc {
  position: relative;
}
.center-calc .child {
  position: absolute;
  top: calc(50% - 50px);   /* 减去子元素高度的一半 */
  left: calc(50% - 100px); /* 减去子元素宽度的一半 */
}
```

#### 实现多行文本省略
```css
/* 单行省略 */
.ellipsis-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行省略 */
.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 兼容方案 */
.ellipsis-compat {
  position: relative;
  line-height: 1.5;
  max-height: 3em;  /* 行高 * 行数 */
  overflow: hidden;
}

.ellipsis-compat::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 20px;
  background: linear-gradient(to right, transparent, white 50%);
}
```

#### 实现自适应正方形
```css
/* 方式1: padding 百分比 */
.square {
  width: 50%;
  padding-bottom: 50%;  /* 相对于父元素宽度 */
  height: 0;
  position: relative;
}

.square-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 方式2: aspect-ratio (现代浏览器) */
.square-modern {
  width: 50%;
  aspect-ratio: 1 / 1;
}
```

#### 实现 0.5px 边框
```css
/* 方式1: 伪元素 + transform 缩放 */
.border-half {
  position: relative;
}

.border-half::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #ccc;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
}

/* 方式2: 使用 box-shadow */
.border-shadow {
  box-shadow: 0 0 0 0.5px #ccc;
}

/* 方式3: 使用 viewport 单位 */
@media (min-resolution: 2dppx) {
  .border-device {
    border: 0.5px solid #ccc;
  }
}
```

#### 实现圣杯布局（双飞翼布局）
```html
<div class="holy-grail">
  <div class="center">中间内容</div>
  <div class="left">左侧栏</div>
  <div class="right">右侧栏</div>
</div>

```

```css
/* Flex 方式（推荐） */
.holy-grail {
  display: flex;
}

.holy-grail .center {
  flex: 1;
  order: 2;
}

.holy-grail .left {
  width: 200px;
  order: 1;
}

.holy-grail .right {
  width: 200px;
  order: 3;
}

/* Grid 方式 */
.holy-grail-grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}

/* 传统方式（浮动） */
.holy-grail-float {
  padding: 0 200px;
  overflow: hidden;
}

.holy-grail-float .center {
  float: left;
  width: 100%;
}

.holy-grail-float .left {
  float: left;
  width: 200px;
  margin-left: -100%;
  position: relative;
  left: -200px;
}

.holy-grail-float .right {
  float: left;
  width: 200px;
  margin-left: -200px;
  position: relative;
  right: -200px;
}
```

#### 实现 Loading 动画
```html
<div class="loading">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>

```

```css
.loading {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  background: #1890ff;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 旋转 Loading */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1890ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## 附录：面试答题技巧
### 1. 结构化回答
概念定义 → 核心原理 → 实际应用 → 注意事项

### 2. 结合实践经验
+ 不要只背概念
+ 举例说明实际使用场景
+ 提及遇到的问题和解决方案

### 3. 展示深度
+ 不仅说"是什么"，还要说"为什么"
+ 对比不同方案的优缺点
+ 提及浏览器兼容性和性能影响

### 4. 手写题技巧
+ 先描述思路
+ 写出核心代码
+ 说明注意事项和优化点


