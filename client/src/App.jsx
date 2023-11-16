import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as gameService from './services/gameService';
import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import { GameList } from './components/game-list/GameList';
import { GameCreate } from './components/game-create/GameCreate';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';


function App() {

  const [games, setGames] = useState();

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        console.log(result);
        setGames(result);
      });
      
  }, []);

  return (
    <div id="box">
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/games' element={<GameList games={games}/>} />
        <Route path='/games/create' element={<GameCreate />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;
