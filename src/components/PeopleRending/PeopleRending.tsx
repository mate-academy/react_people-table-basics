/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import React from 'react';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
};

export const PeopleRending: React.FC<Props> = ({ people }) => {
  const { slug: slugFromURL } = useParams();

  return (
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
          } = person;

          const mother = people.find(parent => parent.name === motherName);
          const father = people.find(parent => parent.name === fatherName);

          const mom = mother
            ? (
              <PersonLink
                name={motherName}
                sex={mother.sex}
                slug={mother.slug}
              />
            )
            : motherName;

          const dad = father
            ? (
              <PersonLink
                name={fatherName}
                sex={father.sex}
                slug={father.slug}
              />
            )
            : fatherName;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': slugFromURL === slug })}
            >
              <td>
                <PersonLink
                  name={name}
                  sex={sex}
                  slug={person.slug}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? mom : '-'}</td>
              <td>{fatherName ? dad : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
