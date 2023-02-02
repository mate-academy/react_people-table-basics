import {
  FC,
  useEffect,
  memo,
  useState,
} from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = memo(() => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      const preparedPeople = peopleFromServer.map(person => {
        const mother = peopleFromServer.find(mom => (
          mom.name === person.motherName
        ));
        const father = peopleFromServer.find(dad => (
          dad.name === person.fatherName
        ));

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(preparedPeople);
    } catch (e) {
      setError('Unable dowload data from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title people-title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && (
            people.length
              ? <PeopleTable people={people} />
              : (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )
          )}
        </div>
      </div>
    </>
  );
});
