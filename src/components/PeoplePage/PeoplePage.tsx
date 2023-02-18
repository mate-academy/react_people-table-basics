import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { ErrorTypes } from '../../types/ErrorTypes';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoaded, setIsPeopleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorNoteShown, setErrorNoteShown] = useState(false);
  const match = useMatch('/people/:slug');
  const selectedPerson = match?.params.slug;
  const isPeopleListEmpty = people.length === 0;

  useEffect(() => {
    const fetchPerson = async () => {
      setIsLoading(true);
      setIsPeopleLoaded(false);
      setErrorNoteShown(false);

      try {
        const person = await getPeople();

        setPeople(person);
      } catch {
        setErrorNoteShown(true);
      } finally {
        setIsLoading(false);
        setIsPeopleLoaded(true);
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
          {isPeopleLoaded && isPeopleListEmpty && (
            <p data-cy="noPeopleMessage">{ErrorTypes.Empty}</p>
          )}

          {isPeopleLoaded && !isPeopleListEmpty && !isErrorNoteShown && (
            <PeopleTable people={people} selectedPerson={selectedPerson} />
          )}
        </div>
      </div>
    </>
  );
};
