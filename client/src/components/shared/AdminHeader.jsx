import React,{useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useLogoutMutation  } from '../../slices/userApiSlice'
import { toast } from 'react-toastify'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCredential } from '../../slices/authSlice'
import Logo from '../../assets/images/ndc-logo.png'
import UserImage from '../../assets/images/User.svg'
import useOutsideClick from '../OutsideClick'

const AdminHeader = () => {

  const [showUserOptions, setShowUserOptions] = useState(false)

  const [logout,{isLoading}] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const apiRes = await logout({}).unwrap();
      console.log("apiRes",apiRes);
      toast.success("Logout successful!");
      dispatch(clearCredential())

      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong!");
    }
    
  }

  const showUserOptionsHandler = () => {
    setShowUserOptions(!showUserOptions);
  }

  const hideUserOptionsHandler = () => {
    setShowUserOptions(false);
  } 

  const dropdownRef = useOutsideClick(() => setShowUserOptions(false));

  return (
    <div className=' bg-gray-800 text-white border-b border-gray-500'>
      <div className="container flex justify-between items-center py-3">
        <Link to="/admin"><img className='w-12' src={Logo} alt="" /></Link>
        <ul className='flex gap-2 font-semibold items-center'>
          {/* <li><Link to="/">Home</Link></li> */}
          {/* <li><Link to="/contact">Contact</Link></li> */}
          

          <li  ref={dropdownRef} className='relative'>
            <a onClick={showUserOptionsHandler} className='cursor-pointer' ><img className='w-8' src={UserImage} alt="" /></a>
            {showUserOptions && (
              <ul onClick={hideUserOptionsHandler} className='absolute top-full right-0 bg-amber-800 py-4  rounded flex flex-col'>
                <li className='px-6 border-b border-gray-500 pb-2'><Link to="/profile">Profile</Link></li>
                <li className='px-6 pt-2'><button onClick={logoutHandler} className='cursor-pointer'>Logout</button></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminHeader