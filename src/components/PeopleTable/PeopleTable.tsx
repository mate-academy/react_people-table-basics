import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { Table } from '../Table';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const setParent = useCallback((arrayOfPeople: Person[]): Person[] => {
    return arrayOfPeople.map(person => {
      const mother = arrayOfPeople.find(p => p.name === person.motherName);
      const father = arrayOfPeople.find(p => p.name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });
  }, []);

  const preparedPeople = useMemo(() => {
    return setParent(people);
  }, [people, setParent]);

  return (
    <div className="box table-container">
      {loading && <Loader />}

      {!loading && people.length > 0 && <Table people={preparedPeople} />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {!errorMessage && !loading && people.length === 0 && (
        <p data-cy="noPeopleMessage">{errorMessage}</p>
      )}
    </div>
  );
};
