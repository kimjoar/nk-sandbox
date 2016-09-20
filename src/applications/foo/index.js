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
    constructor() {
      super()
      console.log('foo constructor')
    }

    didMount({ el }) {
      console.log('foo did mount', el)

      el.appendChild(renderTemplate(mainTemplate))
      angular.bootstrap(el, ['myApp'])
    }
  }
