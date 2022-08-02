import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(({
        name, sex, born, died, motherName, fatherName, slug, mother, father,
      }) => (
        <tr key={slug} id={`${slug}`}>
          <td>{name}</td>
          <td>{sex}</td>
          <td>{born}</td>
          <td>{died}</td>
          <td>
            {mother
              ? (<HashLink to={`#${mother.slug}`}>{motherName}</HashLink>)
              : (motherName)}
          </td>
          <td>
            {father
              ? (<HashLink to={`#${father.slug}`}>{fatherName}</HashLink>)
              : (fatherName)}
          </td>
        </tr>
      ))}
    </>
  );
};
