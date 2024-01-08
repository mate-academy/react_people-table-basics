import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

enum RenderStatus {
  Loading = 'Loading',
  Error = 'Error',
  ShowPeople = 'ShowPeople',
}

export const PeoplePage = () => {
  const [renderStatus, setRenderStatus]
    = useState<RenderStatus>(RenderStatus.Loading);
  const [people, setPeople] = useState<Person[] | null>(null);

  const renderPeople = () => {
    switch (renderStatus) {
      case RenderStatus.Error:
        return (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        );

      case RenderStatus.ShowPeople:
        return people
          ? (
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
                {people.map((person) => (
                  <PersonLink person={person} people={people} />
                ))}
              </tbody>
            </table>
          ) : (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          );

      default:
        return <Loader />;
    }
  };

  useEffect(() => {
    setRenderStatus(RenderStatus.Loading);
    getPeople()
      .then((items) => {
        setPeople(items);
        setRenderStatus(RenderStatus.ShowPeople);
      })
      .catch(() => setRenderStatus(RenderStatus.Error));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {renderPeople()}
        </div>
      </div>
    </>
  );
};
