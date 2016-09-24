import { Component } from 'react'
import { omit } from 'lodash'

export default class ServiceAdapter extends Component {
  
  constructor(props) {
    super(props);

    const { Service } = props

    this.service = new Service(omit(props, 'Service', 'registerApi'));
  }

  componentWillMount() {
    this.props.registerApi(this.service.api)
    this.service.willLoad();
  }

  componentDidMount() {
    this.service.didLoad()
  }

  componentWillReceiveProps(nextProps) {
    var newProps = omit(nextProps, 'Service', 'registerApi');
    this.service.willUpdate(newProps);
    this.service.props = newProps;
    this.service.didUpdate();
  }

  componentWillUnmount() {
    this.service.willRemove();
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return null
  }
}