import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Profile = ({user}) => {

    const {logout} = useContext(AuthContext);
    const handleLogout = () =>{
        logout().then((result)=>{
            alert("Logout Successfully");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <a onClick={handleLogout} >Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;