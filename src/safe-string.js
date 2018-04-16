class SafeString {
  constructor(str) {
    this.str = str
  }
  valueOf() {
    return this.str
  }
  toString() {
    return this.str
  }
}

export default SafeString
