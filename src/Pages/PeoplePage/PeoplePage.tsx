import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getParent } from '../../utils/getParent';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const visiblePeople = people.map(person => {
    const mother = person.motherName
      ? getParent(person.motherName, people) : undefined;
    const father = person.fatherName
      ? getParent(person.fatherName, people) : undefined;

    return {
      ...person,
      mother,
      father,
    };
  });

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!people.length && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && (
            <PeopleTable
              people={visiblePeople}
            />
          )}
        </div>
      </div>
    </>
  );
};
