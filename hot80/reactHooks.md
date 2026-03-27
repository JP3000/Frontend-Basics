## 1. useDebounce 防抖 Hook
### 推导链
Q1: 和 JS 防抖区别？  
→ JS 防抖返回函数，Hook 返回防抖后的值  
→ 值变化后延迟更新，适合搜索输入场景

Q2: 核心实现？  
→ useEffect 监听值变化  
→ setTimeout 延迟更新  
→ cleanup 清除上一次定时器

Q3: 两种形态？  
→ useDebounceValue：返回防抖后的值  
→ useDebounceFn：返回防抖后的函数

### 代码
```tsx
import { useState, useEffect, useRef, useCallback } from 'react'

// 形态一：防抖值
function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// 形态二：防抖函数
function useDebounceFn<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFn = useCallback((...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }, [fn, delay])

  // 清理
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return debouncedFn
}

// 使用示例
function SearchInput() {
  const [input, setInput] = useState('')
  const debouncedInput = useDebounceValue(input, 500)

  useEffect(() => {
    if (debouncedInput) {
      console.log('搜索:', debouncedInput)
    }
  }, [debouncedInput])

  return <input value={input} onChange={e => setInput(e.target.value)} />
}
```

---

## 2. useThrottle 节流 Hook
### 推导链
Q1: 和防抖区别？  
→ 防抖：停止触发后才执行  
→ 节流：固定间隔执行一次

Q2: 核心实现？  
→ useRef 记录上次执行时间  
→ 判断时间差是否超过间隔

Q3: 两种形态？  
→ useThrottleValue：返回节流后的值  
→ useThrottleFn：返回节流后的函数

### 代码
```tsx
  import { useState, useEffect, useRef, useCallback } from 'react'
  
  // ============ 节流值 ============
  function useThrottleValue<T>(value: T, delay: number): T {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastRef = useRef(0)
  
    useEffect(() => {
      const now = Date.now()
      const remaining = delay - (now - lastRef.current)
  
      if (remaining <= 0) {
        lastRef.current = now
        setThrottledValue(value)
      } else {
        const timer = setTimeout(() => {
          lastRef.current = Date.now()
          setThrottledValue(value)
        }, remaining)
        return () => clearTimeout(timer)
      }
    }, [value, delay])
  
    return throttledValue
  }
  
  // ============ 节流函数 ============
  function useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay: number) {
    const lastRef = useRef(0)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }, [])
  
    return useCallback((...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = delay - (now - lastRef.current)
  
      if (remaining <= 0) {
        lastRef.current = now
        fn(...args)
      } else if (!timerRef.current) {
        timerRef.current = setTimeout(() => {
          lastRef.current = Date.now()
          timerRef.current = null
          fn(...args)
        }, remaining)
      }
    }, [fn, delay])
  }
  
  // ============ Demo ============
  function ThrottleDemo() {
    const [count, setCount] = useState(0)
  
    // 方式1: 节流值
    const throttledCount = useThrottleValue(count, 1000)
  
    // 方式2: 节流函数
    const handleClick = useThrottleFn(() => {
      console.log('节流函数触发:', count)
    }, 1000)
  
    return (
      <div>
        <button onClick={() => { setCount(c => c + 1); handleClick() }}>
          点击 (疯狂点也只会每秒触发一次)
        </button>
        <p>实时值: {count}</p>
        <p>节流值: {throttledCount}</p>
      </div>
    )
  }

```

---

## 3. useUpdateEffect 跳过首次执行
### 推导链
Q1: 为什么需要？  
→ useEffect 首次渲染也会执行  
→ 有时只想在依赖更新时执行，不想首次执行

Q2: 核心实现？  
→ useRef 记录是否首次渲染  
→ 首次渲染跳过，后续正常执行

### 代码
```tsx
import { useEffect, useRef } from 'react'

function useUpdateEffect(effect: () => void | (() => void), deps: unknown[]) {
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    return effect()
  }, deps)
}

// 使用示例
function Counter() {
  const [count, setCount] = useState(0)

  // 首次渲染不执行，只有 count 变化时才执行
  useUpdateEffect(() => {
    console.log('count 更新了:', count)
  }, [count])

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

---

## 4. usePrevious 获取上一次的值
### 推导链
Q1: 为什么需要？  
→ 对比前后值的变化  
→ 实现动画过渡、变化检测

Q2: 核心实现？  
→ useRef 存储上一次的值  
→ useEffect 在渲染后更新 ref

Q3: 为什么用 useEffect？  
→ useEffect 在渲染后执行  
→ 先返回旧值，再更新为新值

### 代码
```tsx
import { useEffect, useRef, useState, type EffectCallback, type DependencyList } from "react";

