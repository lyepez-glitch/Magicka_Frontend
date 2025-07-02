import React, { useState } from 'react';
import { login } from './services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';
import VideoBackground from './VideoBackground';

const Login = ({setLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ username, password });
            console.log('login data',data);


            // localStorage.setItem('authToken', data.token);
            localStorage.setItem('authToken', data.access);
            dispatch(setUser({ username,id:data.id }));
            setLogin(true);
            setSuccess(true);
            console.log('Login successful!');
        } catch (error) {
            setSuccess(false);
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="absolute bg-black/50 inset-0 backdrop-blur-md flex items-center justify-center !z-10">

<div className="loginWrapper col-md-6 col-sm-8 col-12">
            <div className="container">
      <div className="row justify-content-center">
          <div className="loginSubCont flex justify-center flex-1 basis-full  w-[35vw] ">
              <div style={{

}}className="cardEle card   items-center !p-[15px] shadow-sm sm:!mt-25px md:-mt-[45px] pb-[100px] !h-[70vh] w-[35vw] mr-0">
                  <h2 style={{fontSize:'15px'}} className="loginH2 text-[15px]  !mb-0 font-semibold text-[15px]text-center lg:mb-4">LOG IN</h2>
                  <div className="existingMember md:!mt-4 text-[30px]">Are you an existing Magicka member?</div>
                  <p className="loginWithCreds text-[20px] text-[#636363] ">Login with your Magicka app credentials</p>
                  <form className="loginForm w-[80%]  scale-100" onSubmit={handleSubmit}>
                      <div className="usernameCont !mb-8 flex gap-1 flex-wrap mb-3">
                          <div>Username*</div>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                          />
                      </div>

                      <div className="passwordCont !mb-8 flex gap-1 flex-wrap mb-3">
                      <div>Password*</div>
                          <input
                              type="password"
                              className="h-[50px] form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>
                      <div className=" loginBtnCont h-[50px] lg:mt-10 text-center">
                          <button type="submit" className=" loginBtn h-[60px] btn btn-primary w-100">Login</button>
                      </div>
                      {success && <p className="text-success mt-3">Login successful!</p>}
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

export default Login;
