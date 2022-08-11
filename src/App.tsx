import { useState } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PeopleTable } from './components/PeopleTable';
import { People } from './types/People';

const App = () => {
  const [people, setPeople] = useState<People[]>([]);

  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage />
            )}
          />

          <Route path="home" element={<Navigate to="/" />} />

          <Route
            path="people"
            element={(
              <>
                <PeoplePage loadPeople={setPeople} />
                <PeopleTable people={people} />
              </>
            )}
          />

          <Route
            path="*"
            element={(
              <h2>Page not found</h2>
            )}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
