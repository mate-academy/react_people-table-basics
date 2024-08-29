import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { PersonLink } from '../../components/PersonLink/PersonLink';

enum Status {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<Status>(Status.Pending);
  const [errorMessage, setErrorMessage] = useState(false);

  const fetchPeople = async () => {
    try {
      const result = await getPeople();

      setPeople(result);
      setIsLoading(Status.Fulfilled);
    } catch (error) {
      setErrorMessage(true);
      setIsLoading(Status.Rejected);
    }
  };

  const noPeople =
    people.length === 0 ? (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    ) : (
      ''
    );

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading === Status.Pending ? (
            <Loader />
          ) : (
            <>
              {errorMessage && <ErrorMessage />}
              {noPeople}

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
                    <PersonLink key={person.slug} {...person} people={people} />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};
