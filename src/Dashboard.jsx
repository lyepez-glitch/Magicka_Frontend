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
  const [animationClass,setAnimationClass] = useState('');
  // const [editProfile, setEditProfile] = useState(false);

  {/* <p className="text-center">
            {isNaN(energyLevel) || energyLevel <= 0 ? (
              <span className="badge bg-danger">Energy level 0/100</span>
            ) : (
              <span className="badge bg-success">Energy level {energyLevel}/100</span>
            )}
          </p> */}
          {/* <h3 className="text-center mt-4">Available Attacks</h3> */}
          {/* <div className="d-flex flex-wrap justify-content-center">
            {powers.map((power) => (
              <div key={power.id} className="m-2">
                <AttackButtonRT onclick={(e) => attackOpponent(e, power, user)} power={power} />
                <div className={`attack-animation ${animationClass}`} />
              </div>
            ))}
          </div> */}
          {/* {attackMessage !== '' && attackMessage !== null && (
            <div className="alert alert-info fade show mt-3">
              <strong>{attackMessage}</strong>
            </div>
          )} */}


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



        <div className=" energyLevelCont !md:mt-[50px] md:!ml-[30px] col-md-8">
          <div className=" energyLevelSubCont border-2 border-[lightgray] card shadow-sm mb-3">
            <div className="card-body">
              <h4 className="card-title">Energy Level</h4>
              <EnergyBar level={energy.level} max={energy.max} />
            </div>
          </div>



          <div className="!mt-[50px] mb-3">
            <div className="">
              <h4 className="availableAttacksH4 text-left !text-[#8B0000] mb-3">Available Attacks</h4>
              <div className="powersCont d-flex flex-wrap gap-2">
                {powers.map((power) => (
                  <>
                    <AttackButton setAnimationClass={setAnimationClass} energyLevel={energy.level} className="border border-gray-300 bg-gray-300 border-2  rounded-md" key={power.id} power={power} />
                    <div className={`attack-animation ${animationClass}`} />
                  </>



                ))}
              </div>
            </div>
          </div>
          <div className="divide !absolute md:left-[38vw] !top-0 h-screen border-l border-gray-400"></div>

          <div className="attackHistory !md:mt-[20%] !absolute !bg-green-500 !text-white left-[50vw] !top-0 w-[60%] h-auto card shadow-sm">
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
          <button  onClick={handleUserClick} className="usersBtn !mt-[50px] !mr-[20%] !w-1/2 !text-white !text-[20px] !p-[5px] !rounded-[6px]" style={{
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
