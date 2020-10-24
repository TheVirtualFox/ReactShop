import React from 'react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/ShopPage';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';
import {selectCurrentUser} from './redux/user/user-selectors';
import {createStructuredSelector} from "reselect";

import CheckoutPage from './pages/checkout/CheckoutPage';

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {

        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                userRef.onSnapshot(snapShot => {
                     setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                     });
                });
            } else {
                setCurrentUser(userAuth);
            }
        });
    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/shop' component={ShopPage} />
                    <Route path='/checkout' component={CheckoutPage} />
                    <Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp />} />
                </Switch>
            </div>
        );
    }

}

 const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
 });

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
