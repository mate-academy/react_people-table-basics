import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useAppContext } from '../context/AppContext';
import { User } from '../User';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorToGetPeople, setIsErrorToGetPeople] = useState(false);
  const { hasClickedPeopleLink } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const { slug } = useParams();
  const selectId = slug || '';
  const selectedUser = people.find(p => p.slug === selectId);

  useEffect(() => {
    if (hasClickedPeopleLink) {
      getPeople()
        .then((allPersons) => setPeople(allPersons))
        .catch(() => {
          setIsErrorToGetPeople(true);
          throw new Error(' Something went wrong');
        })
        .finally(() => setIsLoading(true));
    }
  }, [hasClickedPeopleLink]);

  return (
    <div className="block">
      <div className="box table-container">
        <h1 className="title">People Page</h1>

        {isErrorToGetPeople && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {(!people.length && !isErrorToGetPeople) && (
          <Loader />
        )}

        {!!people.length && (
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
              {people.map((person) => {
                return (
                  <User
                    key={person.slug}
                    people={people}
                    person={person}
                    selectedUser={selectedUser}
                  />
                );
              })}
            </tbody>
          </table>
        )}

        {(!isLoading && !people.length) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
