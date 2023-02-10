import { useEffect, useState } from 'react';
import { PersonTable } from '../components/PersonTable';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isErorrOnLoadPeople, setIsErorrOnLoadPeople] = useState(false);
  const [isNoPeopleOnServer, setIsNoPeopleOnServer] = useState(false);

  const loadPeople = async () => {
    setIsloading(true);

    try {
      setIsErorrOnLoadPeople(false);

      const result = await getPeople();

      const personWithParents = result.map(person => {
        const mother = result.find(m => m.name === person.motherName);
        const father = result.find(f => f.name === person.fatherName);

        return { ...person, mother, father };
      });

      if (result.length !== 0) {
        setPeoples(personWithParents);
      } else {
        setIsNoPeopleOnServer(true);
      }
    } catch {
      setIsErorrOnLoadPeople(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isErorrOnLoadPeople && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && (
            <PersonTable
              persons={peoples}
            />
          )}
        </div>
      </div>
    </>
  );
};
