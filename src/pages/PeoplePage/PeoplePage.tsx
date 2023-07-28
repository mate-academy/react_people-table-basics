import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PersonItem } from '../../components/PersonItem/PersonItem';

const getPreparedPeople = (people: Person[]) => {
  const preparedPeople = people.map(person => {
    return {
      ...person,
      father: people.find(p => p.name === person.fatherName),
      mother: people.find(p => p.name === person.motherName),
    };
  });

  return preparedPeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        setPeople(getPreparedPeople(data));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : (
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
                  <PersonItem
                    person={person}
                    slug={slug}
                    key={person.slug}
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
