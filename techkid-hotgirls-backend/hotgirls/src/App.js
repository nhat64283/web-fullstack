import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import register from './pages/register';
import login from './pages/login';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path='/login' component={login} exact={true} />
        <Route path='/register' component={register} exact={true} />
        {/* <Route path='/games/:gameId/' component={GameDetailScreen} />
        <Route component={NotFoundScreen} /> */}
      </Switch>

    </BrowserRouter>
    );
  }}
  

export default App;
