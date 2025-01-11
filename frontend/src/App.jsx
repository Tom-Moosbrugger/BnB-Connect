import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
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
      element: <h1>Welcome</h1>
    }
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
