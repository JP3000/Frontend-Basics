## 1. 垂直居中 N 种方法
**题型**：实现型

**教科书定义**：垂直居中是让元素在父容器中垂直方向居中对齐，有多种实现方式。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 元素默认靠上对齐 |
| 怎么解决的？ | Flex/Grid/定位/表格等多种方案 |
| 好处 | 布局更美观 |
| 坏处/取舍 | 不同方案有不同适用场景 |


**口语化输出**：

> "垂直居中常用四种方案：
>
> 第一种 Flex，最常用：父元素 `display: flex; align-items: center; justify-content: center`，水平垂直都居中，不用知道子元素宽高。
>
> 第二种 Grid，更简洁：父元素 `display: grid; place-items: center`，一行搞定。
>
> 第三种定位 + transform，不知道宽高时用：子元素 `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)`。原理是先移动到父元素中心点，再往回移动自身宽高的一半。
>
> 第四种定位 + margin auto，知道宽高时用：子元素 `position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; width: 200px; height: 200px`。四个方向都是 0，margin auto 会自动分配剩余空间。
>
> 面试推荐说 Flex 和 transform 这两种，一个现代方案一个兼容方案。"
>

**代码示例**：

```css
/* 1. flex（最常用） */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. grid */
.parent {
  display: grid;
  place-items: center;
}

/* 3. absolute + transform */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. absolute + margin:auto */
.child {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  width: 100px; height: 100px; /* 必须有宽高 */
}

/* 5. line-height（单行文字） */
.parent {
  height: 100px;
  line-height: 100px;
  text-align: center;
}
/* 6. table-cell */
.parent {
  display: table-cell;
  vertical-align: middle;  /* 垂直居中 */
  text-align: center;      /* 水平居中 */
  width: 300px;
  height: 300px;
}

/* 7. absolute + 负margin（需要知道子元素宽高） */
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;   /* 高度的一半 */
  margin-left: -50px;  /* 宽度的一半 */
}

```

**追问点**：

Q: 哪种方案兼容性最好？

> 定位 + transform，IE9+ 支持。Flex 是 IE10+，Grid 是现代浏览器。
>

Q: 行内元素怎么垂直居中？

> 单行文字用 `line-height` 等于容器高度；多行用 Flex 或 `vertical-align: middle`（需要配合 table-cell）。
>

---

## 2. 两栏布局
**题型**：实现型

**教科书定义**：两栏布局是一侧固定宽度，另一侧自适应填满剩余空间。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 侧边栏和内容区无法并排 |
| 怎么解决的？ | float+BFC / Flex / Grid |
| 好处 | 经典的后台管理布局 |
| 坏处/取舍 | 不同方案代码复杂度不同 |


**口语化输出**：

> "两栏布局常用三种方案：
>
> 第一种 Flex，最简单：父元素 `display: flex`，固定侧 `width: 200px`，自适应侧 `flex: 1`。flex: 1 会占满剩余空间。
>
> 第二种 float + BFC：固定侧 `float: left; width: 200px`，自适应侧 `overflow: hidden` 触发 BFC。BFC 不会和浮动元素重叠，自动填满剩余空间。
>
> 第三种 Grid：父元素 `display: grid; grid-template-columns: 200px 1fr`，1fr 表示剩余空间。
>
> 现在基本都用 Flex，代码最少最直观。"
>

**代码示例**：

```css
/* 1. flex */
.container { display: flex; }
.left { width: 200px; }
.right { flex: 1; }

/* 2. grid */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* 3. float + margin */
.left { float: left; width: 200px; }
.right { margin-left: 200px; }

/* 4. float + BFC */
.left { float: left; width: 200px; }
.right { overflow: hidden; } /* 触发BFC */

```

**追问点**：

Q: flex: 1 是什么意思？

> `flex: 1` 是 `flex-grow: 1; flex-shrink: 1; flex-basis: 0` 的简写，表示可以放大占满剩余空间，也可以缩小。
>

Q: 为什么要加 flex-shrink: 0？

> 防止固定宽度的侧边栏在空间不足时被压缩。默认 flex-shrink: 1 会按比例缩小。
>

---

