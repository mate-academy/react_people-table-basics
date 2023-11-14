/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { Loader } from '../Loader';
import { PeopleRow } from './PeopleRow';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const peopleArray = await getPeople();

        const peopleFromServer = peopleArray.map(person => {
          const mother = peopleArray.find(p => p.name === person.motherName);
          const father = peopleArray.find(p => p.name === person.fatherName);

          return {
            ...person,
            mother,
            father,
          };
        });

        setPeople(peopleFromServer);
      } catch {
        setIsError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { personSlug } = useParams();

  return (
    <main className="section">
      <h1 className="title">People Page</h1>

      <div className="container">
        {((isLoading || isError) || people.length === 0) && (
          <div className="block">
            <div className="box table-container">
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {isError}
                </p>
              )}
              {(!isError && people.length === 0 && !isLoading) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>

              )}

              {isLoading && <Loader />}

            </div>
          </div>
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
              {people.map(person => (
                <PeopleRow person={person} key={person.slug} slug={personSlug} />
              ))}

            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};
