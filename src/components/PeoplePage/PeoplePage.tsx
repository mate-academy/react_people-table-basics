import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(response => {
        const preparedPeople: Person[] = response.map(human => (
          {
            ...human,
            mother: response.find(({ name }) => name === human.motherName),
            father: response.find(({ name }) => name === human.fatherName),
          }
        ));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setError(true);
        // setPeople([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (<Loader />)}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !loading && !error && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length !== 0 && <PeopleTable people={people} />}

        </div>
      </div>
    </>
  );
};
