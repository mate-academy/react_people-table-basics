import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPeople } from './api/api';

import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { PeopleTable } from './pages/PeopleTable/PeopleTable';
import './App.scss';

const App = () => {
  const [people, setPeople] = useState<P[]>([]);

  useEffect(() => {
    getPeople()
      .then(p => setPeople(p));
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/people" element={<PeopleTable people={people} />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </div>
  );
};

export default App;
