/**
 * Base Component class
 * @param {object} props The initial component props
 */
export default class Component {
  constructor(props) {
    this.props = props
    this.state = this.state || {}
  }

  render() {
    return null
  }
}
