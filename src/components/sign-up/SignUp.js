import React from 'react';
import './SignUp.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import {signUpStart} from '../../redux/user/user-actions';
import {connect} from 'react-redux';


class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {signUpStart} = this.props;

        const {displayName,email,password,confirmPassword} = this.state;

        if (password !== confirmPassword) {
            console.error("passwords don't match");
            return;
        }
        signUpStart({displayName, email, password});


    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    };

    render() {
        const {displayName,email,password,confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email ans password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput label='Display Name' onChange={this.handleChange} type="text" name="displayName" value={displayName} required />
                    <FormInput label='Email' onChange={this.handleChange} type="email" name="email" value={email} required />
                    <FormInput label='Password' onChange={this.handleChange} type="password" name="password" value={password} required />
                    <FormInput label='Confirm Password' onChange={this.handleChange} type="password" name="confirmPassword" value={confirmPassword} required />
                    {/*<div className="buttons">*/}
                        <CustomButton onClick={this.handleSubmit} type="submit">Sign Up</CustomButton>
                    {/*    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>*/}
                    {/*</div>*/}
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);