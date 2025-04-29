import { Link } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';
// import classNames from 'classnames';

type PersonLinkProps = {
  person: Person;
  // setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  // setSelected,
}) => {
  const { name, sex, slug } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
      // onClick={() => setSelected(slug)}
    >
      {name}
    </Link>
  );
};
