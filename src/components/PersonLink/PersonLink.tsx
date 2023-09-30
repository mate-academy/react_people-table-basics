import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person;
};

const FEMALE_SEX = 'f';

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sex, name, slug } = person;

  return (
    <td>
      <Link
        to={`/people/${slug}`}
        className={classNames({
          'has-text-danger': sex === FEMALE_SEX,
        })}
      >
        {name}
      </Link>
    </td>
  );
};
