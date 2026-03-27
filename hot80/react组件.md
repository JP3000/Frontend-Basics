## 1. Counter 计数器
### 推导链
Q1: 需求是什么？  
→ 加、减、清空 + input 联动 + 不能为负数

Q2: 核心是什么？  
→ 受控组件：value 绑定 state，onChange 更新 state

Q3: 边界怎么处理？  
→ `Math.max(0, val)` 防负数  
→ `|| 0` 防 NaN

### 代码
```tsx

import { useState } from "react";


export default function Counter() {
    const [count, setCount] = useState(0)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0
        setCount(Math.max(value, 0))
    }

    return (
        <div className="max-w-md mx-auto p-6 flex items-center gap-2">
            {/* flex + gap：横向排列 + 间距 */}

            <input
                type="number"
                value={count}
                onChange={handleChange}
                className="w-20 px-2 py-1 border rounded text-center"
            />
            {/* w-20：固定宽度，text-center：数字居中 */}
            <button
                onClick={() => setCount(c => c + 1)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95"

            >
                +
            </button>
            {/* active:scale-95：点击时缩小，有反馈感 */}
            <button
                onClick={() => setCount(c => Math.max(c - 1, 0))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 active:scale-95"
            >
                -
            </button>

            <button
                onClick={() => setCount(0)}
                className="px-3 py-1 text-red-500 hover:text-red-600"
             
            >
                重置
            </button>
               {/* 文字按钮，不需要背景 */}
        </div>
    )
}
```

---

## 2. TodoList
### 推导链
Q1: 需求？  
→ 增删改查 + 完成状态切换

Q2: 数据结构？  
→ `{ id, text, completed }[]`

Q3: 核心操作？  
→ 增：push 新项  
→ 删：filter 过滤  
→ 改：map 找到对应 id 修改  
→ 切换：map 翻转 completed

### 代码
```tsx
import { useState } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, completed: false }])
    setInput('')
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>添加</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## 3. CountDown 倒计时
### 推导链
Q1: 需求？  
→ 显示剩余时间，每秒更新，到 0 停止

Q2: 核心？  
→ useEffect + setInterval  
→ 清理：return clearInterval

Q3: 注意点？  
→ 依赖数组要包含 count，或用函数式更新  
→ count <= 0 时 clearInterval

### 代码
```tsx
import { useState, useEffect } from 'react'

export default function CountDown({ initial = 10 }: { initial?: number }) {
    const [count, setCount] = useState(initial)
    useEffect(() => {
        if (count <= 0) return
        const timer = setTimeout(() => setCount(c => c - 1), 1000)
        return () => clearTimeout(timer)
    }, [count])

    const reset = () => setCount(initial)

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='flex items-center gap-2 p-6'>
                <span className='w-20 px-2 py-1 border rounded-e text-center'>{count}</span>
                <button className='px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 active:scale-95'
                    onClick={reset}
                >reset</button>
            </div>
        </div>
    )
}
```

---

## 4. Calculator 计算器
### 推导链
Q1: 需求？  
→ 两个数输入 + 运算符选择 + 显示结果

Q2: 状态？  
→ num1, num2, operator, result

Q3: 计算逻辑？  
→ switch 根据 operator 计算  
→ 除法注意除零

### 代码
```tsx
import { useState } from 'react'

export default function Calculator() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [operator, setOperator] = useState('+')
  const [result, setResult] = useState<number | string>('')

  const calculate = () => {
    const a = parseFloat(num1)
    const b = parseFloat(num2)
    if (isNaN(a) || isNaN(b)) return setResult('请输入有效数字')

    let res: number
    switch (operator) {
      case '+': res = a + b; break
      case '-': res = a - b; break
      case '*': res = a * b; break
      case '/': res = b === 0 ? NaN : a / b; break
      default: return
    }
    setResult(isNaN(res) ? '除数不能为0' : res)
  }

  return (
    <div>
      <input value={num1} onChange={e => setNum1(e.target.value)} placeholder="数字1" />
      <select value={operator} onChange={e => setOperator(e.target.value)}>
        <option>+</option>
        <option>-</option>
        <option>*</option>
        <option>/</option>
      </select>
      <input value={num2} onChange={e => setNum2(e.target.value)} placeholder="数字2" />
      <button onClick={calculate}>=</button>
      <span>{result}</span>
    </div>
  )
}
```

---

## 5. CascadeSelect 级联选择
### 推导链
Q1: 需求？  
→ 省市区三级联动，选择上级后加载下级

Q2: 核心？  
→ 每级一个 state  
→ 选择变化时清空下级 + 加载新数据

Q3: 数据结构？  
→ `{ value, label, children? }[]`

### 代码
```tsx
import { useState, useEffect } from 'react'

