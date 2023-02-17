import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorTypes } from '../../types/ErrorTypes';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isPersonsLoaded, setIsPersonsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorNoteShown, setErrorNoteShown] = useState(false);
  const match = useMatch('/people/:slug');
  const selectedPerson = match?.params.slug;
  const isCountPersonsLoaded = persons.length === 0;

  useEffect(() => {
    const fetchPerson = async () => {
      setIsLoading(true);
      setIsPersonsLoaded(false);
      setErrorNoteShown(false);

      try {
        const person = await getPeople();

        setPersons(person);
      } catch {
        setIsLoading(false);
        setErrorNoteShown(true);
      } finally {
        setIsLoading(false);
        setIsPersonsLoaded(true);
      }
    };

    fetchPerson();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isErrorNoteShown && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorTypes.Loading}
            </p>
          )}
          {isPersonsLoaded && isCountPersonsLoaded && (
            <p data-cy="noPeopleMessage">{ErrorTypes.Empty}</p>
          )}

          {isPersonsLoaded && !isCountPersonsLoaded && !isErrorNoteShown && (
            <PeopleTable persons={persons} selectedPerson={selectedPerson} />
          )}
        </div>
      </div>
    </>
  );
};
