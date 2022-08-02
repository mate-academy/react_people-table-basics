import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './Components/Header';
import { PeopleTable } from './Components/PeopleTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={(
            <h1 className="title notification is-large is-success">
              Home Page
            </h1>
          )}
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeopleTable />} />
        <Route
          path="*"
          element={(
            <h3 className="title notification is-danger is-light">
              Page not found
            </h3>
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
