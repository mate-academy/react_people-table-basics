import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const getMother = (user: Person) => {
    return user.mother
      ? (
        <Link
          to={`../${user.mother.slug}`}
          className="has-text-danger"
        >
          {user.mother.name}
        </Link>
      )
      : user.motherName;
  };

  const getFather = (user: Person) => {
    return user.father
      ? (
        <Link
          to={`../${user.father.slug}`}
        >
          {user.father.name}
        </Link>
      )
      : user.fatherName;
  };

  return (
    <>
      <td>
        <Link
          to={`../${person?.slug}`}
          className={classNames(null,
            { 'has-text-danger': person?.sex === 'f' })}
        >
          {person?.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? getMother(person) : '-'}
      </td>
      <td>
        {person.fatherName ? getFather(person) : '-'}
      </td>
    </>
  );
};
