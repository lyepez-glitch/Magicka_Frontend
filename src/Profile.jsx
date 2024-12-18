import React from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
const Profile = ({setEditProfile}) => {
    const user = useSelector((state) => state.user);
    const energy = useSelector((state) => state.energy);
    const attackHistory = useSelector((state) => state.attackHistory); // Assuming this slice exists

    return (
        <div className="container mt-4">
          <div className="card shadow-lg p-3 mb-5 bg-body rounded">
            <div className="row g-0 align-items-center">
              {/* User Avatar Section */}
              <div className="col-md-4 text-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.username}'s avatar`}
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
                    style={{ width: '150px', height: '150px' }}
                  >
                    <span className="text-white fs-4">No Avatar</span>
                  </div>
                )}
              </div>

              {/* User Info Section */}
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title mb-3">{user.username}</h2>
                  <p className="card-text mb-2">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Energy Level:</strong> {energy.level}/{energy.max}
                  </p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => setEditProfile(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Attack History */}
            <div className="mt-4">
              <h4>Attack History</h4>
              {attackHistory.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {attackHistory.map((attack, index) => (
                    <li key={index} className="list-group-item">
                      <strong>{attack.name}</strong> -{' '}
                      {new Date(attack.timestamp).toLocaleString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No attacks made yet.</p>
              )}
            </div>
          </div>
        </div>
      );
};

export default Profile;
