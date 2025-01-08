import React from 'react'
import logo from "../images/logos/logo.png"

const Navbar = () => {
  return (
    <>
      <div className="nav flex px-[100px] items-center justify-between h-[90px] bg-black shadow-lg">
        <img src={logo} className='w-[170px] object-cover' alt="Logo" />

        <div className="links flex items-center gap-[70px]">
          <button onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }} className="btnNormal bg-red-500 text-white transition-all hover:bg-red-600 px-[20px] py-[10px] rounded-md">
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
