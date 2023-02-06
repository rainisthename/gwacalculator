import React, {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'
const Navbar = () => {

  const [nav, setNav] = useState(false)
  const handleNav = () => setNav(!nav)
  return (
    <div className="px-[10%] mt-2 py-2 border-b-4">
      <img className='cursor-pointer' src={logo} alt="Logo" style={{width:150}}/>
    </div>
  )
}

export default Navbar