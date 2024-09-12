import classNames from 'classnames';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import { Gender } from '../types/gender';

type Props = {
  person: Person;
};

export const PersonLink: FC<Props> = ({ person }) => {
  const { search } = useLocation();

  const { slug, name, sex } = person;

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === Gender.Female,
      })}
    >
      {name} {}
    </Link>
  );
};
