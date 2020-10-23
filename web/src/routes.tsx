import React from 'react';
import { BrowserRouter, Switch, Route }  from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import OrphanagesMap from './pages/OrphanagesMap/OrphanagesMap';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/orfanatos" component={OrphanagesMap}/>
      </Switch>
    </BrowserRouter>
  );
}