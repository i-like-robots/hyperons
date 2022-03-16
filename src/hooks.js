import dispatcher from './dispatcher'

export function useCallback(fn) {
  return fn
}

export function useContext(instance) {
  return instance.getChildContext(dispatcher.context)
}

export function useEffect() {}

export function useLayoutEffect() {}

export function useMemo(fn) {
  return fn()
}

export function useReducer(_, value, init) {
  if (typeof init === 'function') {
    return init(value)
  }

  return value
}

export function useRef(value) {
  return { current: value }
}

export function useState(value) {
  return value
}
