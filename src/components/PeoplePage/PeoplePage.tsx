import {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage:FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTableLoading, setIsTableLoading] = useState(false);
  const loadPeopleFromServer = async () => {
    try {
      setIsTableLoading(true);

      const peopleFromServer = await getPeople();
      const preparedPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(mom => (
          person.motherName === mom.name
        ));

        const father = peopleFromServer.find(dad => (
          person.fatherName === dad.name));

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(preparedPeople);

      return preparedPeople;
    } catch (loadingError) {
      setErrorMessage('Something went wrong');

      return loadingError;
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  const { slug = '' } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isTableLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isTableLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} selectedPersonSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
});