interface Option {
  value: string
  label: string
  children?: Option[]
}

const data: Option[] = [
  {
    value: 'zj', label: '浙江',
    children: [
      { value: 'hz', label: '杭州', children: [{ value: 'xh', label: '西湖区' }] },
      { value: 'nb', label: '宁波', children: [{ value: 'yy', label: '鄞州区' }] }
    ]
  },
  {
    value: 'js', label: '江苏',
    children: [
      { value: 'nj', label: '南京', children: [{ value: 'jy', label: '江宁区' }] }
    ]
  }
]

export default function CascadeSelect() {
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')

  const cities = data.find(p => p.value === province)?.children || []
  const districts = cities.find(c => c.value === city)?.children || []

  const handleProvinceChange = (val: string) => {
    setProvince(val)
    setCity('')
    setDistrict('')
  }

  const handleCityChange = (val: string) => {
    setCity(val)
    setDistrict('')
  }

  return (
    <div>
      <select value={province} onChange={e => handleProvinceChange(e.target.value)}>
        <option value="">请选择省份</option>
        {data.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
      <select value={city} onChange={e => handleCityChange(e.target.value)}>
        <option value="">请选择城市</option>
        {cities.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <select value={district} onChange={e => setDistrict(e.target.value)}>
        <option value="">请选择区县</option>
        {districts.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
    </div>
  )
}
```

---

## 6. LazyImage 图片懒加载
### 推导链
Q1: 需求？  
→ 图片进入视口才加载

Q2: 核心？  
→ IntersectionObserver 监听元素是否可见  
→ 可见时设置 src

Q3: 清理？  
→ useEffect return 里 disconnect

### 代码
```tsx
import { useState, useEffect, useRef } from 'react'

interface LazyImageProps {
  src: string
  alt?: string
  placeholder?: string
}

export default function LazyImage({ src, alt = '', placeholder = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : placeholder}
      alt={alt}
      style={{ minHeight: 200, background: '#eee' }}
    />
  )
}
```

---

## 7. 虚拟列表
### 推导链
Q1: 为什么需要？  
→ 大量数据渲染卡顿，只渲染可见区域

Q2: 核心计算？  
→ startIndex = scrollTop / itemHeight  
→ endIndex = startIndex + visibleCount  
→ 用 paddingTop 撑开滚动高度

Q3: 定高 vs 不定高？  
→ 定高：直接计算  
→ 不定高：预估高度 + 渲染后测量修正

### 变体速查
| 形态 | 核心 |
| --- | --- |
| 定高版 | itemHeight 固定，直接计算 |
| 不定高版 | 预估高度 + positions 数组记录实际位置 |


### 代码
```tsx
// 1. 问题：10000 条数据渲染卡 → 只渲染看得见的

// 2. 核心公式：
//    - 能看见几条：visibleCount = 容器高度 / 每条高度
//    - 从第几条开始：startIndex = 滚动距离 / 每条高度
//    - 到第几条结束：endIndex = startIndex + visibleCount

// 3. 怎么撑开滚动条：外层 div 高度 = 总条数 × 每条高度

// 4. 怎么定位内容：内层 div 用 top = startIndex × 每条高度
// VirtualList 组件
import { useState } from "react"
import type { ReactNode } from "react"
function VirtualList<T extends { id: number }>({
    data,
    itemHeight,
    containerHeight,
    renderItem
}: {
    data: T[]
    itemHeight: number
    containerHeight: number
    renderItem: (item: T) => ReactNode
}) {
    const [scrollTop, setScrollTop] = useState(0)
    const visiblecontent = Math.ceil(containerHeight / itemHeight)
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(startIndex + visiblecontent + 1, data.length) // +1 主要为了防止底部闪白
    const visibleData = data.slice(startIndex, endIndex)


    return (

        <div style={{ height: containerHeight, overflow: 'auto', border: '1px solid #ccc' }}
            onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
        >
            <div style={{ position: 'relative', height: data.length * itemHeight }}>
                <div style={{ position: 'absolute', top: startIndex * itemHeight, width: '100%' }}>
                    {visibleData.map(item => {
                        return (<div key={item.id} style={{ height: itemHeight }}>{renderItem(item)} </div>)
                    })}
                </div>
            </div>
        </div>
    )
}

// Demo 使用
const mockData = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `用户 ${i}` }))

