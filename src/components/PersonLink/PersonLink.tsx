import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  handlePersonClick: (slug: string) => void;
}

export const PersonLink: FC<Props> = ({
  person,
  handlePersonClick,
}) => {
  const {
    name,
    sex,
    slug,
  } = person;

  return (
    <Link
      className={
        cn({ 'has-text-danger': sex === 'f' })
      }
      to={`/people/${slug}`}
      onClick={() => handlePersonClick(slug)}
    >
      {name}
    </Link>
  );
};
