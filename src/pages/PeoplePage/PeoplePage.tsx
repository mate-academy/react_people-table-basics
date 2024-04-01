import { useEffect, useState } from 'react';

import { Loader } from '../../components/Loader';
import Person from '../../components/Person/Person';

import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { PersonType } from '../../types';
import { getPeople } from '../../api';

const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const response = await getPeople();

        setPeople(response);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {!!people.length && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {tableHeaders.map(header => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {preparedPeople.map(person => (
                  <Person key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
          {!people.length && !isLoading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