## 3. 三栏布局
**题型**：实现型

**教科书定义**：三栏布局是左右两侧固定宽度，中间自适应，常见的有圣杯布局和双飞翼布局。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 无法实现经典的网页布局 |
| 怎么解决的？ | 圣杯/双飞翼/Flex/Grid |
| 好处 | 中间内容优先加载 |
| 坏处/取舍 | 传统方案代码复杂 |


**口语化输出**：

> "三栏布局现在用 Flex 最简单：父元素 `display: flex`，左右固定宽度，中间 `flex: 1`。如果要中间内容优先加载，把中间的 DOM 放前面，用 `order` 属性调整显示顺序。
>
> 传统方案有圣杯和双飞翼，核心思想都是让中间内容在 DOM 中排第一（优先加载），然后用负 margin 和定位把左右拉到两边。
>
> 圣杯布局：三栏都浮动，中间宽度 100%，左右用负 margin 拉回来，父元素用 padding 留出左右空间，左右再用 relative 定位到 padding 区域。
>
> 双飞翼布局：中间多套一层 div，用 margin 留出左右空间，比圣杯简单一点，不用 relative 定位。
>
> 面试说 Flex 方案就够了，追问再说圣杯双飞翼的思路。"
>

**代码示例**：

```css
/* 1. flex */
.container { display: flex; }
.left { width: 200px; }
.center { flex: 1; }
.right { width: 200px; }

/* 2. grid */
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}

/* 3. 圣杯布局（float + 负margin + padding） */
.container { padding: 0 200px; }
.center { float: left; width: 100%; }
.left { float: left; width: 200px; margin-left: -100%; 
        position: relative; left: -200px; }
.right { float: left; width: 200px; margin-left: -200px;
         position: relative; right: -200px; }

/* 4. 双飞翼布局（float + 负margin + margin） */
.center { float: left; width: 100%; }
.center-inner { margin: 0 200px; }
.left { float: left; width: 200px; margin-left: -100%; }
.right { float: left; width: 200px; margin-left: -200px; }

```

**追问点**：

Q: 圣杯和双飞翼的区别？

> 都是让中间 DOM 在前面优先加载。圣杯用父元素 padding + 子元素 relative 定位；双飞翼用中间元素的子元素 margin，不用定位，更简单。
>

Q: 为什么要让中间内容优先加载？

> 早期网速慢，中间是主要内容，放 DOM 前面可以先渲染出来。现在网速快了，这个优化意义不大。
>

---

## 4. Flex 固定 + 自适应
**题型**：实现型

**教科书定义**：Flex 布局中一部分固定大小，另一部分自适应填满剩余空间。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 无法灵活分配空间 |
| 怎么解决的？ | flex-grow/flex-shrink/flex-basis |
| 好处 | 响应式布局的基础 |
| 坏处/取舍 | 需要理解 flex 三个属性 |


**口语化输出**：

> "Flex 固定 + 自适应的核心是理解 flex 属性。
>
> `flex: 1` 是 `flex-grow: 1; flex-shrink: 1; flex-basis: 0` 的简写。flex-grow 控制放大比例，flex-shrink 控制缩小比例，flex-basis 是初始大小。
>
> 固定部分：设置固定 width，加 `flex-shrink: 0` 防止被压缩。
>
> 自适应部分：设置 `flex: 1`，会占满剩余空间。
>
> 常见场景：输入框 + 按钮，输入框 flex: 1 自适应，按钮固定宽度；导航栏 logo 固定，菜单 flex: 1 居中，用户信息固定。"
>

**代码示例**：

```css
/* 输入框 + 按钮 */
.search-bar {
  display: flex;
}
.search-input {
  flex: 1;
  min-width: 0; /* 防止内容撑开 */
}
.search-btn {
  width: 80px;
  flex-shrink: 0;
}

/* 导航栏：logo + 菜单 + 用户 */
.navbar {
  display: flex;
  align-items: center;
}
.logo {
  width: 120px;
  flex-shrink: 0;
}
.menu {
  flex: 1;
  display: flex;
  justify-content: center;
}
.user {
  width: 100px;
  flex-shrink: 0;
}
```

