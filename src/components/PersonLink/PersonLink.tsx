import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FEMALE_VALUE } from '../../helpers/constants';

type Props = {
  slug: string,
  sex: string,
  title: string,
};

export const PersonLink: FC<Props> = ({ slug, sex, title }) => (
  <Link
    className={classNames({
      'has-text-danger': sex === FEMALE_VALUE,
    })}
    to={`/people/${slug}`}
  >
    {title}
  </Link>
);
