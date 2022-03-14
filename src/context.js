import createElement from './create-element'

export function Context(value) {
  this.state = [value]

  this.Provider = this.Provider.bind(this)
  this.Consumer = this.Consumer.bind(this)
}

Context.prototype.Provider = function ({ value, children }) {
  const set = () => {
    value !== undefined && this.state.push(value)
  }

  const unset = () => {
    value !== undefined && this.state.pop(value)
  }

  return [createElement(set), children, createElement(unset)]
}

Context.prototype.Consumer = function ({ children }) {
  if (typeof children[0] === 'function') {
    return children[0](this.state[this.state.length - 1])
  }
}

export function createContext(value) {
  return new Context(value)
}
