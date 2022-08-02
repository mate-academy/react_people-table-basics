import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage';
import { NoPageFound } from './Components/NoPageFound';
import { PeopleTable } from './Components/PeopleTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people" element={<PeopleTable />} />
        <Route
          path="*"
          element={<NoPageFound />}
        />
      </Routes>
    </div>
  );
};

export default App;
