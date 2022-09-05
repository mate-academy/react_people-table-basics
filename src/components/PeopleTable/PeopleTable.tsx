import classnames from 'classnames';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
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
        {people.map(person => (
          <tr
            data-cy="person"
            className={
              classnames({ 'has-background-warning': person.slug === slug })
            }
            key={person.slug}
          >
            <td>
              <PersonLink
                name={person.name}
                people={people}
              />
            </td>

            <td>{person.sex || '-'}</td>
            <td>{person.born || '-'}</td>
            <td>{person.died || '-'}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  name={person.motherName}
                  people={people}
                />
              ) : (
                <>
                  -
                </>
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  name={person.fatherName}
                  people={people}
                />
              ) : (
                <>
                  -
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
