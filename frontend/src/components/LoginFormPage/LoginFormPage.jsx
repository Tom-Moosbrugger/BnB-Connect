import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from "../../store/session";
import { Navigate } from 'react-router-dom'
import './LoginForm.css';

const LoginFormPage = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Navigate to='/' replace={true}/>

    const handleSubmit = async e => {
        e.preventDefault();

        setErrors({});

        return dispatch(loginThunk({ credential, password })).catch(
            async (res) => {
              const data = await res.json();
              if (data?.errors) setErrors(data.errors);
            }
        );
    };
    

    return (
        <div  className="login-wrapper">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-form-div">
                    <label>Username or email:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter your username or email..."
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    />
                </div>
                <div className="login-form-div">
                    <label>Password:</label>
                    <input 
                    type='text'
                    required={true}
                    placeholder="Enter your password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="error-div">
                    {errors.credential && <p className="error-message">*{errors.credential}</p>}
                </div>
                <div className="login-button-div">
                    <button className="login-button">Login</button>
                </div>
               
            </form>
        </div>
    );
};

export default LoginFormPage;