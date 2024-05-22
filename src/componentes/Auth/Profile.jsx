import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { CgProfile } from 'react-icons/cg';
const Profile = () => {
  const { role, setId, id, utheme, getPersonData, fname, lname ,isAuthenticated} = useAuth();
  //  const {} = getPersonData();

  return (
    <div className='flex justify-center mt-5'>
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="avatar flex justify-center">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          {role && isAuthenticated ? <div className='text-xl  font-extrabold  flex justify-center mt-6 '> {sessionStorage.getItem("fname") + "" + sessionStorage.getItem("lname")}</div> : (<div className='flex justify-center font-extrabold text-purple-900'>  <CgProfile size={39} /></div>)} 
          {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title ">Name : {sessionStorage.getItem("firstname")+"   "+sessionStorage.getItem("lastname")}</h2>
        <h2 className="card-title">Role : {role}</h2>
        
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
          
        </div>
      </div>
    </div>
    </div>


  )
}

export default Profile;
