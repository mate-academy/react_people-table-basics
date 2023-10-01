import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { columnsNames } from '../utils/Constans';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => (
        setIsLoading(false)
      ));
  }, []);

  const peopleWithParents = people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    return { ...person, mother, father };
  });

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {columnsNames.map(columnName => <th>{columnName}</th>)}
              </tr>
            </thead>

            <tbody>
              {peopleWithParents.map(person => (
                <PersonLink
                  person={person}
                  selectedPersonSlug={slug}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
