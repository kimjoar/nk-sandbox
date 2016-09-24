import React from 'react';

import {
  ServiceContainer,
} from './service';

function ServicesView({ services }) {
  return <div>
    {
      services.map(service =>
        <ServiceContainer
          key={ service.id }
          serviceMeta={ service }/>
      )
    }
  </div>
}

export default ServicesView;
