import { Person } from '../../types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type PersonLinkProps = {
  person: Person;
  lookup: (name: string) => Person;
};

const PersonLink = ({ person, lookup }: PersonLinkProps) => {
  const { slug } = useParams();
  const selected = slug === person.slug;

  const mother = lookup(person.motherName || '');
  const father = lookup(person.fatherName || '');

  const nameLink = (human: Person) => (
    <Link
      to={`/people/${human.slug}`}
      className={cn({ 'has-text-danger': human.sex === 'f' })}
    >
      {human.name}
    </Link>
  );

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selected,
      })}
    >
      <td>{nameLink(person)}</td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName
          ? mother
            ? nameLink(mother)
            : person.motherName
          : '-'}
      </td>
      <td>
        {person.fatherName
          ? father
            ? nameLink(father)
            : person.fatherName
          : '-'}
      </td>
    </tr>
  );
};

export default PersonLink;
