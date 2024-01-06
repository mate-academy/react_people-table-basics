import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable = ({ people }: Props) => {
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
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person}>
                {person.name}
              </PersonLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? (
                  <PersonLink person={person.mother}>
                    {person.motherName}
                  </PersonLink>
                )
                : (person.motherName || '-')}
            </td>

            <td>
              {person.father
                ? (
                  <PersonLink person={person.father}>
                    {person.fatherName}
                  </PersonLink>
                )
                : (person.fatherName || '-')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
