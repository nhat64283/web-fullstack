import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import register from './pages/register';
import login from './pages/login';
import HomeScreen from './pages/HomeScreen';
import CreatePostScreen from './pages/CreatePostScreen';
class App extends React.Component {
  state = {
    currentUser: '',
  };
  componentWillMount() {
    const currentUser = window.localStorage.getItem('email');
    this.setState({
      currentUser: currentUser,
    });
  };
  handleLogout = async () => {
    window.localStorage.clear();
    const data = await fetch('http://localhost:3000/user/logout',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
    this.setState({
      currentUser: '',
    })
  };
  render() {
    return (
      <div>
        <div>NAvbar
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Techkids hotgirls</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {this.state.currentUser ? (
                <span> welcome {this.state.currentUser},<button className="nav-link btn btn-info"
                  onClick={this.handleLogout}
                >Log out</button></span>
              )
                : (<ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                  {/* <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Something else here</a>
    </div> */}
                  {/* </li> */}
                  {/* <li className="nav-item">
    <a className="nav-link disabled" href="#">Disabled</a>
  </li> */}
                </ul>)}

              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
              {this.state.currentUser ? (<a href='/create-post' className='btn btn-outline-secondary'>New post</a>) : null}
            </div>
          </nav>
        </div>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={HomeScreen} exact={true} />
            <Route path='/login' component={login} />
            <Route path='/register' component={register} />
            <Route path='/create-post' component={CreatePostScreen} />

            {/* <Route path='/games/:gameId/' component={GameDetailScreen} />
        <Route component={NotFoundScreen} /> */}
          </Switch>

        </BrowserRouter>
      </div>

    );
  }
}


export default App;
