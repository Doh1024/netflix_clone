import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from "./pages/HomeScreen.js"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen.js';
import ProfileScreen from './pages/ProfileScreen.js';
import { auth } from './firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice.js';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
      } else{
        dispatch(logout())
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen/>
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen/>}/>
            <Route path="/" element={<HomeScreen/>}/>
          </Routes>
        )}
        
      </Router>
    </div>
  );
}

export default App;
