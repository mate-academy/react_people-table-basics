import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Loader } from './components/Loader';
import { Person } from './types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const { slugId } = useParams();

  useEffect(() => {
    setIsLoader(true);
    getPeople()
      .then(arr => {
        setPeople(arr);
        setIsLoader(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoader && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {people.length !== 0 && !isError && !isLoader && (
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
                {people.map((person, _index, array) => {
                  // eslint-disable-next-line no-param-reassign
                  person.mother = array.find(
                    parent => parent.name === person.motherName,
                  );

                  // eslint-disable-next-line no-param-reassign
                  person.father = array.find(
                    parent => parent.name === person.fatherName,
                  );

                  return (
                    <PersonLink
                      key={person.name}
                      person={person}
                      slugId={slugId}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
