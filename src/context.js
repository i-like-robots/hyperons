function Context(defaultValue) {
  this.defaultValue = defaultValue
  this.currentValue = null

  this.Provider = this.Provider.bind(this)
  this.getValue = this.getValue.bind(this)
}

Context.prototype.Provider = function(props) {
  if (typeof props.value !== 'undefined') {
    this.currentValue = props.value
  }

  return props.children
}

Context.prototype.getValue = function() {
  return this.currentValue || this.defaultValue
}

export default Context
