class KibanaApplication {
  constructor(props) {
    this.props = props
  }

  willMount() {
    console.log('top, will mount')
  }

  didMount({ el }) {
    console.log('top, did mount', el)
  }

  willUpdate() {
    console.log('top, will update')
  }

  didUpdate() {
    console.log('top, did update')
  }

  willUnmount() {
    console.log('top, will unmount')
  }
}

export default KibanaApplication
