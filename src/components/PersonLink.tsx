import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | undefined
  // eslint-disable-next-line max-len
  setSelectedPersonSlug: React.Dispatch<React.SetStateAction<string | undefined>>,
};

export const PersonLink: FC<Props> = (props) => {
  const { person,
    setSelectedPersonSlug,
  } = props;

  return (
    <NavLink
      onClick={(event) => {
        event.preventDefault();
        setSelectedPersonSlug(person?.slug);
      }}
      className={() => classNames(
        { 'has-text-danger': person?.sex === 'f' },
      )}
      to={`../people/${person?.slug}`}
    >
      {person?.name}
    </NavLink>
  );
};
