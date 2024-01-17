/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';

const getPersonString = (name: string, born: number) => {
  return `${name.toLocaleLowerCase().replaceAll(' ', '-')}-${born}`;
};

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoader(false));
  }, []);

  const { personName } = useParams();

  return (
    <div className="box table-container">
      {loader ? <Loader /> : null}
      {hasError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : null}

      {
        people.length === 0 && !loader
          ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : null
      }

      {
        people.length > 0 ? (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Born</th>
                <th>Died</th>
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonLink
                  person={person}
                  className={classNames({ 'has-background-warning': personName === getPersonString(person.name, person.born) })}
                  motherBirth={people.find(mother => mother.name === person.motherName)?.born || null}
                  fatherBirth={people.find(father => father.name === person.fatherName)?.born || null}
                />
              ))}
            </tbody>
          </table>
        ) : null
      }
    </div>
  );
};
