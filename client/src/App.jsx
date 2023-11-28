import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import { Header } from "./components/header/Header";
import { Home } from "./components/home/Home";
import { GameList } from './components/game-list/GameList';
import { GameCreate } from './components/game-create/GameCreate';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { GameDetails } from './components/game-details/GameDetails';
import { Logout } from './components/logout/Logout';
import { GameEdit } from './components/game-edit/GameEdit';


function App() {
  return (
    <AuthProvider >
      <div id="box">
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/games' element={<GameList />} />
          <Route path='/games/create' element={<GameCreate />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/games/:gameId' element={<GameDetails />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/games/:gameId/edit' element={<GameEdit />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App;
