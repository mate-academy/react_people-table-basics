import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { peopleId } = useParams();

  const findParents = (parentName: string | null) => {
    const parents = people.find((person) => person.name === parentName);

    return parents ? <PersonLink person={parents} /> : parentName;
  };

  return (
    <>
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
          {people.map((person) => (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn('', {
                'has-background-warning': peopleId === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? findParents(person.motherName) : '-'}
              </td>
              <td>
                {person.fatherName ? findParents(person.fatherName) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
