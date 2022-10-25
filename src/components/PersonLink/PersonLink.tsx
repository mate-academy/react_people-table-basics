import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person | null;
  personParent?: string;
};

export const PersonLink: React.FC<Props> = ({ person, personParent }) => (
  <>
    {person ? (
      <Link
        to={`../${person.slug}`}
        className={classNames(
          { 'has-text-danger': person.sex === 'f' },
        )}
      >
        {person.name}
      </Link>
    ) : (
      `${personParent}`
    )}
  </>
);
