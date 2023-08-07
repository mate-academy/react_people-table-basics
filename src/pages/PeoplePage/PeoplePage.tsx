import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

const getPreparedPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    return {
      ...person,
      father: people.find(p => p.name === person.fatherName),
      mother: people.find(p => p.name === person.motherName),
    };
  });
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noPeopleText, setNoPeopleText] = useState('');
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((data) => {
        if (!data.length) {
          setNoPeopleText('There are no people on the server');
        } else {
          setNoPeopleText('');
        }

        setPeople(getPreparedPeople(data));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length ? (
            <p data-cy="noPeopleMessage">
              {noPeopleText}
            </p>
          ) : (
            <PeopleTable
              people={people}
              slug={slug}
            />
          )}
        </div>
      </div>
    </>
  );
};
