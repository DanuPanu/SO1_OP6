import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Aloitus from './components/Aloitus';
import UusiJuttu from './components/UusiJuttu';

const App : React.FC = () : React.ReactElement => {

  const [tunnit, setTunnit] = useState<number>(0);
  const [minuutit, setMinuutit] = useState<number>(0);

  const paivitaMinuutit = (Minuutit : number, Tunnit : number) : void => {
    if(minuutit + Minuutit >= 60){
      setMinuutit(minuutit + Minuutit - 60)
      setTunnit(tunnit + 1)
    }else{
      setMinuutit(minuutit + Minuutit)
      setTunnit(tunnit + Tunnit)
    }
  }

  const [tehtavat, setTehtavat] = useState<Tehtava[]>([]);

  return (
    <>
    <Routes>
      <Route path="/" element={<Aloitus tunnit={tunnit} minuutit={minuutit} tehtavat={tehtavat} setTehtavat={setTehtavat}/>}/>
      <Route path="/uusijuttu" element={<UusiJuttu paivitaMinuutit={paivitaMinuutit} minuutit={minuutit} tehtavat={tehtavat} setTehtavat={setTehtavat}/>}/>
    </Routes>
    </>
  );
}

export default App;
