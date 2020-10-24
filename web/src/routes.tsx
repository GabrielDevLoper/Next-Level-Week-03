import React from 'react';
import { BrowserRouter, Switch, Route }  from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import OrphanagesMap from './pages/OrphanagesMap/OrphanagesMap';
import Orphanage from './pages/Orphanage/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage/CreateOrphanage';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/orfanatos" component={OrphanagesMap}/>
        <Route exact path="/orfanato/:id" component={Orphanage}/>
        <Route exact path="/create-orphanage" component={CreateOrphanage}/>
      </Switch>
    </BrowserRouter>
  );
}