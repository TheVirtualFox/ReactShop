import React, {useEffect, lazy, Suspense} from 'react';
// import HomePage from './pages/HomePage';
// import ShopPage from './pages/shop/ShopPage';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
// import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user-actions';
import {selectCurrentUser} from './redux/user/user-selectors';
import {createStructuredSelector} from "reselect";

import Spinner from './components/spinner/spinner';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
// import CheckoutPage from './pages/checkout/CheckoutPage';
import {selectCollectionForPreview} from './redux/shop/shop-selector';
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/shop/ShopPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/CheckoutPage'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/SignInAndSignUp'));



const App = ({checkUserSession, currentUser}) => {

    // unsubscribeFromAuth = null;
    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    // componentDidMount() {
    //     checkUserSession();
    // }


    return (
        <div>
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/shop' component={ShopPage} />
                        <Route path='/checkout' component={CheckoutPage} />
                        <Route exact path='/signin' render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUp />} />
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );


};

 const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
 });

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
