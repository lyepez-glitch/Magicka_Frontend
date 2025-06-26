import React from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line react/prop-types
const Profile = ({setEditProfile,setShowProfile}) => {
    const user = useSelector((state) => state.user);
    const energy = useSelector((state) => state.energy);
    const attackHistory = useSelector((state) => state.attackHistory); // Assuming this slice exists

    return (
        <div className="container mt-4">
          <div className="items-center flex items-center !pt-[10px] card !bg-[#E1E8E8] shadow-lg p-3 mb-5 bg-body rounded">
          <button onClick={()=>setShowProfile(false)} className="!mb-[10px] bg-gray-300 flex-[1_1_50%] w-[50px] !pt-[5px]">X</button>
            <div className="!w-full row flex flex-col !items-start g-0 align-items-center">
              {/* User Avatar Section */}
              <div className="!w-full !max-w-[1000px] text-center flex !justify-center col-md-4 flex justify-center col-md-4 text-center">
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
              <div className="mt-5 border-b-2  !w-full col-md-8  !max-w-[1000px] !border-t-2 !border-b-2 !border-gray-500 !mt-[10px]">
                <div className="card-body">
                  <h2 className="card-title mb-3"><strong className="!text-[20px]">Name:</strong> <span className="!text-[20px] capitalize">{user.username}</span></h2>
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
            <div className="mb-[10px] mt-4">
              <h4>Attack History</h4>
              {attackHistory.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {attackHistory.map((attack, index) => (
                    <li key={index} className="!bg-[gold] border-b !border-b-green-500 list-group-item">
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
