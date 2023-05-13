import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

export const SinglePerson: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  const location = useLocation();

  const getParentLinkOrDash = (
    parentName: string | null,
    parentType?: Person,
  ) => (
    parentType ? (
      <PersonLink
        person={parentType}
      />
    ) : (
      parentName || '-'
    )
  );

  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': `/people/${slug}` === location.pathname })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>{getParentLinkOrDash(motherName, mother)}</td>
      <td>{getParentLinkOrDash(fatherName, father)}</td>
    </tr>
  );
};
