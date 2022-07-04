import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ScreenLogin from './components/ScreenLogin';
import ScreenSingUp from './components/ScreenSingUp';
import ScreenEntrada from './components/ScreenEntrada';
import ScreenSaida from './components/ScreenSaida';
import ScreenRegistros from './components/ScreenRegistros';
import UserContext from './components/UserContext';

export default function App(){

    const localToken = (localStorage.getItem('@mywallet/token'));
    const [token, setToken] = useState(localToken);
  
    const localUser = (localStorage.getItem('@mywallet/user'));
    const [name, setName] = useState(localUser);
  

    const [reload, setReload]= useState(null);
    const [loading, setLoading]= useState(null);

    function setLocalToken(token) {
      setToken(token);
      localStorage.setItem('@mywallet/token', token);
    }
  
    function setLocalUser(user) {
      setName(user);
      localStorage.setItem('@mywallet/user', user);
    }
  
    const contextValue = {setLocalUser ,setLocalToken, localToken ,token, setToken, name, setName, reload, setReload, loading, setLoading};

    return (
        <UserContext.Provider value={contextValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ScreenLogin />} ></Route>
                    <Route path="/cadastro" element={<ScreenSingUp />} ></Route>
                    <Route path="/entrada" element={<ScreenEntrada />} ></Route>
                    <Route path="/saida" element={<ScreenSaida />} ></Route>
                    <Route path="/registros" element={<ScreenRegistros />} ></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
      );
};
