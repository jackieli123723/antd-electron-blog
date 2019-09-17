import React, { Component } from 'react'
//import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom'
import { HashRouter as Router,Route,Switch,Redirect } from 'react-router-dom';

import Article from '../pages/article'
import Login from '../pages/login'
import Comment from '../pages/comment'
import Register from '../pages/register'
import NotFound from '../pages/noPage'
import Home from '../App.js'
export default class Routes extends Component {
  render() {
    return (
      <Router>
           <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/article" component={Home}></Route>
              <Route path="/article/:id" component={Article}></Route>
  
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/comment" component={Comment}></Route>
              <Route path='/404' component={NotFound} />
              <Redirect from='*' to='/404' />
            </Switch>
    </Router>
    )
  }
}
