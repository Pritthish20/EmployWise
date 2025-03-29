import React from 'react'
import { Outlet, useLocation } from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar';


const App = () => {
  const location=useLocation();
  const noNavbarRoutes=["/", "/signup"]
  return (
    <>
      <ToastContainer/>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar/>}
      <main className=''>
        <Outlet/>
      </main>
    </>
    
  )
}
export default App;