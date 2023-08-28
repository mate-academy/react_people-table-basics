import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personLink } = useParams();

  const findParent = (parent: string | null) => {
    const parentSelected = people.find(human => human.name === parent);

    if (parentSelected) {
      return (
        <Link
          to={`/people/${parentSelected.slug}`}
          className={cn({
            'has-text-danger': parentSelected.sex === 'f',
          })}
        >
          {parentSelected.name}
        </Link>
      );
    }

    return parent || '-';
  };

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': personLink === person.slug,
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
      <td>{findParent(person.motherName)}</td>
      <td>{findParent(person.fatherName)}</td>
    </tr>
  );
};
