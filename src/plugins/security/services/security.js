export default KibanaService =>
  class SecurityService extends KibanaService {

    api = {
      sayHi: name => console.log('service (sayHi):', name)
    }

    constructor(props) {
      super(props)

      console.log('security service constructor')
    }

    didLoad() {
      console.log('service did load')
    }

    didUpdate() {
      console.log('service did update', this.props)
    }

  }
