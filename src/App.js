import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import Footer from './Footer';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    // console.log(user);
    console.log('app', this.props);
    // ternaries are WTF: what ? true : false
    // {condition ? truevalue : falsevalue }
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated ? <LogoutButton /> : <Login />}
              {isAuthenticated ? user.name : ''}
              {isAuthenticated ? <img src={user.picture} alt={user.picture} /> : ''}
              </Route>

              <Route 
               exact path="/profile"
               >
                <Profile />
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
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
