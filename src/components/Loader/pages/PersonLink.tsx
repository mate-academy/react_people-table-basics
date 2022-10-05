import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleClick = (): void => {
    setIsClick(!isClick);
  };

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({
        'has-text-danger': person.sex === 'f',
        'has-background-warning': isClick,
      })}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  );
};
