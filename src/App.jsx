import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import Search from './pages/Search/Search';
import TV from './pages/TV/TV';
import Movies from './pages/Movies/Movies';
import MyListPage from './pages/MyList/MyListPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
        navigate('/login');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/search' element={<Search />} />
        <Route path='/tv' element={<TV />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/my-list' element={<MyListPage />} />
      </Routes>
    </div>
  );
};

export default App;