import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { PeopleTable } from './components/Peopletable/PeopleTable';
import { Page404 } from './components/Page404/Page404';
import { NavBar } from './components/Navbar/NavBar';
import { PersonInfo } from './components/Personinfo/Personinfo';

export const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title level-item">Home Page</h1>}
            />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="people">
              <Route index element={<PeopleTable />} />
              <Route path=":slug" element={<PersonInfo />} />
            </Route>
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </div>
      </div>

    </div>
  );
};
