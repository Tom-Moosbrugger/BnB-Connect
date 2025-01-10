import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signupUserThunk } from '../../store/session';
import './SignupFormPage.css'

const SignupFormPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Navigate to='/' replace={true}/>

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setErrors({});

        const errors = {};

        if (password === confirmPassword) {
            return dispatch(signupUserThunk({ username, email, firstName, lastName, password })).catch(
                async (res) => {
                    const data = await res.json();
                    if (data?.errors) setErrors(data.errors);
                }
            );
        } else if (password !== confirmPassword) {
            errors.password = 'Passwords do not match'
            setErrors(errors);
        }
    };

    return (
        <div className="signup-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="signup-form-div">
                    <label>Username:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter a username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="error-div">
                    {errors.username && <p className="error-message">*{errors.username}</p>}
                </div>
                <div className="signup-form-div">
                    <label>Email:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter an email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="error-div">
                    {errors.email && <p className="error-message">*{errors.email}</p>}
                </div>
                <div className="signup-form-div">
                    <label>First name:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter your first name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="error-div">
                    {errors.firstName && <p className="error-message">*{errors.firstName}</p>}
                </div>
                <div className="signup-form-div">
                    <label>Last name:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter your last name..."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="error-div">
                    {errors.lastName && <p className="error-message">*{errors.lastName}</p>}
                </div>
                <div className="signup-form-div">
                    <label>Password:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter a password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="error-div">
                    {errors.password && <p className="error-message">*{errors.password}</p>}
                </div>
                <div className="signup-form-div">
                    <label>Confirm password:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Re-enter password..."
                    value={confirmPassword}
                    onChange={(e) =>setConfirmPassword(e.target.value) }
                    />
                </div>
                <div className="error-div">
                    {errors.password && <p className="error-message">*{errors.password}</p>}
                </div>
                <div className="signup-button-div">
                    <button className='signup-button'>Signup</button>
                </div>
               
            </form>
        </div>
    );
};

export default SignupFormPage;