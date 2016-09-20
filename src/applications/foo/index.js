import angular from 'angular';

import './AngularApp'
import mainTemplate from './foo.html';

function renderTemplate(template) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  return wrapper.firstChild;
}

console.log('foo required')

export default KibanaApplication =>
  class Foo extends KibanaApplication {
    constructor(props) {
      super(props)
      console.log('foo constructor', props)
    }

    didMount({ el }) {
      this.el = el
      console.log('foo did mount', el, this.props)

      el.appendChild(renderTemplate(mainTemplate))
      angular.bootstrap(el, ['myApp'])

      this._interval = setInterval(() => {
        this.props.api.updateTimepickerRefreshInterval(Math.random() * 100)
      }, 3000)
    }

    didUpdate() {
      console.log('foo did update', this.props.core)

      // TODO Get this state into the angular app
      // Not sure about the best process for that
    }

    willUnmount() {
      clearInterval(this._interval)
    }
  }
