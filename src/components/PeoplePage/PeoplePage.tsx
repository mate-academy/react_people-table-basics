import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(true);
  const [hasError, setHasEror] = useState(false);
  const [peopleError, setPeopleError] = useState(false);
  const { personSlug } = useParams();

  useEffect(() => {
    getPeople().then(res => {
      setPersons(res);
      setIsLoader(false);
    })
      .catch(() => {
        setHasEror(true);
        setIsLoader(false);
      })
      .finally(() => {
        if (!hasError && persons.length < 0) {
          setPeopleError(true);
          setIsLoader(false);
        }
      });
  });

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

          {peopleError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoader && <Loader />}

          {(!peopleError && persons.length === 0)
            && <PeopleTable persons={persons} selectedSlug={personSlug} />}
        </div>
      </div>
    </>
  );
};
