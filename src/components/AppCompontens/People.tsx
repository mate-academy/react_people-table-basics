import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person
  people: Person[]
};

export const People: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
  } = person;

  const findParents = (parentName: string | null) => {
    const parent = people.find(creator => creator.name === parentName);

    if (parent) {
      return (
        <Link
          to={`/people/${parent.slug}`}
          className={classNames({ 'has-text-danger': parent.sex === 'f' })}
        >
          {parentName}
        </Link>
      );
    }

    return parentName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParents(motherName)}</td>
      <td>{findParents(fatherName)}</td>
    </tr>
  );
};
