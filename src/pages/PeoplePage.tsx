import { FC, useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';

type PersonMap = {
  [key: string]: Person;
};

const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const makeMap = (peopleList: Person[]): PersonMap => {
    return peopleList.reduce<PersonMap>((acc, person) => {
      return {
        ...acc,
        [person.name]: person,
      };
    }, {});
  };

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        const updatedPeople = peopleFromServer.map(person => {
          const peopleMap = makeMap(peopleFromServer);

          return {
            ...person,
            mother: person.motherName
              ? peopleMap[person.motherName]
              : undefined,
            father: person.fatherName
              ? peopleMap[person.fatherName]
              : undefined,
          };
        });

        setPeople(updatedPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!isError) {
      return;
    }

    const timerId = window.setTimeout(() => setIsError(false), 3000);

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearTimeout(timerId);
    };
  }, [isError]);

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

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
