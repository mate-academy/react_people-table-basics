import { FC, useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoaging, setIsLoaging] = useState<boolean>(false);
  const [noPeople, setNoPeople] = useState(false);

  useEffect(() => {
    setIsLoaging(true);

    getPeople()
      .then(peopleFromServer => {
        if (peopleFromServer.length === 0) {
          setNoPeople(true);
        }

        setPeople(peopleFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => setIsLoaging(false));
  }, []);

  const visiblePeople = people.map(person => {
    const mother = people
      .find(m => m.name === person.motherName);
    const father = people
      .find(f => f.name === person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoaging && <Loader />}

          {error
            && (
              <>
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              </>
            )}

          {noPeople
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : (people.length !== 0 && (<PeopleTable people={visiblePeople} />))}
        </div>
      </div>
    </>
  );
};
