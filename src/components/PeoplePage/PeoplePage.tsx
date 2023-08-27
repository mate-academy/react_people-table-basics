import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PersonLink } from '../PersonLink/PersonLink';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const handleGetPeople = async () => {
      try {
        const res = await getPeople();

        setPeople(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetPeople();
  }, []);

  const findParent = useCallback((parentName: string) => {
    const parent = people.find(person => person.name === parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <PersonLink person={parent} />
    );
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <PeopleTable people={people} findParent={findParent} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
