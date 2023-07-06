import { useEffect, useState } from 'react';
import { PeopleTable } from '../../PeopleTable/PeopleTable';
import { getPeople } from '../../../api';
import { Person } from '../../../types';
import { Loader } from '../../Loader';

export const PeoplePage: React.FC = () => {
  const [visiblePeople, setVisiblePeople] = useState<Person[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setIsRequestSent(false);

    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = peopleFromServer.map((
          person,
          _,
          people,
        ) => {
          const mother = people.find(m => (
            m.name === person.motherName));
          const father = people.find(f => (
            f.name === person.fatherName));

          return (
            {
              ...person,
              mother,
              father,
            }
          );
        });

        setVisiblePeople(peopleWithParents);
        setIsRequestSent(true);
      })
      .catch(() => {
        setIsError(true);
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
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isRequestSent && !visiblePeople?.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {visiblePeople && (
            <PeopleTable
              visiblePeople={visiblePeople}
            />
          )}

        </div>
      </div>
    </>
  );
};
