import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { PersonItem } from '../PersonItem';
import { Person } from '../../types';

type Props = {
  onLoad: () => Promise<Person[]>;
};

export const People: React.FC<Props> = ({ onLoad }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    onLoad()
      .then((items: Person[]) => {
        setPeople(items);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
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

              <tbody>
                {people.map(item => (
                  <PersonItem key={item.slug} person={item} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
