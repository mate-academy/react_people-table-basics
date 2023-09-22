import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople().then((data) => {
      setPeopleFromServer(data);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong', error);
      setIsError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <Loader />
      );
    }

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
    }

    if (peopleFromServer.length === 0) {
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
          {peopleFromServer.map(person => {
            return (
              <PersonLink
                key={person.name}
                person={person}
                peopleFromServer={peopleFromServer}
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
