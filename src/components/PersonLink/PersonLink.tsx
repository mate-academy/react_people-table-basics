import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Person } from '../../types';

interface Props {
  person: Person;
  handleScroll: (ref: HTMLTableRowElement) => void;
  myRef: React.RefObject<HTMLTableRowElement>;
}

export const PersonLink: React.FC<Props> = (
  { person, handleScroll, myRef },
) => {
  const {
    slug,
    sex,
    name,
  } = person;

  return (
    <Link
      to={`/people/${slug}`}
      onClick={() => {
        if (myRef.current) {
          handleScroll(myRef.current);
        }
      }}
      className={classNames(
        {
          'has-text-danger': sex === 'f',
        },
      )}
    >
      {name}
    </Link>
  );
};
