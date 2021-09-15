import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter  as Router, Route, Switch} from 'react-router-dom';
import Login from "./routes/Login";
import Home from "./routes/Home";
import Customer from "./routes/Customer";
import User from "./routes/Customer/User";
import Point from "./routes/Customer/Point";

const routers = (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/customer" component={Customer}/>
      <Route exact path="/customer/actions" component={User}/>
      <Route exact path="/customer/points" component={Point}/>
      {/* <Route exact path="/projects" component={Project}/>
      <Route exact path="/projects/blank_project" component={BlankProject}/>
      <Route exact path="/projects/:id" component={MenuProject}/>
      <Route exact path="/projects/:projectId/items/:taskId" component={MenuTarea}/> */}
    </Switch>
  </Router>
);
ReactDOM.render(routers, document.getElementById('root'));
