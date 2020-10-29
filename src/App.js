import React from 'react';
import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/ShopPage';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user-actions';
import {selectCurrentUser} from './redux/user/user-selectors';
import {createStructuredSelector} from "reselect";

import CheckoutPage from './pages/checkout/CheckoutPage';
import {selectCollectionForPreview} from './redux/shop/shop-selector';


class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { checkUserSession } = this.props;
        checkUserSession();
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

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
