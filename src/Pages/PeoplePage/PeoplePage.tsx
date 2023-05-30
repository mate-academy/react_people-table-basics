import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const findPerson = useCallback((name: string, fetchedPeople: Person[]) => {
    return fetchedPeople.find(person => person.name === name);
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      if (hasError) {
        setHasError(false);
      }

      setIsLoading(true);

      try {
        const fetchedPeople = await getPeople();

        const peopleWithParents = fetchedPeople.map(person => {
          return {
            ...person,
            mother: person.motherName
              ? findPerson(person.motherName, fetchedPeople)
              : null,
            father: person.fatherName
              ? findPerson(person.fatherName, fetchedPeople)
              : null,
          };
        });

        setPeople(peopleWithParents);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const { slug } = useParams();
  const shouldShowNoPeopleMessage = !hasError && !isLoading && !people.length;

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

          {shouldShowNoPeopleMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} slug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
