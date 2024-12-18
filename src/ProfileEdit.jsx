import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';
// eslint-disable-next-line react/prop-types
const ProfileEdit = ({setEditProfile}) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [name, setName] = useState(user.username);
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [email, setEmail] = useState(user.email);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditProfile(false);
        dispatch(setUser({ username: name,email, avatar }));
    };

    return (
        <div className="container mt-4">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
