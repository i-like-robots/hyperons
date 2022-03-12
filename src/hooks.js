export function useCallback(fn) {
  return fn
}

export function useEffect() {}

export function useLayoutEffect() {}

export function useMemo(fn) {
  return fn()
}

export function useReducer(_, value, initialFn) {
  if (typeof initialFn === 'function') {
    return initialFn(value)
  }

  return value
}

export function useRef(value) {
  return { current: value }
}

export function useState(value) {
  return value
}