**追问点**：

Q: 为什么要加 min-width: 0？

> Flex 子元素默认 min-width: auto，内容会撑开元素。设置 min-width: 0 允许元素缩小到比内容更小，配合 overflow: hidden 实现文字截断。
>

Q: flex: 1 和 flex: auto 的区别？

> flex: 1 是 `1 1 0`，初始大小为 0，按比例分配所有空间；flex: auto 是 `1 1 auto`，初始大小为内容大小，按比例分配剩余空间。
>

---

## 5. 文字截断
**题型**：实现型

**教科书定义**：文字截断是当文字超出容器时显示省略号，分单行和多行两种。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 文字溢出破坏布局 |
| 怎么解决的？ | text-overflow / -webkit-line-clamp |
| 好处 | 保持布局整洁 |
| 坏处/取舍 | 多行截断兼容性一般 |


**口语化输出**：

> "单行截断三件套：`overflow: hidden; white-space: nowrap; text-overflow: ellipsis`。overflow hidden 隐藏溢出，white-space nowrap 不换行，text-overflow ellipsis 显示省略号。
>
> 多行截断用 `-webkit-line-clamp`：`display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden`。虽然是 webkit 前缀，但现代浏览器都支持，包括 Firefox。
>
> 注意：Flex 子元素做文字截断要加 `min-width: 0`，否则内容会撑开容器，截断不生效。"
>

**代码示例**：

```css
/* 单行截断 */
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 多行截断（3行）*/
.ellipsis-multi {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

/* Flex 子元素截断 */
.flex-child {
  flex: 1;
  min-width: 0; /* 关键 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

**追问点**：

Q: 多行截断的兼容性？

> -webkit-line-clamp 现代浏览器都支持，IE 不支持。IE 可以用 JS 计算或伪元素模拟。
>

Q: 为什么 Flex 子元素要加 min-width: 0？

> Flex 子元素默认 min-width: auto，内容会撑开元素不让它缩小。设置 min-width: 0 才能让 overflow: hidden 生效。
>

---

## 6. 隐藏元素的方式
**题型**：对比型

**教科书定义**：隐藏元素有多种方式，各有不同的表现：是否占空间、是否响应事件、是否触发重排。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 无法控制元素显示隐藏 |
| 怎么解决的？ | 不同方式适用不同场景 |
| 好处 | 灵活控制 |
| 坏处/取舍 | 需要了解各方式的区别 |


**口语化输出**：

> "隐藏元素常用三种方式：
>
> `display: none`：完全隐藏，不占空间，不响应事件，会触发重排。用于完全移除元素，比如 Tab 切换。
>
> `visibility: hidden`：隐藏但占空间，不响应事件，只触发重绘。用于保留占位，比如表格单元格隐藏。
>
> `opacity: 0`：透明但占空间，还能响应事件（能点击），只触发合成。用于淡入淡出动画。
>
> 还有 `position: absolute; left: -9999px` 移出视口，不占空间，屏幕阅读器还能读到，用于无障碍访问。"
>

**代码示例**：

```css
/* display: none - 完全隐藏 */
.hidden-none {
  display: none;
}

/* visibility: hidden - 隐藏但占位 */
.hidden-visibility {
  visibility: hidden;
}

/* opacity: 0 - 透明但可点击 */
.hidden-opacity {
  opacity: 0;
}

/* 移出视口 - 无障碍友好 */
.sr-only {
  position: absolute;
  left: -9999px;
}
```

**追问点**：

Q: 哪种方式性能最好？

> opacity: 0 性能最好，只触发合成层，不走重排重绘。display: none 会触发重排，性能最差。
>

Q: 哪种方式还能响应点击？

> 只有 opacity: 0 还能响应事件。如果不想响应，加 `pointer-events: none`。
>

---

## 7. CSS 画三角形
**题型**：实现型

**教科书定义**：利用 border 的特性，当元素宽高为 0 时，四个边框会形成四个三角形。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 要用图片或 SVG |
| 怎么解决的？ | 利用 border 的斜切特性 |
| 好处 | 纯 CSS，不用图片 |
| 坏处/取舍 | 只能画简单三角形 |


**口语化输出**：

> "CSS 画三角形利用的是 border 的特性。当元素宽高为 0 时，四个边框会在交界处形成斜线，每个边框都是一个三角形。
>
> 画向上的三角形：宽高设为 0，只给 border-bottom 设颜色，左右 border 设透明。底边是三角形的底，左右透明边撑开宽度。
>
> 原理：border 不是矩形，而是梯形。当 content 为 0 时，梯形变成三角形。"
>

**代码示例**：

```css
/* 向上的三角形 ▲ */
.triangle-up {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}

