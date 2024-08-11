import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[] | null>(
    null,
  );
  const [loadError, setLoadError] = useState(false);

  const loadDataFromServer = async () => {
    try {
      const people = await getPeople();

      setPeopleFromServer(people);
    } catch {
      setLoadError(true);
    }
  };

  useEffect(() => {
    loadDataFromServer();
  }, []);

  const preparedPeople = useMemo(
    () =>
      peopleFromServer?.map(human => {
        const { fatherName, motherName } = human;

        const person = {
          ...human,
        };

        if (fatherName) {
          const father = peopleFromServer.find(
            man => man.name === fatherName,
          );

          if (father) {
            person.father = father;
          }
        }

        if (motherName) {
          const mother = peopleFromServer.find(
            woman => woman.name === motherName,
          );

          if (mother) {
            person.mother = mother;
          }
        }

        return person;
      }),
    [peopleFromServer],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!preparedPeople && !loadError && <Loader />}

          {preparedPeople && <PeopleTable people={preparedPeople} />}
        </div>
      </div>
    </>
  );
};
