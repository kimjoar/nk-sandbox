// Entry-point for security plugin

// This plugin depends on `management`. How do we codify that?

// TODO Just a random entry-point, need to explore extensions such
// as management sections.

export default {
  chromeNavControls: ['./views/nav_control'],
  managementSections: ['./views/management'],
  apps: [{
    id: 'bar',
    name: 'Login'
  }, {
    id: 'foo',
    name: 'Logout'
  }]
}
