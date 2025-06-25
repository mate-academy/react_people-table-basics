import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

interface PeopleProps {
  people: Person[];
}
export default function People({ people }: PeopleProps) {
  const { slug } = useParams();

  return (
    <>
      {people.map(person => {
        const isSelected = slug === person.slug;

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={isSelected ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        );
      })}
    </>
  );
}