/* 向下的三角形 ▼ */
.triangle-down {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
}

/* 向右的三角形 ▶ */
.triangle-right {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 100px solid red;
}

/* 直角三角形 */
.triangle-right-angle {
  width: 0;
  height: 0;
  border-bottom: 100px solid red;
  border-right: 100px solid transparent;
}
```

**追问点**：

Q: 怎么画等边三角形？

> 等边三角形的高 = 边长 × √3/2 ≈ 0.866。比如底边 100px，高约 86.6px，左右各 50px。
>

Q: 还有什么方式画三角形？

> clip-path 更灵活：`clip-path: polygon(50% 0%, 0% 100%, 100% 100%)`。SVG 也可以。
>

---

## 8. inline-block 空格问题
**题型**：解决型

**教科书定义**：inline-block 元素之间的换行符会被渲染成空格，导致元素之间有间隙。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 元素之间有意外的间隙 |
| 怎么解决的？ | font-size: 0 / Flex / 去掉换行 |
| 好处 | 布局精确 |
| 坏处/取舍 | 需要额外处理 |


**口语化输出**：

> "inline-block 元素之间有空格，是因为 HTML 中的换行符被当成空白文本节点渲染了。
>
> 最常用的解决方案是父元素 `font-size: 0`，子元素再设回正常字号。空格的宽度和字号相关，字号为 0 空格就没了。
>
> 更好的方案是直接用 Flex 布局，Flex 子元素不是 inline，没有空格问题。
>
> 其他方案：HTML 写在一行（可读性差）、用注释连接标签、负 margin（不精确）。"
>

**代码示例**：

```css
/* 方案1：font-size: 0（常用）*/
.container {
  font-size: 0;
}
.container > * {
  font-size: 16px; /* 恢复字号 */
}

/* 方案2：Flex（推荐）*/
.container {
  display: flex;
}

/* 方案3：负 margin（不推荐）*/
.item {
  display: inline-block;
  margin-right: -4px; /* 不精确 */
}
```

```html
<!-- 方案4：HTML 写一行 -->
<span>A</span><span>B</span><span>C</span>
<!-- 方案5：注释连接 -->
<span>A</span><!--
--><span>B</span><!--
--><span>C</span>

```

**追问点**：

Q: 为什么用 Flex 就没有空格问题？

> Flex 子元素是 flex item，不是 inline 元素，空白文本节点不会被渲染。
>

Q: 空格的宽度是多少？

> 大约是 font-size 的 1/3 到 1/2，取决于字体。中文字体的空格通常更宽。
>

---

## 9. Tailwind 实现常见组件
**题型**：实现型

**教科书定义**：Tailwind 是原子化 CSS 框架，用预定义的类名组合实现样式。

**启发式思维**：

| 问题 | 回答 |
| --- | --- |
| 没有它会怎样？ | 要写很多自定义 CSS |
| 怎么解决的？ | 用原子类组合 |
| 好处 | 开发快、CSS 体积小 |
| 坏处/取舍 | 类名长、需要学习 |


**口语化输出**：

> "Tailwind 用原子类组合实现样式，面试常问几个组件的实现：
>
> Label 标签：`inline-flex items-center px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800`。inline-flex 让它行内显示，rounded-full 是圆角药丸形状。
>
> 遮罩层：`fixed inset-0 bg-black/50 flex items-center justify-center`。inset-0 等于 top/right/bottom/left 都是 0，bg-black/50 是 50% 透明度的黑色。
>
> Loading 旋转：`animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full`。animate-spin 是内置的旋转动画，border-t-transparent 让顶边透明形成缺口。
>
> 按钮：`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors`。hover: 前缀处理悬停状态。"
>

**代码示例**：

```html
<!-- Label 标签 -->
<span class="inline-flex items-center px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
  标签
