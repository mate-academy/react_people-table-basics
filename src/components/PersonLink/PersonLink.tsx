import classnames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  sex: string;
  slug: string;
  name: string;
}

export const PersonLink: FC<Props> = ({ sex, slug, name }) => {
  const isWoman = sex === 'f';

  return (
    <Link
      className={classnames({ 'has-text-danger': isWoman })}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};
