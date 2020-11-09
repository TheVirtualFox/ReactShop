import React, {useState} from 'react';
import './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import {signUpStart} from '../../redux/user/user-actions';
import {connect} from 'react-redux';


const SignUp = ({signUpStart}) => {




    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const {displayName,email,password,confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            console.error("passwords don't match");
            return;
        }
        signUpStart({displayName, email, password});
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email ans password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput label='Display Name' onChange={handleChange} type="text" name="displayName" value={displayName} required />
                <FormInput label='Email' onChange={handleChange} type="email" name="email" value={email} required />
                <FormInput label='Password' onChange={handleChange} type="password" name="password" value={password} required />
                <FormInput label='Confirm Password' onChange={handleChange} type="password" name="confirmPassword" value={confirmPassword} required />
                <CustomButton onClick={handleSubmit} type="submit">Sign Up</CustomButton>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);