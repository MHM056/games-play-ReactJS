import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AuthContext from './contexts/authContext';
import * as gameService from './services/gameService';

import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import { GameList } from './components/game-list/GameList';
import { GameCreate } from './components/game-create/GameCreate';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { GameDetails } from './components/game-details/GameDetails';


function App() {
  const [auth, setAuth] = useState({});

  const navigate = useNavigate();


  const loginSubmitHandler = (values) => {
    console.log(values);
  };

  const onCreateGameSubmit = async (data) => {
    const newGame = await gameService.create(data);

    setGames(state => [...state, newGame]);

    navigate('/games');
  };

  return (
    <AuthContext.Provider value={loginSubmitHandler}>
      <div id="box">
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/games' element={<GameList />} />
          <Route path='/games/create' element={<GameCreate onCreateGameSubmit={onCreateGameSubmit} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/games/:gameId' element={<GameDetails />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
