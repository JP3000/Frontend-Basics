### 1. **Flex布局及常用属性**
#### 基本语法：
`display: flex;`

#### 父容器属性：
| **<font style="color:rgb(0, 0, 0);">属性</font>** | **<font style="color:rgb(0, 0, 0);">作用</font>** |
| --- | --- |
| <font style="color:rgb(0, 0, 0);">flex-direction</font> | <font style="color:rgb(0, 0, 0);">主轴方向（row / row-reverse / column / column-reverse）</font> |
| <font style="color:rgb(0, 0, 0);">justify-content</font> | <font style="color:rgb(0, 0, 0);">主轴对齐方式（start / center / space-between / space-around / space-evenly）</font> |
| <font style="color:rgb(0, 0, 0);">align-items</font> | <font style="color:rgb(0, 0, 0);">交叉轴对齐方式（stretch / center / flex-start / flex-end / baseline）</font> |
| <font style="color:rgb(0, 0, 0);">flex-wrap</font> | <font style="color:rgb(0, 0, 0);">是否换行（nowrap / wrap / wrap-reverse）</font> |
| <font style="color:rgb(0, 0, 0);">align-content</font> | <font style="color:rgb(0, 0, 0);">多行交叉轴对齐（只有多行才生效）</font> |


#### 子项属性：
| **<font style="color:rgb(0, 0, 0);">属性</font>** | **<font style="color:rgb(0, 0, 0);">说明</font>** |
| --- | --- |
| <font style="color:rgb(0, 0, 0);">flex</font> | <font style="color:rgb(0, 0, 0);">简写：flex-grow flex-shrink flex-basis</font> |
| <font style="color:rgb(0, 0, 0);">order</font> | <font style="color:rgb(0, 0, 0);">排序</font> |
| <font style="color:rgb(0, 0, 0);">align-self</font> | <font style="color:rgb(0, 0, 0);">单个项目的交叉轴对齐</font> |


### 2. 两栏 / 三栏布局方式
#### 两栏布局 三栏布局
一般两栏布局指的是**左边一栏宽度固定，右边一栏宽度自适应**，两栏布局的具体实现：

+ 利用浮动，将左边元素宽度设置为200px，并且设置向左浮动。将右边元素的margin-left设置为200px，宽度设置为auto（默认为auto，撑满整个父元素）。
+ 利用浮动，左侧元素设置固定大小，并左浮动，右侧元素设置overflow: hidden; 这样右边就触发了BFC，BFC的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠。
+ 利用flex布局，将左边元素设置为固定宽度200px，将右边的元素设置为flex:1。
+ 利用绝对定位，将父级元素设置为相对定位。左边元素设置为absolute定位，并且宽度设置为200px。将右边元素的margin-left的值设置为200px。
+ 利用绝对定位，将父级元素设置为相对定位。左边元素宽度设置为200px，右边元素设置为绝对定位，左边定位为200px，其余方向定位为0。

三栏布局一般指的是页面中一共有三栏，**左右两栏宽度固定，中间自适应的布局**，三栏布局的具体实现：

+ 利用**绝对定位**，外面相对定位，里面三个绝对定位 分别left：0，left：200 right：200，right：0
+ 利用flex布局，左右两栏设置固定大小，中间一栏设置为flex:1。
+ grid 布局

<img src="https://cdn.nlark.com/yuque/0/2025/png/27092124/1749469554377-ad5638b7-c5d4-40ba-92de-806bcbc1e92d.png" width="754" title="" crop="0,0,1,1" id="u70ccd6a5" class="ne-image">

+ 左右浮动给宽高 中间要放在左右的后面才可以
+  清除**了⾼度，⽤ flex 和 表格 布局还能继续使⽤。 **

#### 两栏布局（左固定，右自适应）
```plain
<div class="container">
  <div class="left">Left</div>
  <div class="right">Right</div>
</div>
```

```plain
.container { display: flex; }
.left { width: 200px; }
.right { flex: 1; }
```

#### 三栏布局（左右固定，中间自适应）
```plain
.container {
  display: flex;
}
.left, .right {
  width: 200px;
}
.center {
  flex: 1;
}
```

### 3. BFC（块级格式化上下文）
#### 一、什么是 BFC？
**BFC（Block Formatting Context）是一个独立的渲染区域，只有块级盒子参与，区域内部的布局不会影响外部元素，也不会被外部元素影响。**

简单理解：**BFC 是浏览器在渲染页面时，为了管理块级元素的布局，创建的一个“隔离容器”**，容器内外互不干扰。

#### 二、BFC 的触发条件
满足以下任一条件的元素都会形成 BFC：

+ `float` 不为 `none`
+ `position` 为 `absolute` 或 `fixed`
+ `display` 为 `inline-block`、`table-cell`、`flex`、`grid`、`flow-root`
+ `overflow` 不为 `visible`（如 `hidden`、`auto`、`scroll`）

