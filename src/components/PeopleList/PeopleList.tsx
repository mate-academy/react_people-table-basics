import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import Person from '../Person/Person';
import combinePeople from '../../utils/combinePeople';
import { PersonProps } from '../../types';

export default function PeopleList() {
  const [peopleList, setPeopleList] = useState<PersonProps[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((people) => {
        setPeopleList(combinePeople(people));
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError
            && (
              <p
                data-cy="peopleLoadingError"
                className="has-text-danger"
              >
                Something went wrong
              </p>
            )}

          {(!isError && !isLoading && !peopleList.length)
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {(!isError && !isLoading) && (
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
                {peopleList.map(person => (
                  <Person person={person} key={person.slug} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
