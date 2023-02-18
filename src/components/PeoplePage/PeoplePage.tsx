import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const match = useMatch('/people/:personSlug');
  const selectedPersonSlug = match?.params.personSlug;

  const getParent = (name: string | null, peopleData: Person[]) => (
    peopleData.find(parent => parent.name === name));

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((result) => {
        setIsLoading(false);
        setPeople(result.map(person => ({
          ...person,
          mother: getParent(person.motherName, result),
          father: getParent(person.fatherName, result),
        })));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const noDataError = !isLoading && people.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noDataError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading ? (
            <PeopleTable
              peopleData={people}
              personSlug={selectedPersonSlug}
            />
          ) : (<Loader />)}
        </div>
      </div>
    </>
  );
};
