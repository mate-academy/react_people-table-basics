import './App.scss';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';

const App = () => (
  <div className="App container">
    <div className="columns is-mobile is-centered">
      <div className="column is-half">
        <Header />
        <Main />
      </div>
    </div>
  </div>
);

export default App;
