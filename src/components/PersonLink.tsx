import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SEX_FEMALE } from '../utils/constants';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, sex, name } = person;

  return (
    <>
      <Link
        to={`../${slug}`}
        className={classNames({
          'has-text-danger': sex === SEX_FEMALE,
        })}
      >
        {name}
      </Link>
    </>
  );
};
