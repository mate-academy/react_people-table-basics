import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const { slug } = useParams();

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
          const personFatherName = person.fatherName || '-';
          const personMotherName = person.motherName || '-';

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {person.mother
                  ? (
                    <PersonLink person={person.mother} />
                  )
                  : <p>{personMotherName}</p>}
              </td>

              <td>
                {person.father
                  ? (
                    <PersonLink person={person.father} />
                  )
                  : <p>{personFatherName}</p>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
