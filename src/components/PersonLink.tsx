import React from 'react';
import { PersonLinkProps } from '../types/PersonLinkProps';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const PersonLink: React.FC<PersonLinkProps> = ({
  personName,
  peopleMap,
  // onClick,
  // sex,
}) => {
  // if (!personName) {
  //   return <>-</>;
  // }

  if (!personName || !peopleMap.has(personName)) {
    return <>{personName || '-'}</>;
  }

  const person = peopleMap.get(personName);

  if (!person) {
    return <>{personName || 'Unknown'}</>;
  }

  // const handleClick = (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   const base = window.location.href.split('#')[0];
  //   const newUrl = `${base}#/people/${person.slug}`;

  //   window.history.pushState(null, '', newUrl);

  //   if (onClick) {
  //     onClick(person.slug);
  //   }
  // };

  // const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link
      to={`/people/${person.slug}`}
      // onClick={handleClick}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      data-cy="personLink"
    >
      {personName}
    </Link>
  );
};

export default PersonLink;
