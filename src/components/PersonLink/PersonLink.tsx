import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

export const PersonLink: React.FC<{ person?: Person }> = ({ person }) => {
  if (!person) {
    return null;
  }

  const sexClass =
    person.sex === 'f' ? 'person-link--female' : 'person-link--male';
  const bulmaClass =
    person.sex === 'f' ? 'has-text-danger' : 'has-text-primary';

  return (
    <Link
      className={`${sexClass} ${bulmaClass}`}
      to={`/people/${person.slug}`}
      data-cy={`person-link-${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;
