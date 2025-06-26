import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import EnergyBar from './EnergyBar';
import AttackButton from './AttackButton';

import './Dashboard.css';
import { useState,useEffect } from 'react';
import { setPowers } from './redux/powerSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({showProfile}) => {
  const navigate = useNavigate();
  const energy = useSelector((state) => state.energy);
  const powers = useSelector((state) => state.powers);
  const [users, setUsers] = useState([]);
  const attackHistory = useSelector((state) => state.attackHistory);
  // const [editProfile, setEditProfile] = useState(false);


  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_RENDER_URL;

  useEffect(() => {
    // Assuming you have an API or some data fetching method
    const fetchPowers = async () => {
      try {
        const response = await fetch(`${backendUrl}powers`);
        const data = await response.json();
        dispatch(setPowers(data.powers));
        const usersResponse = await fetch(`${backendUrl}users`);
        const usersData  = await usersResponse.json();
        setUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching powers:');
      }
    };

    fetchPowers();
  }, [dispatch]);

  const handleUserClick = async () => {
      try {
          navigate('/users');
      } catch (err) {
          console.log('err',err)
      }
      };



  return (
    <div className="mt-[17%] container">

      <div className=" row">



        <div className="col-md-8">
          <div className="border-2 border-[lightgray] card shadow-sm mb-3">
            <div className="card-body">
              <h4 className="card-title">Energy Level</h4>
              <EnergyBar level={energy.level} max={energy.max} />
            </div>
          </div>



          <div className="  mb-3">
            <div className="">
              <h4 className="text-left !text-[#8B0000] mb-3">Available Attacks</h4>
              <div className="d-flex flex-wrap gap-2">
                {powers.map((power) => (
                  <AttackButton className="border border-gray-300 bg-gray-300 border-2  rounded-md" key={power.id} power={power} />
                ))}
              </div>
            </div>
          </div>
          <div className="divide !absolute left-[38vw] !top-0 h-screen border-l border-gray-400"></div>

          <div className="!mt-[20%] !absolute !bg-green-500 !text-white left-[50vw] !top-0 w-[60%] h-auto card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Attack History</h4>
              <ul className="list-group">
                {attackHistory.map((attack, index) => (
                  <li key={index} className="!border-green-500 !bg-[#FFD700] list-group-item">
                    You cast a <span className="font-bold attack">{attack.name}</span> at {new Date(attack.timestamp).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </div>



          </div>
          <button onClick={handleUserClick} className="!mt-[10px] !mr-[20%] !w-1/2 !text-white !text-[20px] !p-[5px] !rounded-[6px]" style={{
  background: "linear-gradient(to bottom, hsl(20, 5.66%, 72%), hsl(20, 5.66%, 52%))"
}}>Users</button>
        </div>
      </div>
      <div>

      </div>

    </div>
  );
};

export default Dashboard;
