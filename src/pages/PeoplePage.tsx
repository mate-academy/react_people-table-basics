// Página principal de pessoas — renderizada nas rotas "/people" e "/people/:slug".
// Responsável por buscar os dados da API e gerenciar os 3 estados possíveis:
//   1. loading  → exibe o componente <Loader />
//   2. error    → exibe mensagem de erro (data-cy="peopleLoadingError")
//   3. sucesso  → exibe a tabela OU mensagem "sem pessoas" se o array estiver vazio

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  // Estado para armazenar a lista de pessoas vindas da API
  const [people, setPeople] = useState<Person[]>([]);

  // Controla se a requisição ainda está em andamento
  const [loading, setLoading] = useState(true);

  // Armazena a mensagem de erro caso a requisição falhe
  const [errorMessage, setErrorMessage] = useState('');

  // Pega o parâmetro "slug" da URL para destacar a pessoa selecionada
  const { slug } = useParams();

  // useEffect com array de dependências vazio → executa apenas uma vez (ao montar)
  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {/* Exibe o loader enquanto os dados estão sendo carregados */}
          {loading && <Loader />}

          {/* Exibe mensagem de erro se a requisição falhou */}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {/* Exibe mensagem quando a API retorna uma lista vazia */}
          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {/* Exibe a tabela somente quando há dados carregados com sucesso */}
          {!loading && !errorMessage && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
