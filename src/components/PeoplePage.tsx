import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   getPeople()
  //     .then(person => setPeople(person))
  //     .catch(() => setError(true))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    setLoading(true);
    setPeople([]);

    getPeople()
      .then(data => {
        const dataWithParent = data.map(person => {
          const foundFather = data.find(
            findingFather => findingFather.name === person.fatherName,
          );
          const foundMother = data.find(
            findingMother => findingMother.name === person.motherName,
          );

          return { ...person, father: foundFather, mother: foundMother };
        });

        setPeople(dataWithParent);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {!loading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading &&
            !error &&
            (people.length ? (
              <PeopleTable people={people} />
            ) : (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ))}
        </div>
      </div>
    </div>
  );
};
