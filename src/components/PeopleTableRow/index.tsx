import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';

const FEMALE = 'f';
const NO_NAME = '-';

type Props = {
  person: Person;
  father: Person | undefined;
  mother: Person | undefined;
};

export const PeopleTableRow: React.FC<Props> = ({ person, father, mother }) => {
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const { personInfo } = useParams();

  return (
    <tr
      key={slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': personInfo === slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === FEMALE,
          })}
          to={`${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {!mother ? (
          motherName || NO_NAME
        ) : (
          <Link className="has-text-danger" to={`${mother.slug}`}>
            {motherName}
          </Link>
        )}
      </td>
      <td>
        {!father ? (
          fatherName || NO_NAME
        ) : (
          <Link to={`${father.slug}`}>{fatherName}</Link>
        )}
      </td>
    </tr>
  );
};
