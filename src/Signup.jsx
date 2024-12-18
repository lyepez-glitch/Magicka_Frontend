import React, { useState } from 'react';
import { signup } from './services/authService';

const Signup = ({setSignUp}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            setSuccess(true);
            setSignUp(true);
            setError(null);
        } catch (err) {
            setSuccess(false);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div style={{
                    width: '360px',
                    marginRight: '400px',
                    marginTop: '-45px',
                    paddingBottom: '100px',
                    height: '323px',
}}className="card p-4 shadow-sm">
                        <h2 className="text-center mb-4">Signup</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </div>
                            {success && <p className="text-success mt-3">Signup successful! You can now log in.</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
