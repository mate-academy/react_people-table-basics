import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      getPeople()
        .then(setPeople)
        .catch(() => setErrorMessage(ErrorMessage.TableLoadingError))
        .finally(() => setLoading(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, [setPeople]);

  const updatedPeople = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {ErrorMessage.TableLoadingError}
            </p>
          )}

          {!loading && !people.length && !errorMessage && (
            <p data-cy="noPeopleMessage">{ErrorMessage.TableIsEmpty}</p>
          )}

          {people.length > 0 && <PeopleTable people={updatedPeople} />}
        </div>
      </div>
    </div>
  );
};
