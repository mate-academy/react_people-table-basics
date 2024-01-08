import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParrents } from '../helpers';
import { Loader, PersonItem } from '../components';

export const PeoplePage = () => {
  const [loadingPeople, setLoadingPeople] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then(data => setPeople(getPeopleWithParrents(data)))
      .catch(() => setErrors('Something went wrong'))
      .finally(() => setLoadingPeople(false));
  }, []);

  const renderContent = () => {
    if (loadingPeople) {
      return <Loader />;
    }

    if (!loadingPeople && errors) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errors}
        </p>
      );
    }

    if (!loadingPeople && people.length === 0) {
      return (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      );
    }

    return (
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
          {people.map(person => {
            return (
              <PersonItem
                person={person}
                key={person.slug}
              />
            );
          })}

        </tbody>
      </table>
    );
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {renderContent()}
        </div>
      </div>
    </>
  );
};
