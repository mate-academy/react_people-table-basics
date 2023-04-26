import { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
};

export const PeopleTable: FC<Props> = ({
  people,
}) => {
  const { slug } = useParams<{ slug: string }>();

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
            className={classNames(
              { 'has-background-warning': person.slug === slug },
            )}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                person.mother
                  ? <PersonLink person={person.mother} />
                  : person.motherName || '-'
              }
            </td>
            <td>
              {
                person.father
                  ? <PersonLink person={person.father} />
                  : person.fatherName || '-'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
