import Context from './context'

function createContext(initialValue = {}) {
  return new Context(initialValue)
}

export default createContext
