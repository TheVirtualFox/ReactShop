import React from 'react';
import './SignIn.scss';
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';


class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch (error) {
            console.log(error);
        }

    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value});
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email ans password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput label='Email' onChange={this.handleChange} type="email" name="email" value={this.state.email} required />
                    <FormInput label='Password' onChange={this.handleChange} type="password" name="password" value={this.state.password} required />
                    <div className="buttons">
                        <CustomButton onClick={this.handleSubmit} type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;