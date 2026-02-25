// Componente principal da aplicação — define a estrutura de layout e as rotas.
// O <Navbar /> fica fora do <Routes> para aparecer em TODAS as páginas.
// O HashRouter já está configurado em index.tsx, então aqui usamos apenas Routes/Route.

import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    {/* Barra de navegação fixa no topo — sempre visível */}
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<HomePage />} />

          {/* Redireciona /home → / com "replace" para não criar loop no histórico */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* Rotas da tabela de pessoas — aceita slug opcional para seleção */}
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          {/* Qualquer URL não mapeada cai aqui */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);
