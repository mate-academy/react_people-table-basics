import { useState } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFounfPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Person } from './types/Person';

const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <div className="App">
      <Header people={people} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/people"
          element={<PeoplePage people={people} setPeople={setPeople} />}
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
