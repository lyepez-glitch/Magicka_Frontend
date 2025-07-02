import { useParams } from 'react-router-dom';
import AttackButton from './AttackButton';
import {useState} from 'react';
import AttackButtonRT from './AttackButtonRT';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import EnergyBar from './EnergyBar';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { updateEnergy } from './redux/energySlice';
import { launchAttack } from './services/energyService';
import { addAttack } from './redux/attackHistorySlice';

const Room = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const powers = useSelector((state) => state.powers);
 const myUser = useSelector((state)=>state.user);
  const { userId } = useParams();
  const [avatar,setAvatar] = useState('/avatar.jpg')
  const [energyLevel,setEnergyLevel] = useState(0);
  const [socket, setSocket] = useState(null);
  const [attackMessage, setAttackMessage] = useState('');
  const [animationClass,setAnimationClass] = useState('');
  const attackHistory = useSelector((state) => state.attackHistory);
  const energy = useSelector((state) => state.energy);
  const backendUrl = import.meta.env.VITE_RENDER_URL;
  console.log('powers',powers)
  useEffect(() => {
    // Fetch user profile based on userId
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${backendUrl}users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('user',data);
        setUser(data.user)
        if(data.avatar){
          setAvatar(data.avatar);
        }else{
          setAvatar('/public/avatar.jpg');
        }

        console.log('avatar ',avatar)

        setEnergyLevel(data.energy_level)

      } catch (error) {
        console.error('Error fetching user profile:');
      }
    };

    fetchUserProfile();
    const token = localStorage.getItem("authToken");
    const socketUrl = import.meta.env.VITE_SOCKET_URL;
    console.log('socket url',socketUrl);
    const ws = new WebSocket(`${socketUrl}/battle/${userId}/`);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onclose = (event) => {
      console.log("WebSocket closed:");
    };
    ws.onerror = (error) => {
      console.log("WebSocket Error:");
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // setAvatar(data.avatar);
      setEnergyLevel(data.energy_level);

      setAttackMessage('Opponent Attacked!');
      // Make the message fade away after 3 seconds
      setTimeout(() => {
        setAttackMessage(''); // Clear the message
      }, 3000); // Fade away after 3 seconds


    };

    setSocket(ws);
    return () => {
      console.log('Closing WebSocket');
      /// ws.close();
    };
  }, [userId]);

  const handleUserClick = async () => {
    try {
        navigate('/users');
    } catch (err) {
        console.log('err',err)
    }
    };



  const attackOpponent = async (e, power, user) => {
    console.log('socket ')
    if (power.name === 'Fireball') {
      setAnimationClass('fire-blast');
  } else if (power.name === 'Ice Shard') {
      setAnimationClass('ice-shard');
  }
  const result = await launchAttack({"power_id":power.id});

  dispatch(updateEnergy({ max: 100,level: result.remaining_energy}));

  dispatch(addAttack({ name: result.name, timestamp: result.timestamp }));
    // Send attack data through WebSocket
    if (socket) {
      const attackData = {
        attacker_id: myUser.id,
        target_id: user.id,
        power_id: power.id,
      };
      console.log('attack data payload ');
      socket.send(JSON.stringify(attackData));
    }
    setTimeout(() => setAnimationClass(''), 3000);
  };



  return (
    <div className="container mt-5">
      {user ? (
        <div>



          <div className="mt-[17%] roomSubContainer">

            <div className=" row">

            <h2 className="roomFor sm:text-center md:text-center mb-3">Room for {user.username}</h2>
            <p className="welcomeTo sm:text-center md:text-center ">Welcome to <span className="capitalize">{user.username}</span>'s room!</p>
            <div className="roomImgCont !sm:text-right !md:text-right !flex !sm:justify-center !md:justify-center !flex-[1_1_100%] sm:text-center md:text-center">
            <img
             src={avatar ? avatar : '/public/avatar.jpg'}
              alt={`${user.username}'s Avatar`}
              className="avatarImg !w-[200px] !h-[150px] img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
          </div>

              <div className="energyCont !mt-[50px] col-md-8">
                <div className="energySubCont border-2 border-[lightgray] card shadow-sm mb-3">
                  <div className="card-body">
                    <h4 className="card-title">Energy Level</h4>
                    <EnergyBar level={energy.level} max={energy.max} />
                  </div>
                </div>



                <div className="avblAttacks !mt-[50px] mb-3">
                  <div className="">
                    <h4 className="text-left !text-[#8B0000] mb-3">Available Attacks</h4>
                    <div className="roomPowersCont d-flex sm:flex-wrap md:flex-wrap gap-2">
                      {powers.map((power) => (

                        // <AttackButton className="border border-gray-300 bg-gray-300 border-2  rounded-md" key={power.id} power={power} />
                        <>
                        <AttackButtonRT energyLevel={energy.level}  onclick={(e) => attackOpponent(e, power, user)} power={power} />
                        <div className={`attack-animation ${animationClass}`} />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="divide !absolute left-[38vw] !top-0 h-screen border-l border-gray-400"></div>

                <div id="attackHistoryCardCont" className="attackHistoryCardCont !mt-[10%] !md:absolute !bg-green-500 !text-white left-[18vw] sm-w-full !sm:top-0 !md:top-0 md:w-[60%] h-auto card shadow-sm">
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

              </div>
            </div>
            <div>

            </div>

          </div>
          </div>

      ) : (
        <p className="!text-[35px] !text-gray-500 !absolute !left-[35vw] !top-[200px]">Loading...</p>
      )}
    </div>
  );
};

// Add PropTypes validation
Room.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Room;