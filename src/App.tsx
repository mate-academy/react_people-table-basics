import './App.scss';
import { Nav } from './components/Nav';
import { Main } from './components/Main/Main';
import { MainProvider } from './context/MainContext';

export const App = () => {
  return (
    <MainProvider>
      <div data-cy="app">
        <Nav />
        <Main />
      </div>
    </MainProvider>  
  )
}
