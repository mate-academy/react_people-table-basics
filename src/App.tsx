import './App.scss';
import 'bulma';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { HomePage } from './HomePage/HomePage';
import { Navigation } from './components/Navigate/Navigation';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Header } from './Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <Navigation />

      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeopleTable />} />
      </Routes>
    </>
  );
};

export default App;
