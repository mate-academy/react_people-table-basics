import './App.scss';
import {Route, Routes, Link, Navigate} from 'react-router-dom';
import {PeopleTable} from './PeopleTable';

const App = () => {

  return (
    <div className="App">
      <nav>
        <Link to="/">Home page </Link>
        <Link to="/people">People page</Link>
      </nav>
      <Routes>
        <Route path='/' element={<h1>Home page</h1>} />
        <Route path='/people' element={<PeopleTable />} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path="*" element={
          <p>Page not found</p>
        } />
      </Routes>
    </div>
  )
};

export default App;