export default function Demo() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-80">
                <VirtualList
                    data={mockData}
                    itemHeight={40}
                    containerHeight={400}
                    renderItem={item => <div className="p-2 border-b">{item.name}</div>}
                />
            </div>
        </div>

    )
}

```

```tsx
// 不定高版（简化版）
import { useState, useRef, useEffect } from 'react'

interface Position {
  index: number
  top: number
  bottom: number
  height: number
}

interface VirtualListDynamicProps<T> {
  data: T[]
  estimatedHeight?: number
  containerHeight: number
  renderItem?: (item: T, index: number) => React.ReactNode
}

export function VirtualListDynamic<T>({ data, estimatedHeight = 50, containerHeight, renderItem }: VirtualListDynamicProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<Position[]>(() =>
    data.map((_, i) => ({
      index: i,
      top: i * estimatedHeight,
      bottom: (i + 1) * estimatedHeight,
      height: estimatedHeight
    }))
  )

  // 渲染后测量实际高度并更新 positions
  useEffect(() => {
    if (!contentRef.current) return
    const nodes = contentRef.current.children
    const newPositions = [...positions]
    let needUpdate = false

    Array.from(nodes).forEach((node, i) => {
      const rect = node.getBoundingClientRect()
      const index = startIndex + i
      if (newPositions[index] && newPositions[index].height !== rect.height) {
        needUpdate = true
        const diff = rect.height - newPositions[index].height
        newPositions[index].height = rect.height
        newPositions[index].bottom += diff
        // 更新后续项的位置
        for (let j = index + 1; j < newPositions.length; j++) {
          newPositions[j].top = newPositions[j - 1].bottom
          newPositions[j].bottom = newPositions[j].top + newPositions[j].height
        }
      }
    })

    if (needUpdate) setPositions(newPositions)
  })

  // 二分查找 startIndex
  const findStartIndex = (scrollTop: number) => {
    let low = 0, high = positions.length - 1
    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (positions[mid].bottom > scrollTop) high = mid - 1
      else low = mid + 1
    }
    return Math.max(0, low)
  }

  const startIndex = findStartIndex(scrollTop)
  const endIndex = findStartIndex(scrollTop + containerHeight) + 1
  const visibleData = data.slice(startIndex, Math.min(endIndex, data.length))
  const totalHeight = positions[positions.length - 1]?.bottom || 0
  const offsetY = positions[startIndex]?.top || 0

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={() => setScrollTop(containerRef.current?.scrollTop || 0)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div ref={contentRef} style={{ position: 'absolute', top: offsetY, width: '100%' }}>
          {visibleData.map((item, i) => (
            <div key={startIndex + i}>{renderItem ? renderItem(item, startIndex + i) : String(item)}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## 8. LoggerDebug 闭包陷阱修复
### 推导链
Q1: 核心问题？  
→ useEffect [] 依赖为空，回调里的 state 是 mount 时的快照

Q2: 问题清单？

| 问题代码 | 问题 | 解决方案 |
| --- | --- | --- |
| `setLogs([...logs, log])` | 闭包，logs=[] | `setLogs(prev => [...prev, log])` |
| `console.log(logs.length)` | 闭包，永远是0 | useRef 存最新值 |
| `event.on(...)` | 内存泄漏 | return 里 event.off |
| `timer = setTimeout` | 未声明+泄漏 | const timer + clearTimeout |
| `logs.map(...)` | 缺少key | 用唯一ID作为key |


### 代码
```tsx
import { useState, useEffect, useRef, useId } from "react"

// 简单的事件总线
const event = {
    listeners: new Map<string, Set<(data: any) => void>>(),
    on(name: string, fn: (data: any) => void) {
        if (!this.listeners.has(name)) this.listeners.set(name, new Set())
        this.listeners.get(name)!.add(fn)
    },
    off(name: string, fn: (data: any) => void) {
        this.listeners.get(name)?.delete(fn)
    },
    emit(name: string, data: any) {
        this.listeners.get(name)?.forEach(fn => fn(data))
    }
}
// ❌ 问题代码
function LoggerBroken() {
    const [logs, setLogs] = useState<string[]>([])

    useEffect(() => {
        event.on('log', (log: string) => {
            setLogs([...logs, log]) // ❌ logs 永远是 []
        })
        const timer = setInterval(() => {
            console.log(logs.length) // ❌ 永远是 0
        }, 1000)
        // ❌ 没有清理
    }, [])

    return <div className="p-4"> <button
        onClick={() => event.emit('log', '123')}
        className="px-3 py-1 bg-blue-500 text-white rounded mb-4"
    >
        添加日志
    </button>{logs.map(log => <div>{log}</div>)}</div>
}

// ✅ 修复代码
export default function LoggerFixed() {
    const [logs, setLogs] = useState<string[]>([])
    const logsRef = useRef(logs)
    const idRef = useRef(0)

    useEffect(() => {
        logsRef.current = logs
    }, [logs])

    useEffect(() => {
        const handleLog = (log: string) => {
            setLogs(prev => [...prev, log]) // ✅ 函数式更新
        }

        event.on('log', handleLog)

        const timer = setInterval(() => {
            console.log('logs count:', logsRef.current.length) // ✅ 用 ref
        }, 3000)

        return () => {
            event.off('log', handleLog)  //✅ 清理监听
            clearInterval(timer)  // ✅ 清理定时器
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col ">
                <button
                    onClick={() => event.emit('log', `log-${++idRef.current}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded mb-4 "
                >
                    添加日志
                </button>
                <div className="h-48 w-40 overflow-y-auto border rounded p-2">
                    {logs.map((log, i) => <div className='text-center' key={i}>{log}</div>)}
                </div>
            </div>
        </div>
    )
}


```

---

## 9. NumberToggle 数字小数点切换
### 推导链
Q1: 需求？  
→ 点击按钮切换显示整数/小数

Q2: 核心？  
→ boolean state 控制模式  
→ Math.floor 取整数部分

### 代码
```tsx
import { useState } from 'react'

export default function NumberToggle({ nums = 1532.23 }) {
    const [isDecimal, setIsdecimal] = useState(false)
    const display = isDecimal ? String(nums) : Math.floor(nums).toString()
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col  gap-4 p-6">
                <span className="px-4 py-2 border rounded text-center">{display}</span>
                <button
                    onClick={() => setIsdecimal(!isDecimal)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:scale-95"
                >
                    {isDecimal ? '显示整数' : '显示小数'}
                </button>
            </div>
        </div>
    )
}
```

---

## 10. CustomAxios 简易请求封装
### 推导链
Q1: 需求？  
→ 封装 fetch，支持拦截器、超时、取消

Q2: 核心？  
→ 请求拦截：修改 config  
→ 响应拦截：处理 response  
→ 超时：AbortController + setTimeout

### 代码
```tsx
// ============ 公共部分 ============
interface RequestConfig {
  url: string
  method?: string
  headers?: Record<string, string>
  data?: unknown
}

let isRefreshing = false
let pendingQueue: (() => void)[] = []

const interceptors = {
  request: [] as ((config: RequestConfig) => RequestConfig)[],
  response: [] as ((res: unknown) => unknown)[]
}

const handleTokenRefresh = async <T>(retryFn: () => Promise<T>): Promise<T> => {
  if (isRefreshing) {
    return new Promise<T>(resolve => {
      pendingQueue.push(() => resolve(retryFn()))
    })
  }
  isRefreshing = true
  const res = await fetch('/api/refresh', { method: 'POST' })
  const { token } = (await res.json()) as { token: string }
  localStorage.setItem('token', token)
  pendingQueue.forEach(cb => cb())
  pendingQueue = []
  isRefreshing = false
  return retryFn()
}

// ============ Fetch 版本 ============
const http = {
  useRequestInterceptor(fn: (config: RequestConfig) => RequestConfig) {
    interceptors.request.push(fn)
  },
  useResponseInterceptor(fn: (res: unknown) => unknown) {
    interceptors.response.push(fn)
  },

  async request<T>(config: RequestConfig): Promise<T> {
    for (const fn of interceptors.request) config = fn(config)

    const res = await fetch(config.url, {
      method: config.method || 'GET',
      headers: config.headers,
      body: config.data ? JSON.stringify(config.data) : undefined
    })

    if (res.status === 401) return handleTokenRefresh(() => this.request<T>(config))
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    let result: unknown = await res.json()
    for (const fn of interceptors.response) result = fn(result)
    return result as T
  },

  get<T>(url: string) { return this.request<T>({ url, method: 'GET' }) },
  post<T>(url: string, data?: unknown) { return this.request<T>({ url, method: 'POST', data }) }
}

// ============ XHR 版本 ============
const httpXhr = {
  useRequestInterceptor(fn: (config: RequestConfig) => RequestConfig) {
    interceptors.request.push(fn)
  },
  useResponseInterceptor(fn: (res: unknown) => unknown) {
    interceptors.response.push(fn)
  },

  request<T>(config: RequestConfig): Promise<T> {
    for (const fn of interceptors.request) config = fn(config)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(config.method || 'GET', config.url)

      if (config.headers) {
        Object.entries(config.headers).forEach(([k, v]) => xhr.setRequestHeader(k, v))
      }

      xhr.onload = async () => {
        if (xhr.status === 401) {
          resolve(await handleTokenRefresh(() => this.request<T>(config)))
          return
        }
        if (xhr.status >= 200 && xhr.status < 300) {
          let result: unknown = JSON.parse(xhr.responseText)
          for (const fn of interceptors.response) result = fn(result)
          resolve(result as T)
        } else {
          reject(new Error(`HTTP ${xhr.status}`))
        }
      }

      xhr.onerror = () => reject(new Error('Network Error'))
      xhr.send(config.data ? JSON.stringify(config.data) : undefined)
    })
  },

  get<T>(url: string) { return this.request<T>({ url, method: 'GET' }) },
  post<T>(url: string, data?: unknown) { return this.request<T>({ url, method: 'POST', data }) }
}

