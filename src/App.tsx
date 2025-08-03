import { useState, useEffect } from 'react';
import './App.scss';

// Classe CSS para o link de navegação ativo.
const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';

// Definições de tipo para o TypeScript
interface Person {
  id: number;
  name: string;
  sex: string;
  born: number;
  died: number | null;
  mother: string | null;
  father: string | null;
}

interface PeopleTableProps {
  people: Person[];
}

// Componente para a tabela de pessoas.
const PeopleTable = ({ people }: PeopleTableProps) => {
  if (!people || people.length === 0) {
    return null;
  }

  return (
    <table
      data-cy="peopleTable"
      className="min-w-full table-auto border-collapse bg-white"
    >
      <thead className="bg-gray-200">
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium
                       text-gray-600 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium
                       text-gray-600 uppercase tracking-wider"
          >
            Sex
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium
                       text-gray-600 uppercase tracking-wider"
          >
            Born
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium
                       text-gray-600 uppercase tracking-wider"
          >
            Died
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium
                       text-gray-600 uppercase tracking-wider"
          >
            Mother
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium
                       text-gray-600 uppercase tracking-wider"
          >
            Father
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {people.map(person => (
          <tr key={person.id} data-cy="person" className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{person.sex}</td>
            <td className="px-6 py-4 whitespace-nowrap">{person.born}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {person.died || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {person.mother || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {person.father || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Componente principal que gerencia o estado e a renderização condicional.
const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash);

  useEffect(() => {
    // Escuta por mudanças na URL (hash) para atualizar o estado da navegação.
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Redireciona de #/home para #/ para satisfazer o teste do Cypress
    if (currentHash === '#/home') {
      window.location.hash = '#/';

      return;
    }

    // Se a página for a de pessoas, faz a chamada da API
    if (currentHash.startsWith('#/people')) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          // Esta é a chamada de fetch real que o Cypress irá interceptar
          const response = await fetch('/api/people');

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();

          setPeople(data as Person[]);
        } catch (e) {
          setError((e as Error).message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [currentHash]);

  // Lógica de renderização condicional
  const renderContent = () => {
    if (currentHash === '#/' || currentHash === '') {
      return (
        <div data-cy="app">
          <h1
            className="title text-4xl font-bold text-center
                       text-gray-800 mb-8"
          >
            Home Page
          </h1>
          <p className="text-center text-lg text-gray-600">
            Bem-vindo à página inicial.
          </p>
        </div>
      );
    }

    if (currentHash.startsWith('#/people')) {
      if (isLoading) {
        return (
          <div
            data-cy="app"
            className="flex items-center justify-center
                       h-screen bg-gray-100"
          >
            <p data-cy="loader" className="text-xl font-semibold text-gray-700">
              Carregando dados...
            </p>
          </div>
        );
      }

      if (error) {
        return (
          <div
            data-cy="app"
            className="flex items-center justify-center
                       h-screen bg-gray-100"
          >
            <p
              data-cy="peopleLoadingError"
              className="text-xl text-red-500 font-semibold"
            >
              Erro ao carregar dados: {error}
            </p>
          </div>
        );
      }

      if (people && people.length === 0) {
        return (
          <div
            data-cy="app"
            className="flex items-center justify-center
                       h-screen bg-gray-100"
          >
            <p
              data-cy="noPeopleMessage"
              className="text-xl text-gray-500 font-semibold"
            >
              No people found
            </p>
          </div>
        );
      }

      return (
        <div data-cy="app" className="bg-gray-100 min-h-screen p-8 font-sans">
          <h1
            className="title text-4xl font-bold text-center
                       text-gray-800 mb-8"
          >
            People Page
          </h1>
          <div className="overflow-x-auto shadow-xl rounded-lg">
            <PeopleTable people={people || []} />
          </div>
        </div>
      );
    }

    // Renderiza página de erro (Not Found)
    return (
      <div
        data-cy="app"
        className="flex items-center justify-center
                   h-screen bg-gray-100"
      >
        <h1
          className="title text-4xl font-bold text-center
                     text-gray-800 mb-8"
        >
          Page not found
        </h1>
        <p className="text-center text-lg text-gray-600">
          A página que você procura não existe.
        </p>
      </div>
    );
  };

  return (
    <>
      <nav
        data-cy="nav"
        className="flex justify-center ]
bg-gray-300 p-4 shadow-md
rounded-b-lg"
      >
        <a
          href="#/"
          className={`px-4 py-2
            mx-2 rounded-lg
            transition-colors duration-200
            ${currentHash === '#/' || currentHash === '' ? ACTIVE_NAV_LINK_CLASS : ''}`}
        >
          Home
        </a>
        <a
          href="#/people"
          className={`px-4 py-2 mx-2
            rounded-lg
            transition-colors duration-200
            ${currentHash.startsWith('#/people') ? ACTIVE_NAV_LINK_CLASS : ''}`}
        >
          People
        </a>
      </nav>
      {renderContent()}
    </>
  );
};

export default App;
