import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
  person: Person
  father: Person | string
  mother: Person | string
};

export const PersonRow: React.FC<Props> = ({ person, father, mother }) => {
  return (
    <>
      <tr>
        <th>
          <Link to={`/people/${person.slug}`}>
            {person.name}
          </Link>
        </th>
        <th>{person.sex}</th>
        <th>{person.born}</th>
        <th>{person.died}</th>
        {typeof father === 'object'
          ? (
            <th>
              <Link to={`/people/${father.slug}`}>
                {father.name}
              </Link>
            </th>
          )
          : (<th>{father}</th>)}
        {typeof mother === 'object'
          ? (
            <th>
              <Link to={`/people/${mother.slug}`}>
                {mother.name}
              </Link>
            </th>
          )
          : (<th>{mother}</th>)}
      </tr>
    </>

  );
};
