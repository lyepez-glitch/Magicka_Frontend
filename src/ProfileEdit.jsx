import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';

// eslint-disable-next-line react/prop-types


const ProfileEdit = ({setEditProfile}) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const energyLevel = useSelector((state) => state.energy.level);
    const userAvatar = useSelector((state) => state.user.avatar);

    const [name, setName] = useState(user.username);
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [email, setEmail] = useState(user.email);
    const backendUrl = import.meta.env.VITE_RENDER_URL;


    const fetchUserById = async (id) => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(`${backendUrl}users/${id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',

            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({'avatar':userAvatar,energyLevel})
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        console.log(userData);
        return userData;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditProfile(false);
        dispatch(setUser({ username: name,email, avatar }));
        console.log('id',user.id);

        fetchUserById(user.id);

    };

    return (
        <div className="container mt-4">

          <div  className="flex justify-center items-center !pt-[5px] !bg-white card shadow-lg p-4">
            <button onClick={()=>setEditProfile(false)} className="flex-[1_1_50%] w-[50px] !pt-[5px]">X</button>
            <h2 className="!text-gray-500 text-center mb-4">Edit Profile</h2>
            <form className="!w-[90%]" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="username"
                  className="!border-2 !border-[lightgray] !rounded-lg form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="!border-2 !border-[lightgray] !rounded-lg form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              {/* Avatar URL Input */}
              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">
                  Avatar URL:
                </label>
                <input
                  type="text"
                  id="avatar"
                  className="!border-2 !border-[lightgray] !rounded-lg form-control"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="Enter Avatar URL"
                />
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditProfile(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
};

export default ProfileEdit;
