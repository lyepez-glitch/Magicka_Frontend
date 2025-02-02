import { useParams } from 'react-router-dom';
import AttackButton from './AttackButton';
import {useState} from 'react';
import AttackButtonRT from './AttackButtonRT';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Room = () => {
  const [user, setUser] = useState(null);
  const powers = useSelector((state) => state.powers);
 const myUser = useSelector((state)=>state.user);
  const { userId } = useParams();
  const [avatar,setAvatar] = useState('')
  const [energyLevel,setEnergyLevel] = useState(0);
  const [socket, setSocket] = useState(null);
  const [attackMessage, setAttackMessage] = useState('');
  const [animationClass,setAnimationClass] = useState('');
  const backendUrl = import.meta.env.VITE_RENDER_URL;
  useEffect(() => {
    // Fetch user profile based on userId
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${backendUrl}/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        setUser(data.user)
        setAvatar(data.avatar || 'default url'); // Assuming API response structure is { user: { ... } }
        setEnergyLevel(data.energy_level)

      } catch (error) {
        console.error('Error fetching user profile:');
      }
    };

    fetchUserProfile();
    const token = localStorage.getItem("authToken");
    const socketUrl = import.meta.env.SOCKET_URL;
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

  const attackOpponent = async (e, power, user) => {
    console.log('socket ')
    if (power.name === 'Fireball') {
      setAnimationClass('fire-blast');
  } else if (power.name === 'Ice Shard') {
      setAnimationClass('ice-shard');
  }
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
        <div className="card shadow-sm p-4">
          <h2 className="text-center mb-3">Room for {user.username}</h2>
          <p className="text-center">Welcome to {user.username}'s room!</p>
          <div className="text-center">
            <img
              src={avatar}
              alt={`${user.username}'s Avatar`}
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
          </div>
          <p className="text-center">
            {isNaN(energyLevel) || energyLevel <= 0 ? (
              <span className="badge bg-danger">Energy level 0/100</span>
            ) : (
              <span className="badge bg-success">Energy level {energyLevel}/100</span>
            )}
          </p>
          <h3 className="text-center mt-4">Available Attacks</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {powers.map((power) => (
              <div key={power.id} className="m-2">
                <AttackButtonRT onclick={(e) => attackOpponent(e, power, user)} power={power} />
                <div className={`attack-animation ${animationClass}`} />
              </div>
            ))}
          </div>
          {attackMessage !== '' && attackMessage !== null && (
            <div className="alert alert-info fade show mt-3">
              <strong>{attackMessage}</strong>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
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