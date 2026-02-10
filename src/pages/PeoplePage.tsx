import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTablet';
import { ErrorTypes, Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setErrorMessage(ErrorTypes.none);
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(ErrorTypes.peopleLoadingError))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const peopleList: Person[] = useMemo(() => {
    function getPersonMother(motherName: string | null) {
      if (!motherName) {
        return undefined;
      }

      return people.find(person => person.name === motherName);
    }

    function getPersonFather(fatherName: string | null) {
      if (!fatherName) {
        return undefined;
      }

      return people.find(person => person.name === fatherName);
    }

    return people.map(person => ({
      ...person,
      mother: getPersonMother(person.motherName),
      father: getPersonFather(person.fatherName),
    }));
  }, [people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorTypes.peopleLoadingError}
            </p>
          )}

          {!loading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">{ErrorTypes.noPeopleMessage}</p>
          )}

          {!loading && Boolean(people.length) && (
            <PeopleTable people={peopleList} />
          )}
        </div>
      </div>
    </>
  );
};
