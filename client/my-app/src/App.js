import React from 'react';
import logo from './logo.svg';
import './App.css';
import client from './config/client'
import {Home,Series,Movies,Detail} from './pages'
import { ApolloProvider } from '@apollo/client'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/series" component={Series} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/detail/:id" component={Detail} />


          </Switch>
        </Router>

      </ApolloProvider>
    </div>
  );
}

export default App;
