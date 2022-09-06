import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);

  const setParentName = (person: Person | undefined, name: string | null) => {
    if (person) {
      return <PersonLink person={person} />;
    }

    return name || '-';
  };

  useEffect(() => {
    getPeople()
      .then(res => {
        setPeople(res.map(person => {
          const result = person;

          const mother = res.find(
            parent => parent.name === person.motherName,
          );

          const father = res.find(
            parent => parent.name === person.fatherName,
          );

          if (mother) {
            result.mother = mother;
          }

          if (father) {
            result.father = father;
          }

          return result;
        }));
      });
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
                {setParentName(person.mother, person.motherName)}
              </td>
              <td>
                {setParentName(person.father, person.fatherName)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
