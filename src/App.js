import './App.css';
import { Route, Routes } from "react-router-dom";
import GetPokemon from './Components/GetPokemon/GetPokemon';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import Detail from './Components/Detail/Detail';
import EditPokemon from './Components/EditPokemon/EditPokemon';
import Landing from './Components/Landing/Landing';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/get" element={<GetPokemon />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/edit/:id" element={<EditPokemon/>} />
      </Routes>
    </div>
  );
}

export default App;