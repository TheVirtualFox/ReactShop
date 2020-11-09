import React, {useEffect, useState} from 'react';
import './SignIn.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import {emailSignInStart, googleSignInStart} from '../../redux/user/user-actions';
import { connect } from 'react-redux';

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setUserCredentials] = useState({email: '', password: ''});
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    };


    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email ans password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' onChange={handleChange} type="email" name="email" value={email} required />
                <FormInput label='Password' onChange={handleChange} type="password" name="password" value={password} required />
                <div className="buttons">
                    <CustomButton onClick={handleSubmit} type="submit">Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );

};

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);