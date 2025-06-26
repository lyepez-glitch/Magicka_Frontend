import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import { useState } from 'react';
import { Routes, Route, Link,Navigate } from 'react-router-dom';
import Room from './Room';
import VideoBackground from './VideoBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Users from './Users';

function App() {
  const [signedUp, setSignUp] = useState(false);
  const [loggedIn, setLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);


  return (
    <>
        <div className="bar w-full min-w-full flex-[1_1_100%]  w-screen h-screen bg-[#4158ee] absolute top-0 !h-[50px] z-10"></div>
        <div className="flex justify-end items-center mt-[50px] bar w-full h-[50px] bg-white border-b border-gray-300 absolute top-0 z-10">
        <div className="absolute absolute right-1/2 font-bold text-[30px] right-1/2 font-bold text-[30px]"><FontAwesomeIcon icon={faHatWizard}/> Magicka</div>
        <div className="mr-[100px] absolute mt-0 flex gap-4 justify-center mt-10">
              <Link to="/signup" className="!no-underline text-black text-blue-600 hover:underline">Sign Up</Link>
              <Link to="/login" className="!no-underline text-black text-blue-600 hover:underline">Log In</Link>
              {loggedIn && (
                <div className="text-gray-700 text-xl">
                  <FontAwesomeIcon onClick={()=>setShowProfile(true)} icon={faGear} />
                </div>
              )}


        </div>
        </div>
        <div className="w-[200vw] max-w-[2000px] bg-white z-[5] absolute top-[120px] flex-[1_1_100%]   text-[50px]">Introducing Magicka</div>
        <div className="absolute z-[1000] right-[10px] top-[100px] col-md-4 mb-3">
                  {editProfile ? (
                    <ProfileEdit setEditProfile={setEditProfile} />
                  ) : showProfile?(

                    <Profile setShowProfile={setShowProfile} setEditProfile={setEditProfile} />
                  ):null}
        </div>

        <div className="absolute top-[10%] left-[10%] w-[40%] flex-[1_1_100%] mt-[100px] App text-center">


        {!loggedIn ? (
          <VideoBackground>

            {/* <div className="absolute flex gap-4 justify-center mt-10">
              <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
              <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
            </div> */}


            <Routes>
              <Route path="/signup" element={<Signup setSignUp={setSignUp} />} />
              <Route path="/login" element={<Login setLogin={setLogin} />} />

              {/* Redirect root to /login when NOT logged in */}
              <Route path="/" element={<Navigate to="/" replace />} />
              {/* Redirect unknown routes */}

            </Routes>
          </VideoBackground>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard showProfile={showProfile}/>} />
            <Route path="/room/:userId" element={<Room />} />
            <Route path="/users" element={<Users/>} />

            {/* Redirect unknown routes to / when logged in */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </>

  );
}

export default App;
