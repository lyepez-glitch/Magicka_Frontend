import React, { useState } from 'react';
import { signup } from './services/authService';
import VideoBackground from './VideoBackground';
import { useNavigate } from 'react-router-dom';

const Signup = ({setSignUp}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ username, email, password });
            setSuccess(true);
            setSignUp(true);
            setError(null);
            console.log('Signup successful, navigating...');
            navigate('/login');
        } catch (err) {
            console.log('err',err)
            setSuccess(false);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className="absolute bg-black/50 inset-0 backdrop-blur-md flex items-center justify-center !z-10">
            <div className="signUpContainer col-md-6 col-sm-8 col-12 mb-3">
            <div className="!mt-0 container mt-5">
            <div className="row justify-content-center">
                <div className="flex justify-center flex-1 basis-full  w-[35vw] ">
                    <div style={{
                    marginTop: '-45px',
                    paddingBottom: '100px',
                    height: '60vh',
}} className=" !sm:w-[100%] signUpCard card   !pt-0 shadow-sm -mt-[45px] pb-[100px] h-[70vh] md:w-[35vw] mr-0">
                        <h2  className="signupHdr text-[15px] !mt-4 !mb-0 font-semibold text-[15px]text-center mb-4">SIGN UP</h2>
                        <form className="signUpForm flex flex-wrap justify-center flex scale-100 mt-[60px]" onSubmit={handleSubmit}>
                            <div className="flex-1 basis-full grow shrink !mb-8 flex gap-1 flex-wrap mb-3">
                                <div className="signUpLabel">Username*</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 basis-full grow shrink !mb-8 flex gap-1 flex-wrap mb-3">
                            <div className="signUpLabel">Email*</div>
                                <input
                                    type="email"
                                    className="h-[50px] form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 basis-full grow shrink pwCont !sm:mb-0 md:mb-8 flex gap-1 flex-wrap md:mb-3">
                            <div className="signUpLabel">Password*</div>
                                <input
                                    type="password"
                                    className="h-[50px] form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 basis-full grow shrink signUpBtnCont mt-[70px] h-[50px] mt-10 text-center">
                                <button type="submit" className="signUpSubmitBtn   sm:h-[60px] md:h-[60px] btn btn-primary w-100">Signup</button>
                            </div>
                            {success && <p className="text-success mt-3">Signup successful! You can now log in.</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>

        </div>




    );
};

export default Signup;
