import React from 'react';
import cn from 'classnames';

import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getPersonLink = (
    person: Person | undefined,
    parent?: string | null,
  ) => {
    return person
      ? (<PersonLink person={person} />)
      : parent || '-';
  };

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
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;
          const findMother = people.find(per => per.name === motherName);
          const findFather = people.find(per => per.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({ 'has-background-warning': slug === personSlug })}
            >
              <td>
                {getPersonLink(person)}
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {getPersonLink(findMother, motherName)}
              </td>

              <td>
                {getPersonLink(findFather, fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
