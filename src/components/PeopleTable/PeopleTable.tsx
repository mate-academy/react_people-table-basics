import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function getContent(
    person: Person | null | undefined,
    personName: string | null,
  ) {
    if (person) {
      return <PersonLink person={person} />;
    }

    return personName ? personName : '-';
  }

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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getContent(person.mother, person.motherName)}</td>
            <td>{getContent(person.father, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
