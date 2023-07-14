import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isDataUploaded, setIsDataUploaded] = useState(false);

  useEffect(() => {
    getPeople()
      .then(uploadedPeople => {
        setPeople(uploadedPeople);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsDataUploaded(true);
      });
  }, []);

  const findMotherSlug = useCallback((child: Person): string | null => {
    const mother = people.find(person => person.name === child.motherName);

    if (mother) {
      return mother.slug;
    }

    return null;
  }, [people]);

  const findFatherSlug = useCallback((child: Person): string | null => {
    const father = people.find(person => person.name === child.fatherName);

    if (father) {
      return father.slug;
    }

    return null;
  }, [people]);
  const { personSlug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isDataUploaded && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isError && isDataUploaded && people.length === 0 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable
              people={people}
              findMotherSlug={findMotherSlug}
              findFatherSlug={findFatherSlug}
              selectedPerson={personSlug}
            />
          )}
        </div>
      </div>
    </>
  );
};
