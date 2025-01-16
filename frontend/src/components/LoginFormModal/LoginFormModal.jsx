import { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import { useModalContext } from "../../context/Modal";
import './LoginFormModal.css';

const LoginFormModal = () => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModalContext();

    const handleSubmit = async e => {
        e.preventDefault();

        setErrors({});

        return dispatch(sessionActions.loginThunk({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            });
    };

    const loginDemo = async () =>  {
        return dispatch(sessionActions.loginThunk({ credential: 'demo@user.io', password: 'password' }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
        });
    };
    

    return (
        <div className="login-wrapper">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-form-div">
                    <input 
                    className="login-form-input"
                    type='text'
                    required={true}
                    placeholder="Enter your username or email..."
                    value={credential}
                    onChange={e => setCredential(e.target.value)}
                    />
                </div>
                <div className="login-form-div">
                    <input 
                    className="login-form-input"                    
                    type='password'
                    required={true}
                    placeholder="Enter your password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-form-error-div">
                    {errors.credential && <p className="login-form-error-message">*{errors.credential}</p>}
                </div>
                <div className="login-button-div">
                    <button 
                    className={(credential.length < 4 || password.length < 6) ? 'login-button disabled' : 'login-button'}
                    disabled={(credential.length < 4 || password.length < 6) ? true : false}
                    >
                        Log in
                    </button>
                </div>
                <span onClick={loginDemo} id="login-form-demo-user">Log in as a Demo User</span>
            </form>
        </div>
    );
};

export default LoginFormModal;