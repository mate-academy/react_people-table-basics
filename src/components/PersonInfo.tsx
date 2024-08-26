import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  findPersonByName: (name: string) => Person | undefined;
};

const NO_INFO = '-';
const FEMALE = 'f';

const getLinkClass = (personForClass: Person | undefined) => {
  if (personForClass) {
    return classNames({
      'has-text-danger': personForClass.sex === FEMALE,
    });
  }

  return;
};

export const PersonInfo: React.FC<Props> = ({ person, findPersonByName }) => {
  const { personSlug } = useParams<{ personSlug: string }>();

  const getSelectedPersonClass = () => {
    return classNames({
      'has-background-warning': person.slug === personSlug,
    });
  };

  return (
    <tr data-cy="person" key={person.slug} className={getSelectedPersonClass()}>
      <td>
        <Link className={getLinkClass(person)} to={`${person.slug}`}>
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.motherName && findPersonByName(person.motherName) ? (
          <Link
            to={`${findPersonByName(person.motherName)?.slug}`}
            className={getLinkClass(findPersonByName(person.motherName))}
          >
            {person.motherName}
          </Link>
        ) : (
          <span>{person.motherName || NO_INFO}</span>
        )}
      </td>

      <td>
        {person.fatherName && findPersonByName(person.fatherName) ? (
          <Link
            to={`${findPersonByName(person.fatherName)?.slug}`}
            className={getLinkClass(findPersonByName(person.fatherName))}
          >
            {person.fatherName}
          </Link>
        ) : (
          <span>{person.fatherName || NO_INFO}</span>
        )}
      </td>
    </tr>
  );
};
