import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';

/*
Resumo das tarefas em formato de checklist;

* As páginas `HomePage`, `PeoplePage` e `NotFoundPage` foram criadas e o conteúdo foi distribuído entre elas.
* O roteamento principal foi configurado em `App.tsx` usando `react-router-dom` para navegar entre as páginas.
* Um componente `Loader` foi criado para indicar o carregamento de dados.
* A `PeoplePage` foi configurada para buscar os dados das pessoas da API ao ser acessada.
* Um componente `PeopleTable` foi criado para renderizar a tabela de pessoas, separando a lógica de exibição.
* Um componente `PersonLink` foi criado para gerenciar a renderização de nomes como links ou texto, aplicando cores condicionais.
* Os nomes de mulheres na tabela (`PersonLink`) foram configurados para aparecer em vermelho.
* As linhas da tabela na `PeopleTable` foram configuradas para destacar a pessoa selecionada com base no `slug` da URL.
* A navegação para detalhes da pessoa (`/people/:slug`) foi implementada usando roteamento aninhado em `App.tsx`.
* A lógica de exibição para `motherName` e `fatherName` nulos foi ajustada para mostrar `-`.
* O componente `PersonLink` foi otimizado para usar a prop `person` diretamente quando disponível.
*/

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link
              className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
              to="/"
            >
              Home
            </Link>

            <Link
              className={`navbar-item ${location.pathname.startsWith('/people') ? 'has-background-grey-lighter' : ''}`}
              to="/people"
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />{' '}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};
