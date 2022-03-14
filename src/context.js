import createElement from './create-element'

class Context {
  constructor(defaultValue) {
    this.state = [defaultValue]

    this.Provider = this.Provider.bind(this)
    this.Consumer = this.Consumer.bind(this)
  }

  Provider(props) {
    const set = () => {
      props.value !== undefined && this.state.push(props.value)
    }

    const unset = () => {
      props.value !== undefined && this.state.pop(props.value)
    }

    return [createElement(set), props.children, createElement(unset)]
  }

  Consumer(props) {
    if (props.children.length === 1 && typeof props.children[0] === 'function') {
      const value = this.state[this.state.length - 1]
      return props.children[0](value)
    } else {
      throw new Error('render is not a function')
    }
  }
}

export default function createContext(value) {
  return new Context(value)
}
