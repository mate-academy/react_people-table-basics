import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slugParam } = useParams();
  const { name, sex, born, died, slug, motherName, fatherName } = person;

  const findParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(man => man.name === parentName);

    return parent ? (
      <Link
        to={`/people/${parent.slug}`}
        className={classNames('', {
          'has-text-danger': parent.sex === 'f',
        })}
      >
        {parent.name}
      </Link>
    ) : (
      parentName
    );
  };

  const mother = findParent(motherName);
  const father = findParent(fatherName);

  return (
    <tr
      data-cy="person"
      className={person.slug === slugParam ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          className={classNames('', {
            'has-text-danger': sex === 'f',
          })}
          to={`/people/${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother}</td>
      <td>{father}</td>
    </tr>
  );
};