</span>
<!-- 状态标签（成功/警告/错误）-->
<span class="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">成功</span>
<span class="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">警告</span>
<span class="px-2 py-1 text-sm rounded-full bg-red-100 text-red-800">错误</span>
<!-- 遮罩层 + 弹窗 -->
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
    弹窗内容
  </div>
</div>
<!-- Loading 旋转圆环 -->
<div class="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
<!-- 三个点跳动 Loading -->
<div class="flex space-x-1">
  <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
  <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
  <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
</div>
<!-- 按钮 -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors">
  按钮
</button>
<!-- 输入框 -->
<input class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

<!-- 卡片 -->
<div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
  卡片内容
</div>

```

**追问点**：

Q: Tailwind 的 inset-0 是什么？

> `inset-0` 等于 `top: 0; right: 0; bottom: 0; left: 0`，常用于全屏遮罩或绝对定位填满父元素。
>

Q: bg-black/50 是什么意思？

> 斜杠后面是透明度，bg-black/50 是 `background-color: rgb(0 0 0 / 0.5)`，50% 透明度的黑色。
>

Q: 怎么自定义动画延迟？

> 用任意值语法 `[animation-delay:0.2s]`，方括号里可以写任意 CSS 值。
>



## 10 实现圆环进度条
```html
<!DOCTYPE html>
<html>

