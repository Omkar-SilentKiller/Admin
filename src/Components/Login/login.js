import React, { useState } from 'react';
import './login.css';
import AdminPanel from '../Adminpanel/admin_panel';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [storedUser, setStoredUser] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();

        // Trim username and password to avoid issues with leading/trailing spaces
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (storedUser && storedUser.username === trimmedUsername && storedUser.password === trimmedPassword) {
            setIsAuthenticated(true);
            setErrorMessage('');
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        // Trim username and password to avoid issues with leading/trailing spaces
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // Store user data (in a real application, this would be an API call)
        setStoredUser({ username: trimmedUsername, password: trimmedPassword });
        setIsLoginForm(true);
        setErrorMessage('');
    };

    const toggleForm = () => {
        setIsLoginForm(!isLoginForm);
        setErrorMessage('');
    };

    if (isAuthenticated) {
        return <AdminPanel />;
    }

    return (
        <div className='login-wrapper'>
            {isLoginForm ? (
                <div className='login-container'>
                    <div className='Logo'>
                        <p>Steam Work</p>
                        <div className='p'>Software</div>
                    </div>

                    <form onSubmit={handleLogin}>
                        <input
                            className='User'
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type='password'
                            className='Password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type='submit' className='log'>Login</button>
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                        <a href='#'>Forgot Password?</a>
                        <button type='button' className='sign' onClick={toggleForm}>Sign-up</button>
                    </form>
                </div>
            ) : (
                <div className='login-container'>
                    <div className='Logo'>
                        <p>Steam Work</p>
                        <div className='p'>Software</div>
                    </div>

                    <form onSubmit={handleSignUp}>
                        <input
                            className='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            className='Password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='password'
                            className='Password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type='submit' className='log'>Submit</button>
                        <a onClick={toggleForm}>Already have an account? Login</a>
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}
