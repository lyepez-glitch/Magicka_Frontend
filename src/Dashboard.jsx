import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import EnergyBar from './EnergyBar';
import AttackButton from './AttackButton';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import './Dashboard.css';
import { useState,useEffect } from 'react';
import { setPowers } from './redux/powerSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const energy = useSelector((state) => state.energy);
  const powers = useSelector((state) => state.powers);
  const [users, setUsers] = useState([]);
  const attackHistory = useSelector((state) => state.attackHistory);
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // Assuming you have an API or some data fetching method
    const fetchPowers = async () => {
      try {
        const response = await fetch('http://localhost:8000/powers');
        const data = await response.json();
        console.log('powers',data.powers);
        dispatch(setPowers(data.powers));
        const usersResponse = await fetch('http://localhost:8000/users');
        const usersData  = await usersResponse.json();
        setUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching powers:', error);
      }
    };

    fetchPowers();
  }, [dispatch]);

  const handleUserRoom =(e,user)=>{
    navigate(`/room/${user.id}`);
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          {editProfile ? (
            <ProfileEdit setEditProfile={setEditProfile} />
          ) : (
            <Profile setEditProfile={setEditProfile} />
          )}
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h4 className="card-title">Energy Level</h4>
              <EnergyBar level={energy.level} max={energy.max} />
            </div>
          </div>

          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h4 className="card-title mb-3">Users</h4>
              <div className="list-group">
                {users.map((user) => (
                  <button
                    key={user.id}
                    className="list-group-item list-group-item-action"
                    onClick={(e) => handleUserRoom(e, user)}
                  >
                    {user.username}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <h4 className="card-title mb-3">Available Attacks</h4>
              <div className="d-flex flex-wrap gap-2">
                {powers.map((power) => (
                  <AttackButton key={power.id} power={power} />
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Attack History</h4>
              <ul className="list-group">
                {attackHistory.map((attack, index) => (
                  <li key={index} className="list-group-item">
                    {attack.name} at {new Date(attack.timestamp).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
