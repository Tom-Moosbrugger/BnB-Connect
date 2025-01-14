import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage/HomePage';
import SpotDetails from './components/SpotDetails/SpotDetails';
import * as sessionActions from './store/session';

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && <Outlet />}
    </>
  )
};

const router = createBrowserRouter([
 {
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/spots/:spotId',
      element: <SpotDetails />
    },
    {
      path: '/spots/current',
      element: <h1>Manage Your Spots</h1>
    },
    {
      path: '*',
      element: <Navigate to='/' replace={true}/>
    },
  ]
 }
])


const App = () => {
  return (
    <>

      <RouterProvider router={router}/>
    </>
    
  )
}

export default App;
