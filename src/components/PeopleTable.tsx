import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

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
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <PersonLink
                slug={person.slug}
                name={person.name}
                isWoman={person.sex === 'f'}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink
                  slug={
                    people.find(p => p.name === person.motherName)?.slug ?? ''
                  }
                  name={person.motherName}
                  isWoman={true}
                />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink
                  slug={
                    people.find(p => p.name === person.fatherName)?.slug ?? ''
                  }
                  name={person.fatherName}
                  isWoman={false}
                />
              ) : (
                person.fatherName ?? '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
