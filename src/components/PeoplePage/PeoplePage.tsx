import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(allPeople => setPeople(allPeople));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          <Loader />

          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>

          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>

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
                <PeopleTable
                  key={person.slug}
                  people={people}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};