<head>
    <style>
        .ring {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: conic-gradient(#3b82f6 70%, #e5e7eb 0);
            mask: radial-gradient(transparent 35px, #ccc 0px);
            -webkit-mask: radial-gradient(transparent 35px, #ccc 0px);
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #eee;
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        .dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #333;
            border-radius: 50%;
            animation: bounce 0.6s infinite alternate;
        }

        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes bounce {
            to {
                transform: translateY(-10px);
            }
        }


        .loader {
            width: 40px;
            height: 40px;
            margin-bottom: 30px;
            position: relative;
        }

        .loader span {
            position: absolute;

            width: 4px;
            height: 12px;
            background: #333;
            left: 50%;
            top: 50%;
            transform-origin: center 20px;
            /* 旋转中心 */
            border-radius: 2px;
            animation: fade 1s infinite;
        }

        /* 8根线，每根旋转45度 */
        .loader span:nth-child(1) {
            transform: rotate(0deg);
            animation-delay: 0s;
        }

        .loader span:nth-child(2) {
            transform: rotate(45deg);
            animation-delay: 0.125s;
        }

        .loader span:nth-child(3) {
            transform: rotate(90deg);
            animation-delay: 0.25s;
        }

        .loader span:nth-child(4) {
            transform: rotate(135deg);
            animation-delay: 0.375s;
        }

        .loader span:nth-child(5) {
            transform: rotate(180deg);
            animation-delay: 0.5s;
        }

        .loader span:nth-child(6) {
            transform: rotate(225deg);
            animation-delay: 0.625s;
        }

        .loader span:nth-child(7) {
            transform: rotate(270deg);
            animation-delay: 0.75s;
        }

        .loader span:nth-child(8) {
            transform: rotate(315deg);
            animation-delay: 0.875s;
        }

        @keyframes fade {
            0% {
                opacity: 1;
            }

            100% {
                opacity: 0.2;
            }
        }


        .skeleton {
            background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
            to {
                background-position: -200% 0;
            }
        }
    </style>
</head>

<body>
    <div class="ring"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="spinner"></div>

    <div class="loader">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
    </div>


    <div class="skeleton">123123</div>
</body>

</html>
```



## 11 原生todolist
+ 思路：数组存数据，事件委托处理增删改

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .done {
            text-decoration: line-through;
            color: #666;
        }


        .todoItem {
            display: flex;
            width: 100px;
            justify-content: space-between;
        }

        .todoItem button {
            background: rgba(0, 0, 0, 0.3);
            color: white;
            border: 0;
        }

        .todoItem li {
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>
</head>

<body>
    <input id="addInput" placeholder="输入任务， 回车添加" />
    <button id="addBtn">添加</button>
    <ul id="list"></ul>

    <script>
        const todo = []

        const list = document.getElementById('list')
        function render() {
            list.innerHTML = todo.map((t, i) =>
                `<div class=todoItem> 
                <li title="${t.text}" class='${t.done ? "done" : ''}' data-i="${i}">${t.text}</li> 
                <button data-del="${i}">X</button>
             </div>`).join('')

        }

        const addInput = document.getElementById('addInput')
        addInput.onkeydown = e => {
            if (e.key === "Enter" && addInput.value.trim()) {
                todo.push({ text: addInput.value, done: false })
                addInput.value = ''
                render()
            }
        }
        const addBtn = document.getElementById('addBtn')
        addBtn.onclick = e => {
            if (addInput.value.trim()) {
                todo.push({ text: addInput.value, done: false })
                addInput.value = ''
                render()
            }
        }

        list.onclick = e => {

            const { i, del } = e.target.dataset

            if (i !== undefined) {
                todo[i].done = !todo[i].done
            } else if (del !== undefined) {
                todo.splice(del, 1)
            }
            render()
        }
    </script>
</body>

</html>
```

## 12 原生轮播图
1. 结构：容器 overflow:hidden，轨道 flex 横排
2. 核心：transform: translateX(-cur * width) 位移
3. 按钮：cur++ / cur--，取模循环
4. 指示器：遍历生成，点击跳转
5. 自动播放：setInterval + 鼠标悬停暂停



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .carousel {
            width: 400px;
            margin: auto;
            position: relative;
            overflow-x: hidden;
        }

        button {
            position: absolute;
            top: 50%;
            height: 35px;
            background: rgba(0, 0, 0, 0.5);
            /* 半透明黑色背景 */
            color: #fff;
            /* 白色文字 */
            border: none;
            cursor: grab;
            /* 去掉边框 */
            transform: translateY(-50%);
        }

        #prev {
            left: 0%;
        }

        #next {
            right: 0%;
        }

        .track {
            display: flex;
        }

        .slide {
            width: 400px;
            height: 200px;
            flex-shrink: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .slide:nth-child(1) {
            background-color: #66f;
        }

        .slide:nth-child(2) {
            background-color: #6f6;
        }

        .slide:nth-child(3) {
            background-color: #f66;
        }

        .dots {
            width: 400px;
            margin: auto;
            /* 和carousel一样宽 */
            text-align: center;
            margin-top: 5px;
        }

        .dots span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ccc;
            margin: 0 5px;
            cursor: pointer;
        }

        .dots span.active {
            background-color: #333;
        }
    </style>
</head>

<body>
    <div class="carousel" id="carousel">
        <div class="track" id="track">
            <span class="slide">1</span>
            <span class="slide">2</span>
            <span class="slide">3</span>
        </div>
        <button id="prev">
            < </button>
                <button id="next">></button>
    </div>
    <div class="dots" id="dots"></div>
</body>

<script>
    let cur = 0
    const w = 400, len = 3
    const track = document.getElementById('track')
    const prev = document.getElementById('prev')
    const next = document.getElementById('next')
    const dots = document.getElementById('dots')
    dots.innerHTML = [...Array(len)].map((_, i) => `<span data-i="${i}"></span>`).join('')

    dots.onclick = e => e.target.dataset.i && go(+e.target.dataset.i);
    function go(i) {
        cur = (i + len) % len
        track.style.transform = `translateX(-${w * cur}px)`
            ;[...dots.children].forEach((d, i) => d.classList.toggle('active', i === cur))
    }
    prev.onclick = () => go(cur - 1)
    next.onclick = () => go(cur + 1)



    let timer = setInterval(() => go(cur + 1), 1000)
    const carousel = document.getElementById('carousel')
    carousel.onmouseenter = () => clearInterval(timer)
    carousel.onmouseleave = () => timer = setInterval(() => go(cur + 1), 1000)
</script>

</html>
```

## 12 画个九宫格 && 定义函数 &&过渡动画 ....
## 13 clip-path画三角形、平行四边形