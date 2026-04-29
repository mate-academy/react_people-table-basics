import { Loader } from '../../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { personSlug } = useParams();

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    getPeople()
      .then(fetchedPeople => {
        const peopleByName: { [key: string]: Person } = {};

        fetchedPeople.forEach(person => {
          peopleByName[person.name] = person;
        });

        const processedPeople = fetchedPeople.map(person => ({
          ...person,
          mother: person.motherName
            ? peopleByName[person.motherName]
            : undefined,
          father: person.fatherName
            ? peopleByName[person.fatherName]
            : undefined,
        }));

        setPeople(processedPeople);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && !isLoading && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!hasError && !isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && people.length > 0 && (
            <PeopleTable people={people} slug={personSlug} />
          )}
        </div>
      </div>
    </>
  );
};
