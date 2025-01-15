import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginThunk } from "../../store/session";
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

        return dispatch(loginThunk({ credential, password }))
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
                <div className="error-div">
                    {errors.credential && <p className="error-message">*{errors.credential}</p>}
                </div>
                <div className="login-button-div">
                    <button className="login-button">Log in</button>
                </div>
            </form>
        </div>
    );
};

export default LoginFormModal;