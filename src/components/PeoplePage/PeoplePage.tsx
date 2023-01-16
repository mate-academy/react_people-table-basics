import { FC, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { findParent } from '../../Navbar.helpers';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [hasError, setHesError] = useState(false);
  const [isPeopleLoaded, setIsPeopleLoaded] = useState(false);

  useEffect(() => {
    setIsloading(true);

    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents: Person[] = peopleFromServer.map(person => ({
          ...person,
          mother: findParent(person.motherName, peopleFromServer),
          father: findParent(person.fatherName, peopleFromServer),
        }));

        setPeople(peopleWithParents);
        setIsPeopleLoaded(true);
      })
      .catch(() => setHesError(true))
      .finally(() => setIsloading(false));
  }, []);

  const isPeopleEmpty = people.length === 0 && isPeopleLoaded;
  const shouldPeopleBeRendered = !hasError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">

          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isPeopleEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {shouldPeopleBeRendered && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};
