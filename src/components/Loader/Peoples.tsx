import { useEffect, useState } from 'react';

import { Loader } from './Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from './PersonLink';

type Props = {
  selectedPerson: string,
};

enum Error {
  NONE,
  EMPTYMASSIVE,
  SOMEERROR,
}

export const Peoples: React.FC<Props> = ({ selectedPerson }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(Error.NONE);

  const findParents = (res: Person[]) => {
    setPeoples(
      res.map((item) => {
        return {
          ...item,
          mother: res.find((person) => (
            person.name === item.motherName || null)),
          father: res.find((person) => (
            person.name === item.fatherName || null)),
        };
      }),
    );
  };

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((res) => {
        return res.length ? (findParents(res)) : (setError(Error.EMPTYMASSIVE));
      })
      .catch(() => setError(Error.SOMEERROR))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setError(Error.NONE);
  }, [peoples]);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (
          <Loader />
        )}

        {error === Error.SOMEERROR && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {error === Error.EMPTYMASSIVE && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {(peoples.length > 0 && error === Error.NONE) && (
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
              {peoples.map((person) => (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={
                    selectedPerson === person.slug
                      ? 'has-background-warning'
                      : ''
                  }
                >
                  <PersonLink person={person} />
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