function usePreviouse<T>(
    value: T
): T | undefined {
    const valueRef = useRef<T | undefined>(undefined)
    useEffect(
        () => { valueRef.current = value },
        [value]
    )
    return valueRef.current
}
export default function prevCount() {
    const [count, setCount] = useState(0)
    const prevCount = usePreviouse(count)
    return (
        <div className="flex flex-col items-center gap-4 p-6">
            <button
                className="h-12 w-24 bg-red-400 text-white rounded hover:bg-red-500"
                onClick={() => setCount(count + 1)}
            >
                +1
            </button>
            <p className="text-gray-600">
                last: {prevCount ?? 'none'}, now: {count}
            </p>
        </div>
    )
}
```

---

## 5. useRequest 请求 Hook
### 推导链
Q1: 核心功能？  
→ 封装请求的 loading/data/error 三态  
→ 支持手动触发、自动请求

Q2: options 有哪些？  
→ manual：手动触发，不自动请求  
→ onSuccess/onError：成功/失败回调

Q3: 返回什么？  
→ data、loading、error  
→ run：手动触发函数  
→ refresh：用上次参数重新请求

### 代码
```tsx
import { useState, useCallback, useRef, useEffect } from 'react'
// ============ useRequest Hook ============
function useRequest<T, P extends unknown[]>(
    service: (...params: P) => Promise<T>,
    options?: {manual?: boolean}
) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const paramsRef = useRef<P>([] as unknown as P)

    const run = useCallback(async (...params: P) => {
        paramsRef.current = params
        setLoading(true)
        setError(null)

        try {
            const res = await service(...params)
            setData(res)
            return res
        } catch (e) {
            setError(e instanceof Error ? e : new Error(String(e)))
            return null
        } finally {
            setLoading(false)
        }
    }, [service])

    const refresh = useCallback(() => run(...paramsRef.current), [run])

    useEffect(() => {
        if (!options?.manual) run(...[] as unknown as P)
    }, [])


    return {data, loading, error, run, refresh}
}

// ============ Demo ============
interface User {
  id: number
  name: string
  email: string
}

// const fetchUser = (id: number) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
//     r => {
//         if (!r.ok) throw Error(String(r.status))
//         return r.json()
//     }   
// )

const request = <T,>(url: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(`HTTP ${xhr.status}`))
      }
    }
    xhr.onerror = () => reject(new Error('Network Error'))
    xhr.send()
  })
}

const fetchUser = (id: number) => 
  request<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
export default function UseRequestDemo() {
  const [userId, setUserId] = useState(1)
  const { data, loading, error, run } = useRequest(fetchUser, { manual: false })

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={userId}
          onChange={e => setUserId(Number(e.target.value))}
          className="border px-2 py-1 w-20 rounded"
          min={1}
          max={10}
        />
        <button
          onClick={() => run(userId)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          获取用户
        </button>
      </div>

      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">错误: {error.message}</p>}
      {data && (
        <div className="bg-gray-100 p-4 rounded">
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  )
}

```

---

## 6. 模拟 useState
### 推导链
Q1: useState 原理？  
→ 闭包 + 数组存储状态  
→ 每个组件有自己的 state 数组

Q2: 为什么用数组？  
→ 多个 useState 按调用顺序存储  
→ 索引对应每个 state

Q3: 为什么不能放条件语句？  
→ 每次渲染从头遍历  
→ 条件语句会打乱索引顺序

### 代码
```javascript
// 模拟 React 的 useState
let state = []
let index = 0

function useState(initialValue) {
  const currentIndex = index
  
  // 首次渲染用初始值，支持函数式初始值
  if (state[currentIndex] === undefined) {
    state[currentIndex] = typeof initialValue === 'function' 
      ? initialValue() 
      : initialValue
  }
  
  const setState = (newValue) => {
    // 支持函数式更新
    state[currentIndex] = typeof newValue === 'function' 
      ? newValue(state[currentIndex]) 
      : newValue
    render() // 触发重新渲染
  }
  
  index++
  return [state[currentIndex], setState]
}

// 模拟渲染
function render() {
  index = 0 // 重置索引，这就是为什么 hooks 不能放在条件语句里
  App()
}

// 使用示例
function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('test')
  console.log('render:', count, name)
}

// 测试
render()           // render: 0 test
state[0] = 1       // 模拟 setCount(1)
render()           // render: 1 test
```

---

## 7. useRedux 简易状态管理
### 推导链
Q1: Redux 核心？  
→ 单一 store + reducer + dispatch  
→ 状态变化通知订阅者

Q2: Hook 版怎么实现？  
→ useReducer 管理状态  
→ Context 跨组件共享  
→ useSyncExternalStore 订阅外部 store

Q3: 简易版 vs 完整版？  
→ 简易版：Context + useReducer  
→ 完整版：createStore + subscribe + useSyncExternalStore

### 代码
```tsx
// 简易版：Context + useReducer
import { createContext, useContext, useReducer, ReactNode } from 'react'

interface State {
  count: number
}

type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'SET'; payload: number }

const initialState: State = { count: 0 }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 }
    case 'DECREMENT': return { ...state, count: state.count - 1 }
    case 'SET': return { ...state, count: action.payload }
    default: return state
  }
}

const StoreContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}

// 使用示例
function Counter() {
  const { state, dispatch } = useStore()
  return (
    <div>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  )
}

function App() {
  return (
    <StoreProvider>
      <Counter />
    </StoreProvider>
  )
}
```

```tsx
// 进阶版：createStore + useSyncExternalStore
import { useSyncExternalStore } from 'react'

type Listener = () => void

function createStore<S, A>(reducer: (state: S, action: A) => S, initialState: S) {
  let state = initialState
  const listeners = new Set<Listener>()

  const getState = () => state

  const dispatch = (action: A) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  return { getState, dispatch, subscribe }
}

// 创建 store
const store = createStore(reducer, initialState)

// 自定义 Hook
function useSelector<T>(selector: (state: State) => T): T {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  )
}

function useDispatch() {
  return store.dispatch
}

// 使用示例
function Counter() {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
    </div>
  )
}
```
