import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUserThunk } from '../../store/session';
import { useModalContext } from "../../context/Modal";
import './SignupFormModal.css'

const SignupFormModal = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { closeModal } = useModalContext();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setErrors({});

        const errors = {};

        if (password === confirmPassword) {
            return dispatch(signupUserThunk({ username, email, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                        const data = await res.json();
                        if (data?.errors) setErrors(data.errors);
                    }
                );
        } else if (password !== confirmPassword) {
            errors.password = 'Passwords do not match'
            setErrors(errors);
        }
    };

    const buttonDisable = (!username.length || username.length < 4 || !email.length || !firstName.length || !lastName.length || !password.length || password.length < 6 || !confirmPassword.length || confirmPassword.length < 6) ? true : false


    return (
        <div className="signup-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div className="signup-form-div">
                    <input 
                    type='text'
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="signup-form-error-div">
                    {errors.firstName && <p className="signup-form-error-message">*{errors.firstName}</p>}
                </div>
                <div className="signup-form-div">
                    <input 
                    type='text'
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="signup-form-error-div">
                    {errors.lastName && <p className="signup-form-error-message">*{errors.lastName}</p>}
                </div>
                <div className="signup-form-div">
                    <input 
                    type='text'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="signup-form-error-div">
                    {errors.email && <p className="signup-form-error-message">*{errors.email}</p>}
                </div>
                <div className="signup-form-div">
                    <input 
                    type='text'
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="signup-form-error-div">
                    {errors.username && <p className="signup-form-error-message">*{errors.username}</p>}
                </div>
                <div className="signup-form-div">
                    <input 
                    type='password'
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="signup-form-error-div">
                    {errors.password && <p className="signup-form-error-message">*{errors.password}</p>}
                </div>
                <div className="signup-form-div">
                    <input 
                    type='password'
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>setConfirmPassword(e.target.value) }
                    />
                </div>
                <div className="signup-form-error-div">
                    {errors.password && <p className="signup-form-error-message">*{errors.password}</p>}
                </div>
                <div className="signup-button-div">
                    <button disabled={buttonDisable} className={buttonDisable ? 'signup-button disabled' : 'signup-button'}>Sign up</button>
                </div>
            </form>
        </div>
    );
};

export default SignupFormModal;