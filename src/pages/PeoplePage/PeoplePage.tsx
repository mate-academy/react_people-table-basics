import { useEffect, useState } from 'react';

import { Loader } from '../../components/Loader';
import Person from '../../components/Person/Person';

import { PersonType } from '../../types';
import { getPeople } from '../../api';

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

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(
      currentPerson => currentPerson.name === person.motherName,
    ),
    father: people.find(
      currentPerson => currentPerson.name === person.fatherName,
    ),
  }));

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

          {people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {preparedPeople.map(person => (
                  <Person key={person.slug} person={person} />
                ))}
              </tbody>
            </table>
          )}
          {people.length < 1 && !isLoading && !error && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
