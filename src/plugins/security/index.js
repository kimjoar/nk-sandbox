// Entry-point for security plugin

// This plugin depends on `management`. How do we codify that?

// TODO Just a random entry-point, need to explore extensions such
// as management sections.

import barFactory from './apps/bar'
import fooFactory from './apps/foo'
import securityServiceFactory from './services/security'

export default {
  chromeNavControls: ['./views/nav_control'],
  managementSections: ['./views/management'],
  apps: [{
    id: 'bar',
    name: 'Login',
    factory: barFactory
  }, {
    id: 'foo',
    name: 'Logout',
    factory: fooFactory
  }],
  services: [{
    id: 'security',
    factory: securityServiceFactory
  }]
}
