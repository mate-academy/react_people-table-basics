import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [noPeople, setNoPeople] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsTableLoading(true);

    getPeople()
      .then(peopleFromServer => {
        if (peopleFromServer.length === 0) {
          setIsTableLoading(true);
          setNoPeople(true);
        }

        setIsTableLoading(false);
        setPeople(peopleFromServer);
      })
      .catch(() => setError('Something went wrong'));
  }, []);

  const visiblePeople = people.map(person => {
    const mother = people
      .find(moth => moth.name === person.motherName);
    const father = people
      .find(fath => fath.name === person.fatherName);

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
          {(isTableLoading) && <Loader />}

          {error && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              {error}
            </p>
          )}

          {noPeople && people.length === 0 ? (
            <p
              data-cy="noPeopleMessage"
            >
              There are no people on the server
            </p>
          ) : (people.length !== 0 && (<PeopleTable people={visiblePeople} />))}

        </div>
      </div>
    </>
  );
};
