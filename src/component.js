/**
 * Base Component class
 * @param {object} props The initial component props
 */
function Component(props) {
  this.props = props
  this.state = this.state || {}
}

export default Component
