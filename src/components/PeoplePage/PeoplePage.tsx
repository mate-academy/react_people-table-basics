/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from '../PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleLoadingError, setPeopleLoadingError] = useState(false);
  const { slug } = useParams();
  const selectedPerson = slug ? `${slug}` : '';

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const persons = await getPeople();

        persons.length > 0 ? setPeople(persons) : setPeopleLoadingError(true);
      } catch {
        setPeopleLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {peopleLoadingError && (
            <>
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>
            </>
          )}

          {!!people.length && (
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
                  <PersonLink
                    key={person.slug}
                    person={person}
                    people={people}
                    selectedPerson={selectedPerson}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