// ============ 使用 ============
http.useRequestInterceptor(config => {
  config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('token')}` }
  return config
})

interface User { id: number; name: string }
http.get<User>('/api/user/1')
httpXhr.get<User>('/api/user/1')

```

---

## 11. 懒加载组件 React.lazy + Suspense
### 推导链
Q1: 需求？  
→ 组件按需加载，减少首屏体积

Q2: 核心？  
→ React.lazy(() => import('./Component'))  
→ Suspense 包裹，fallback 显示 loading

Q3: 路由懒加载？  
→ 结合 React Router，每个路由组件 lazy 加载

### 代码
```tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 懒加载组件
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Loading 组件
function Loading() {
  return <div>Loading...</div>
}

// 路由配置
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

```tsx
// 手动实现简易 lazy
function myLazy<P extends object>(importFn: () => Promise<{ default: React.ComponentType<P> }>) {
  let Component: React.ComponentType<P> | null = null
  let promise: Promise<void> | null = null

  return function LazyComponent(props: P) {
    if (Component) {
      return <Component {...props} />
    }

    if (!promise) {
      promise = importFn().then(module => {
        Component = module.default
      })
    }

    throw promise // Suspense 会捕获这个 Promise
  }
}
```



## 12.折叠组件
核心逻辑：

+ `openPath` 数组存当前展开的路径，如 `[1, 2, 3]`
+ `isOpen`：当前层级是否展开（只看对应层的 id）
+ `isActive`：是否在路径上（高亮）
+ 点击时：已展开就收起（设为父路径），否则展开（设为当前路径）

一次只展开一条路径，自动实现同级互斥 + 父节点高亮。

```jsx
import { useState } from 'react';

const data = [
  { id: 1, title: '一级-1', children: [
    { id: 2, title: '二级-1', children: [{ id: 3, title: '三级-1' }] },
    { id: 4, title: '二级-2' }
  ]},
  { id: 5, title: '一级-2' }
];

function Accordion({ items, path = [], openPath, setOpenPath }) {
  return items.map(item => {
    const curPath = [...path, item.id];
    const isOpen = openPath[path.length] === item.id;
    const isActive = openPath.includes(item.id);

    return (
      <div key={item.id} style={{ marginLeft: 20 }}>
        <div
          onClick={() => setOpenPath(isOpen ? path : curPath)}
          style={{ 
            padding: 8, 
            cursor: 'pointer',
            background: isActive ? 'yellow' : '#eee',
            margin: 2
          }}
        >
          {item.title}
        </div>
        {isOpen && item.children && (
          <Accordion 
            items={item.children} 
            path={curPath} 
            openPath={openPath} 
            setOpenPath={setOpenPath} 
          />
        )}
      </div>
    );
  });
}

export default function App() {
  const [openPath, setOpenPath] = useState([]);
  return <Accordion items={data} openPath={openPath} setOpenPath={setOpenPath} />;
}
```


