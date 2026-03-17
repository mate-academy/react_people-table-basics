import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
  peopleByName: Map<string, Person>;
};

export const PersonLink = ({ person, peopleByName }: Props) => {
  const { slug } = useParams();

  const mother = peopleByName.get(person.motherName as string);
  const father = peopleByName.get(person.fatherName as string);

  return (
    <>
      <tr
        data-cy="person"
        key={person.name}
        className={cn(slug === person.slug ? 'has-background-warning' : '')}
      >
        <td>
          <Link
            to={`${person.slug}`}
            className={cn(person.sex === 'f' ? 'has-text-danger' : '')}
          >
            {person.name}
          </Link>
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>
          {mother ? (
            <Link
              to={`${mother.slug}`}
              className={cn(mother.sex === 'f' ? 'has-text-danger' : '')}
            >
              {mother.name}
            </Link>
          ) : (
            person.motherName || '-'
          )}
        </td>
        <td>
          {father ? (
            <Link
              to={`${father.slug}`}
              className={cn(father.sex === 'f' ? 'has-text-danger' : '')}
            >
              {father.name}
            </Link>
          ) : (
            person.fatherName || '-'
          )}
        </td>
      </tr>
    </>
  );
};
