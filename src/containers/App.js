import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotesPage from './NotesPage';
import Home from './Home';

const App = () => (
  <Router>
    <Switch>
      <Route path="/notes/edit">
        <NotesPage edit />
      </Route>

      <Route path="/notes">
        <NotesPage edit={false} />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
