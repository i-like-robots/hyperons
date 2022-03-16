import { useContext } from './hooks'

let id = 0
class Context {
  constructor(defaultValue) {
    this.id = id++
    this.defaultValue = defaultValue

    this.Provider = this.Provider.bind(this)
    this.Consumer = this.Consumer.bind(this)

    this.Provider.contextRef = this
  }

  getChildContext(context) {
    return Object.hasOwnProperty.call(context, this.id) ? context[this.id] : this.defaultValue
  }

  Provider(props) {
    return props.children
  }

  Consumer(props) {
    if (props.children.length === 1 && typeof props.children[0] === 'function') {
      const value = useContext(this)
      return props.children[0](value)
    } else {
      throw new Error('render is not a function')
    }
  }
}

export default function createContext(defaultValue) {
  return new Context(defaultValue)
}
