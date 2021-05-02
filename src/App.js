import React from 'react';
import Footer from './Footer';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './Login';
import LogoutButton from './LogoutButton';
import MyFavoriteBooks from './MyFavoriteBooks';
import Profile from './Profile';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      userName: '',
      favoriteBooks: [],
      userEmail: '',
    }
  }

  render() {
    console.log('app', this.props);
    const {user, isAuthenticated} = this.props.auth0;
    // console.log(user);
    // ternaries are WTF: what ? true : false
    // {condition ? truevalue : falsevalue }
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* DONE: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated ? <LogoutButton /> : <Login />}
              {isAuthenticated ? user.name : ''}
              {isAuthenticated ? <img src={user.picture} alt={user.picture} /> : ''}
              {isAuthenticated ? <MyFavoriteBooks /> : ''}
              </Route>

              <Route 
               exact path="/profile"
               >
                <Profile />
              {/* DONE: add a route with a path of '/profile' that renders a `Profile` component */}
              </Route>

            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
