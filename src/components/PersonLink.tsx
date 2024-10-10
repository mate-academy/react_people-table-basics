// import { Person } from '../types/Person';
// import { Link } from 'react-router-dom';
// import classNames from 'classnames';

// interface PersonLinkProps {
//   person: Person | null;
//   className?: string;
// }

// export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {

//   const className = person?.sex === 'f' ? "has-text-danger" : '';


//   return (
//     <Link to={`/people/${person?.slug}`} className={classNames(className)} >
//       {person?.name}
//     </Link>
//   )
// };


// src/components/PersonLink.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person;
  selectedPersonSlug?: string;
  mother?: Person | null;
  father?: Person | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  selectedPersonSlug,
  mother,
  father,
}) => {
  return (
    <tr
      data-cy="person"
      className={selectedPersonSlug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link className={person.sex === 'f' ? 'has-text-danger' : ''} to={`/people/${person.slug}`}>
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link className={'has-text-danger'} to={`/people/${mother.slug}`}>
            {person.motherName}
          </Link>
        ) : (
          <p>{person.motherName || '-'}</p>
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
        ) : (
          <p>{person.fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};

