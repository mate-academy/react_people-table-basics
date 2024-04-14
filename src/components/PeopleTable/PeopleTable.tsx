import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

const PeopleTable: React.FC<Props> = ({ people }) => {
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
          const { sex, born, died, motherName, fatherName, mother, father } =
            person;
          const selected = slug === person.slug;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': selected })}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  <span>{motherName || '-'}</span>
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  <span>{fatherName || '-'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;
