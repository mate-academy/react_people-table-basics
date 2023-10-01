import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useAppContext } from '../Context/AppProvider';
import { User } from '../User';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorToGetPeople, setIsErrorToGetPeople] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { hasClickedPeopleLink } = useAppContext();
  const { slug } = useParams();
  const selectId = slug || '';
  const selectedUser = people.find(p => p.slug === selectId);

  const getPeopleFromServer = () => {
    return getPeople()
      .then(allPeople => allPeople)
      .catch(() => {
        setIsErrorToGetPeople(true);
        throw new Error('Something went wrong');
      });
  };

  useEffect(() => {
    if (hasClickedPeopleLink) {
      getPeopleFromServer()
        .then((allPersons) => {
          setPeople(allPersons);
          setIsLoading(false);
        });
    }
  }, [hasClickedPeopleLink]);

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
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
