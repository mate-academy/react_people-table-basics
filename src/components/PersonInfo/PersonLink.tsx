import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  slug: string,
  text: string,
  sex: 'f' | 'm',
};

export const PersonLink: FC<Props> = ({ slug, text, sex }) => (
  <Link
    to={`/people/${slug}`}
    className={classNames(
      {
        'has-text-danger': sex === 'f',
      },
    )}
  >
    {text}
  </Link>
);
