import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person?: Person | null,
}

export const PersonLink: FC<Props> = ({ person }) => {
  let name = '-';
  let slug = '';
  let sex = '';

  if (person) {
    [name, slug, sex] = [person.name, person.slug, person.sex];
  }

  const isWoman = sex === 'f';

  return (
    <Link className={cn({ 'has-text-danger': isWoman })} to={`/people/${slug}`}>
      {name}
    </Link>
  );
};
