import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/People/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleIsLoading, setPeopleIsLoading] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<string>('');

  const findMotherByName = (motherName: string | null) => {
    return people.find(person => person.name === motherName);
  };

  const findFatherByName = (FatherName: string | null) => {
    return people.find(person => person.name === FatherName);
  };

  const filteredPeople = people.map(person => ({
    ...person,
    mother: findMotherByName(person.motherName),
    father: findFatherByName(person.fatherName),
  }));

  useEffect(() => {
    setPeopleIsLoading(true);
    getPeople()
      .then(peopleList => {
        setPeople(peopleList);
      })
      .catch(() => setErrorLoading('Something went wrong'))
      .finally(() => setPeopleIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {peopleIsLoading ? (
            <Loader />
          ) : errorLoading ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
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
              <PeopleTable people={filteredPeople} />
            </table>
          )}
        </div>
      </div>
    </>
  );
};
