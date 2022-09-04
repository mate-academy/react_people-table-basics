import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);

  const getParent = (name: string) => (
    people.find(person => person.name === name)
  );

  useEffect(() => {
    getPeople()
      .then((response) => setPeople(response));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
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
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {
                  person.motherName
                  && getParent(person.motherName) !== undefined
                    ? (
                      <PersonLink person={getParent(person.motherName)} />
                    )
                    : (person.motherName)
                }
              </td>
              <td>
                {
                  person.fatherName
                  && getParent(person.fatherName) !== undefined
                    ? (
                      <PersonLink person={getParent(person.fatherName)} />
                    )
                    : (person.fatherName)
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