#### 三、BFC 的特性（作用）
1. **防止 margin 合并（塌陷）**

相邻两个块级元素的垂直外边距会发生合并，但如果它们处在不同的 BFC 中则不会合并。

1. **可以包含浮动元素**

一个 BFC 会扩展其高度以包含其内部的浮动子元素，从而防止“高度塌陷”。

1. **阻止文字环绕浮动元素**

在 BFC 中的内容不会受到外部浮动元素的影响。

1. **实现布局隔离**

BFC 可以防止内部元素影响外部布局，是构建复杂布局时的常用技术。

#### 四、常见使用场景
+ **清除浮动**（解决父元素高度塌陷）：

```plain
.clearfix {
  overflow: hidden;
}
```

+ **阻止 margin 合并**

```plain
.container {
  overflow: hidden;
}
```

+ **实现左右两列自适应布局**

```plain
.left {
  float: left;
  width: 200px;
}
.right {
  overflow: hidden;
}
```

### 4. 水平 & 垂直居中（经典考点）
#### 一、块级元素的水平居中
##### 1. `margin: 0 auto`（常用于固定宽度的块级元素）
```plain
.center {
  width: 300px;
  margin: 0 auto;
}
```

+ 适用场景：块级元素，已设置 `width`
+ 原理：左右 margin 自动分配空间

#### 二、行内元素的水平居中
##### 2. `text-align: center`（使子元素居中）
```plain
.container {
  text-align: center;
}
```

+ 适用场景：子元素为行内元素或 `inline-block`
+ 注意：父容器需要设置 `text-align`

#### 三、垂直居中
##### 3. `line-height` 等于高度（适用于单行文字）
```css
.center-text {
  height: 50px;
  line-height: 50px;
}
```

+ 适用场景：单行文本、固定高度
+ 缺点：不适用于多行文本或子元素

#### 四、水平+垂直居中
##### 4. 使用 `flex` 实现双向居中（最推荐）
```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

+ 适用场景：最通用、响应式强
+ 兼容性好，现代布局首选方式

##### 5. `position + transform`（兼容性好，经典方案）
```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

+ 适用场景：已知容器大小或完全自由定位
+ 兼容性好，适用于较老项目

##### 6. `position + margin`（仅限固定大小元素）
```css
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 100px;
  margin-left: -100px;  /* width 一半 
  /
  *  margin-top: -50px;    /*
  height 一半 */
}
```

+ 缺点：不适应动态内容或响应式

#### 五、其他方法（拓展）
##### 7. Grid 布局实现居中
```plain
.container {
  display: grid;
  place-items: center; /* 等价于 justify + align 同时居中 */
}
```

+ 兼容性好，适用于支持 CSS Grid 的环境

