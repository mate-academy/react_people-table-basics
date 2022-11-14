import {
  FC, useMemo, useCallback, useState, useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { ModifiedPerson, Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { PeoplePage } from '../PeoplePage';
import { PeopleTable } from './PeopleTable';

export const PeopleList: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<ModifiedPerson[] | null>(null);
  const isNoPeople = useMemo(
    () => people?.length === 0 && !hasError && !isLoading,
    [people, hasError, isLoading],
  );
  const isPeople = useMemo(
    () => people?.length !== 0 && !hasError && !isLoading,
    [people, hasError, isLoading],
  );
  const { personLink = '' } = useParams();

  const findMother = useCallback((person: Person, peopleList: Person[]) => {
    return peopleList.find(human => human.name === person.motherName) || null;
  }, []);

  const findFather = useCallback((person: Person, peopleList: Person[]) => {
    return peopleList.find(human => human.name === person.fatherName) || null;
  }, []);

  const handlePeopleLoad = useCallback(async () => {
    try {
      const peopleListFromServer = await getPeople();
      const currentPeopleList = peopleListFromServer.map(person => {
        const mother = findMother(person, peopleListFromServer);
        const father = findFather(person, peopleListFromServer);

        return {
          ...person,
          father,
          mother,
        };
      });

      setIsLoading(false);
      setPeople(currentPeopleList);
    } catch {
      setHasError(true);
      setIsLoading(false);
      // throw new Error('Unable to get data from server');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    handlePeopleLoad();
  }, []);

  return (
    <>
      <PeoplePage />

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeople
            && (
              <PeopleTable
                people={people}
                personLink={personLink}
              />
            )}
        </div>
      </div>

    </>
  );
};
