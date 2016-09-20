class KibanaApplication {
  constructor(props) {
    this.props = props
    this._el = undefined
  }

  willMount() {
  }

  didMount() {
  }

  willUpdate() {
  }

  didUpdate() {
  }

  willUnmount() {
  }

  render() {
    return <div ref={ node => { this._el = node } } />
  }
}

export default KibanaApplication
