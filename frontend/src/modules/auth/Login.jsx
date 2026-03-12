import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../dashboard/pages styles/Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Toggle between Login and Sign Up
    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setFormData({ name: '', email: '', password: '', rePassword: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isLogin) {
            // Login Logic
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (user) {
                setSuccess('Login successful! Redirecting...');
                localStorage.setItem('currentUser', JSON.stringify(user));
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                setError('Invalid email or password.');
            }
        } else {
            // Sign Up Logic
            if (formData.password !== formData.rePassword) {
                return setError('Passwords do not match.');
            }

            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            if (users.find(u => u.email === formData.email)) {
                return setError('User already exists with this email.');
            }

            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'User' // Default role
            };

            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            setSuccess('Registration successful! You can now login.');
            setTimeout(() => setIsLogin(true), 1500);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                {/* Left Pane: Form */}
                <div className="auth-left">
                    <div className="auth-header">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                            <span className="text-muted small">
                                {isLogin ? "Not a member?" : "Already a member?"}
                                <button
                                    className="btn btn-link p-0 ms-1 text-primary text-decoration-none fw-bold small auth-toggle-btn"
                                    onClick={toggleMode}
                                >
                                    {isLogin ? "Sign up" : "Sign in"}
                                </button>
                            </span>
                        </div>
                        <h1 className="auth-title">{isLogin ? "Sign In" : "Sign Up"}</h1>
                        <p className="auth-subtitle">
                            {isLogin ? "Welcome back! Please enter your details." : "Join us today! Create your account in seconds."}
                        </p>
                    </div>

                    {error && <div className="alert alert-danger py-2 small">{error}</div>}
                    {success && <div className="alert alert-success py-2 small">{success}</div>}

                    <form className="auth-form auth-form-animate" key={isLogin ? 'login' : 'signup'} onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="auth-input-group">
                                <label>Full Name</label>
                                <i className="bi bi-person auth-input-icon"></i>
                                <input
                                    type="text"
                                    name="name"
                                    className="auth-input"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="auth-input-group">
                            <label>Email Address</label>
                            <i className="bi bi-envelope auth-input-icon"></i>
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth-input-group">
                            <label>Password</label>
                            <i className="bi bi-lock auth-input-icon"></i>
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="auth-input-group">
                                <label>Confirm Password</label>
                                <i className="bi bi-shield-lock auth-input-icon"></i>
                                <input
                                    type="password"
                                    name="rePassword"
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={formData.rePassword}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <button type="submit" className="auth-btn">
                            {isLogin ? "Sign In" : "Sign Up"}
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>

                    <div className="mt-auto pt-4 text-center">
                        <span className="text-muted small">Or continue with</span>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button className="btn btn-outline-light border text-dark btn-sm px-3 rounded-pill">
                                <i className="bi bi-google me-2 text-danger"></i> Google
                            </button>
                            <button className="btn btn-outline-light border text-dark btn-sm px-3 rounded-pill">
                                <i className="bi bi-facebook me-2 text-primary"></i> Facebook
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Pane: Info/UIUX Decoration */}
                <div className="auth-right">
                    <div className="auth-shape shape-1"></div>
                    <div className="auth-shape shape-2"></div>

                    <div className="auth-card">
                        <div className="auth-card-icon">
                            <i className="bi bi-graph-up-arrow"></i>
                        </div>
                        <h3 className="auth-card-title">Real-time Analytics</h3>
                        <p className="auth-card-text">
                            Track your performance and growth with our advanced data-driven dashboard metrics.
                        </p>
                    </div>

                    <div className="auth-card">
                        <div className="auth-card-icon" style={{ color: '#7048E8' }}>
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <h3 className="auth-card-title">Your data, your rules</h3>
                        <p className="auth-card-text">
                            Your data belongs to you, and our top-tier encryption ensures that it stays private and secure.
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="small opacity-75">
                            Trusted by 10,000+ companies worldwide
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
