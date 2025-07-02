import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './Dashboard.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // const [editProfile, setEditProfile] = useState(false);


  const dispatch = useDispatch();
  const backendUrl = import.meta.env.VITE_RENDER_URL;

  const handleUserRoom =(e,user)=>{
    navigate(`/room/${user.id}`);
  }

  useEffect(() => {
    // Assuming you have an API or some data fetching method
    const fetchPowers = async () => {
      try {
        const usersResponse = await fetch(`${backendUrl}users`);
        const usersData  = await usersResponse.json();
        console.log('usersData',usersData)
        setUsers(usersData.users);
      } catch (error) {
        console.error('Error fetching users:');
      }
    };

    fetchPowers();
  }, [dispatch]);

  return (
    <div className=" container">

      <div className="card w-[80vw] absolute !pt-[5px] !w-[80vw] !absolute !top-[60px] shadow-sm mb-3">
            <div className="card-body">
              <h4 className="!text-[30px] !font-bold !text-left card-title mb-3">Users</h4>
              <div className="!flex !gap-10 justify-center !flex-row !flex-wrap list-group">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="userEle !max-w-[240px] !shadow-lg !flex !flex-col !sm:p-0 !md:p-0 !flex-[1_1_15%]  list-group-item list-group-item-action"
                  >
                  <img className="usersAvatarImg !w-[398px] !h-[224px] " src={user.avatar ? user.avatar : "avatar.jpg"}/>
                    <span className="!max-h-[40px] !m-[10px] !flex-[1_1_100%] !text-left !font-bold capitalize">{user.username}</span>
                    <button className="battleBtn !mt-[0px] !mb-[20px] !md:ml-[40px] !md:mr-[40px] !rounded-lg !text-white !text-[20px] !bg-[#0866FF]" onClick={(e) => handleUserRoom(e, user)}>Battle</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

    </div>
  );
};

export default Users;
