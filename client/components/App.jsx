import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './Nav.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Logout from './Logout.jsx';
import UserTaskList from './UserTaskList.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/:username" exact component={UserTaskList} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
