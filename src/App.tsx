import './App.scss';
import PeopleTable from './Pages/PeopleTable/PeopleTable';
import Navbar from './components/Navbar/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/people">
              <Route
                index
                element={
                  <>
                    <h1 className="title">People Page</h1>
                    <div className="block">
                      <div className="box table-container">
                        <PeopleTable />
                      </div>
                    </div>
                  </>
                }
              />

              <Route
                path=":personSlug"
                element={
                  <>
                    <h1 className="title">People Page</h1>
                    <div className="block">
                      <div className="box table-container">
                        <PeopleTable />
                      </div>
                    </div>
                  </>
                }
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/home" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