##### 8. `table-cell + vertical-align`
```css
.container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

+ 适合旧浏览器兼容方案，但不推荐用于现代布局

#### 六、小结：选择方案指南
| <font style="color:rgb(0, 0, 0);">需求场景</font> | <font style="color:rgb(0, 0, 0);">推荐方法</font> |
| --- | --- |
| <font style="color:rgb(0, 0, 0);">文本单行垂直居中</font> | <font style="color:rgb(0, 0, 0);">line-height</font> |
| <font style="color:rgb(0, 0, 0);">行内元素居中</font> | <font style="color:rgb(0, 0, 0);">text-align: center</font> |
| <font style="color:rgb(0, 0, 0);">通用元素双向居中</font> | <font style="color:rgb(0, 0, 0);">flex、grid</font> |
| <font style="color:rgb(0, 0, 0);">绝对定位场景</font> | <font style="color:rgb(0, 0, 0);">position + transform</font> |
| <font style="color:rgb(0, 0, 0);">老项目/兼容性需求</font> | <font style="color:rgb(0, 0, 0);">table-cell</font> |


### 5. 响应式布局
#### 方法：
+ 百分比布局
+ 媒体查询（Media Queries）
+ 弹性盒子（Flex）+ 媒体查询
+ Grid布局
+ rem/em 单位 + viewport 单位（vw/vh）

#### 示例：
```css
@media (max-width: 768px) {
  .menu { display: none; }
}
```

###  6. display 属性常用值
| <font style="color:rgb(0, 0, 0);">值</font> | <font style="color:rgb(0, 0, 0);">说明</font> |
| --- | --- |
| <font style="color:rgb(0, 0, 0);">none</font> | <font style="color:rgb(0, 0, 0);">不显示</font> |
| <font style="color:rgb(0, 0, 0);">block</font> | <font style="color:rgb(0, 0, 0);">块级元素</font> |
| <font style="color:rgb(0, 0, 0);">inline</font> | <font style="color:rgb(0, 0, 0);">行内元素</font> |
| <font style="color:rgb(0, 0, 0);">inline-block</font> | <font style="color:rgb(0, 0, 0);">行内块级</font> |
| <font style="color:rgb(0, 0, 0);">flex</font> | <font style="color:rgb(0, 0, 0);">弹性盒</font> |
| <font style="color:rgb(0, 0, 0);">grid</font> | <font style="color:rgb(0, 0, 0);">网格布局</font> |
| <font style="color:rgb(0, 0, 0);">table</font> | <font style="color:rgb(0, 0, 0);">表格布局</font> |


### 7. position 属性解析
| <font style="color:rgb(0, 0, 0);">值</font> | <font style="color:rgb(0, 0, 0);">定位方式</font> | <font style="color:rgb(0, 0, 0);">是否脱标</font> |
| --- | --- | --- |
| <font style="color:rgb(0, 0, 0);">static</font> | <font style="color:rgb(0, 0, 0);">默认</font> | <font style="color:rgb(0, 0, 0);">否</font> |
| <font style="color:rgb(0, 0, 0);">relative</font> | <font style="color:rgb(0, 0, 0);">相对自身</font> | <font style="color:rgb(0, 0, 0);">否</font> |
| <font style="color:rgb(0, 0, 0);">absolute</font> | <font style="color:rgb(0, 0, 0);">相对最近的非 static 父元素</font> | <font style="color:rgb(0, 0, 0);">是</font> |
| <font style="color:rgb(0, 0, 0);">fixed</font> | <font style="color:rgb(0, 0, 0);">相对于视口固定</font> | <font style="color:rgb(0, 0, 0);">是</font> |
| <font style="color:rgb(0, 0, 0);">sticky</font> | <font style="color:rgb(0, 0, 0);">滑动到某个点变 fixed</font> | <font style="color:rgb(0, 0, 0);">否（条件触发）</font> |


### 8. CSS3 新特性简表
| <font style="color:rgb(0, 0, 0);">特性</font> | <font style="color:rgb(0, 0, 0);">用法示例</font> |
| --- | --- |
| <font style="color:rgb(0, 0, 0);">box-shadow</font> | <font style="color:rgb(0, 0, 0);">阴影效果</font> |
| <font style="color:rgb(0, 0, 0);">border-radius</font> | <font style="color:rgb(0, 0, 0);">圆角</font> |
| <font style="color:rgb(0, 0, 0);">transition / animation</font> | <font style="color:rgb(0, 0, 0);">动画</font> |
| <font style="color:rgb(0, 0, 0);">transform</font> | <font style="color:rgb(0, 0, 0);">位移、缩放、旋转</font> |
| <font style="color:rgb(0, 0, 0);">flex / grid</font> | <font style="color:rgb(0, 0, 0);">布局</font> |
| <font style="color:rgb(0, 0, 0);">calc()</font> | <font style="color:rgb(0, 0, 0);">动态计算值</font> |
| <font style="color:rgb(0, 0, 0);">custom properties</font> | <font style="color:rgb(0, 0, 0);">变量：--main-color: red;</font> |
| <font style="color:rgb(0, 0, 0);">clip-path</font> | <font style="color:rgb(0, 0, 0);">裁剪形状</font> |


### 9. 伪类 vs 伪元素 的区别
| <font style="color:rgb(0, 0, 0);">项目</font> | <font style="color:rgb(0, 0, 0);">伪类（Pseudo-class）</font> | <font style="color:rgb(0, 0, 0);">伪元素（Pseudo-element）</font> |
| --- | --- | --- |
| <font style="color:rgb(0, 0, 0);">语法</font> | <font style="color:rgb(0, 0, 0);">:hover, :nth-child()</font> | <font style="color:rgb(0, 0, 0);">::before, ::after</font> |
| <font style="color:rgb(0, 0, 0);">定义</font> | <font style="color:rgb(0, 0, 0);">基于元素状态</font> | <font style="color:rgb(0, 0, 0);">基于元素内容虚拟生成</font> |
| <font style="color:rgb(0, 0, 0);">使用</font> | <font style="color:rgb(0, 0, 0);">动态交互、结构选择</font> | <font style="color:rgb(0, 0, 0);">添加内容、装饰效果</font> |
| <font style="color:rgb(0, 0, 0);">作用对象</font> | <font style="color:rgb(0, 0, 0);">实际 DOM 元素</font> | <font style="color:rgb(0, 0, 0);">虚拟节点（非 DOM）</font> |


### 10. 画三角形
```css
.triangle {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: red; /* 向上的三角形 */
}
```

原理：利用 `border` 四个方向颜色和宽度绘制出方向性图形

### 11. transition vs animation 的区别
| <font style="color:rgb(0, 0, 0);">比较点</font> | <font style="color:rgb(0, 0, 0);">transition</font> | <font style="color:rgb(0, 0, 0);">animation</font> |
| --- | --- | --- |
| <font style="color:rgb(0, 0, 0);">触发方式</font> | <font style="color:rgb(0, 0, 0);">状态变化触发（如 hover）</font> | <font style="color:rgb(0, 0, 0);">自动执行（可无限循环）</font> |
| <font style="color:rgb(0, 0, 0);">控制方式</font> | <font style="color:rgb(0, 0, 0);">只能从 A → B</font> | <font style="color:rgb(0, 0, 0);">可多个关键帧，自定义路径</font> |
| <font style="color:rgb(0, 0, 0);">简单程度</font> | <font style="color:rgb(0, 0, 0);">简单、轻量</font> | <font style="color:rgb(0, 0, 0);">更灵活、复杂</font> |
| <font style="color:rgb(0, 0, 0);">示例用法</font> | <font style="color:rgb(0, 0, 0);">transition: all 0.3s;</font> | <font style="color:rgb(0, 0, 0);">@keyframes + animation: xxx 2s infinite</font> |


#### requestAnimationFrame
浏览器提供的一种用于实现高性能动画的原生 API，其主要作用是在浏览器下一次重绘前执行一个回调函数，从而实现与浏览器刷新率同步的动画效果。相比于传统的 `setTimeout` 和 `setInterval`，它在动画流畅性、性能优化和资源管理方面有明显优势。

它的回调函数会在每一帧执行（通常是 60 次每秒），并接收一个高精度时间戳作为参数，方便开发者计算动画的执行进度。同时，`requestAnimationFrame` 在页面不可见时会自动暂停调用，从而节省资源，非常适合用于动画、游戏渲染、滚动监听等高频任务。

与 `setInterval` 不同，`requestAnimationFrame` 具有更高的时间精度、更平滑的动画效果，并且更节能。通过配合 `cancelAnimationFrame`，开发者也可以灵活控制动画的开启和终止。

面试中常涉及的问题包括：它与定时器的区别、是否在后台执行、帧率控制原理，以及如何使用该方法实现流畅的动画效果。掌握 `requestAnimationFrame` 是理解浏览器渲染机制与性能优化的重要基础。

### 请你讲一下 CSS 选择器
**参考回答：**

CSS 选择器用于匹配 HTML 文档中的元素，是 CSS 规则生效的前提。按照匹配方式可以分为几类：基础选择器、组合选择器和伪类/伪元素选择器。基础选择器包括元素选择器、类选择器、ID 选择器和属性选择器，用于按标签、类名、唯一标识或属性条件定位元素；组合选择器用于描述元素之间的结构关系，例如后代选择器、子选择器、相邻兄弟选择器和通用兄弟选择器，用于在 DOM 结构中精确限定作用范围；伪类选择器用于描述元素在某种状态下的表现，如 `:hover`、`:active`、`:focus`、`:nth-child` 等，而伪元素用于控制元素的局部区域或生成内容，如 `::before`、`::after`。在实际工程中需要结合选择器优先级和作用范围，避免过度依赖高权重选择器，从而提升样式的可维护性和可控性。

#### 面试追问 1：CSS 选择器的优先级是如何计算的？
CSS 选择器优先级按照权重从高到低依次为：内联样式、ID 选择器、类选择器 / 属性选择器 / 伪类选择器、元素选择器 / 伪元素选择器。具体计算方式是分别统计 ID、类、元素的数量形成权重值，权重高的规则优先生效；当权重相同时，后声明的样式会覆盖先声明的样式。`!important` 会强制提升优先级，但在工程中应尽量避免使用。

#### 为什么不推荐大量使用 ID 选择器？
ID 选择器权重过高，容易打破样式的层级规则，一旦样式需要覆盖只能继续引入更高权重或 `!important`，会导致样式体系不可维护。同时 ID 具有唯一性，不利于样式复用，在组件化开发中通常更推荐使用类选择器配合明确的语义命名。

#### 伪类和伪元素有什么区别？
伪类用于描述元素在特定状态下的表现，本质上是对已有元素状态的抽象，例如 `:hover`、`:focus`、`:nth-child`；伪元素用于描述元素的某一部分或生成的虚拟内容，例如 `::before`、`::after`，在 DOM 中并不存在真实节点，但可以像普通元素一样进行样式控制。

| 选择器 | 权重 |
| --- | --- |
| id选择器 `#id` | 100 |
| 类选择器 `.classname` | 10 |
| 属性选择器 `div[class="foo"]` | 10 |
| 伪类选择器 `div:last-child` | 10 |
| 标签选择器 `div` | 1 |
| 伪元素选择器 `div::after` | 1 |
| 兄弟选择器 `div+span` | 0 |
| 子选择器 `ui>li` | 0 |
| 后代选择器 `div span` | 0 |
| 通配符选择器 | 0 |

