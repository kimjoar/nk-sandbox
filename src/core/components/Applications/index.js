import React from 'react'
import Match from 'react-router/Match'

import Application from '../Application/ApplicationContainer'

function NoApp() {
  return <p>No app chosen</p>
}

function Applications({ pathname }) {
  return <div>
    <Match exactly pattern={ pathname } component={ NoApp } />
    <Match pattern={`${pathname}/:id`} component={ Application } />
  </div>
}

export default Applications
