import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { Route,RouterProvider,createRoutesFromElements,createBrowserRouter } from 'react-router-dom'

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import AllUsers from './pages/user/AllUsers.jsx'
import UserRoutes from './components/UserRoutes';



const routes = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    
    <Route path='' element={<UserRoutes/>}>
    <Route path='/users' element={<AllUsers/>}/>
    </Route>
   

  </Route>

   
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes}/>
  </Provider>
    
 
)