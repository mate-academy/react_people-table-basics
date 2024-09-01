import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [arePeopleLoading, setArePeopleLoading] = useState(false);
  const [isLoadingSuccessful, setIsLoadingSuccessful] = useState(false);

  const errorMessage = (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  );
  const emptyPeopleMessage = (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );

  useEffect(() => {
    setArePeopleLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setArePeopleLoading(false);
        setIsLoadingSuccessful(true);
      })
      .catch(() => {
        setArePeopleLoading(false);
        setIsLoadingSuccessful(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {arePeopleLoading ? (
            <Loader />
          ) : isLoadingSuccessful ? (
            people.length > 0 ? (
              <PeopleTable people={people} />
            ) : (
              emptyPeopleMessage
            )
          ) : (
            errorMessage
          )}
        </div>
      </div>
    </>
  );
};
