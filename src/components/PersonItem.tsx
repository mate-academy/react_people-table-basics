import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person,
  people: Person[],
}

export const PersonItem: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  const { slug: selectedSlug } = useParams();
  const mother = useMemo(() => {
    return people.find(pers => motherName === pers.name);
  }, []);

  const father = useMemo(() => {
    return people.find(pers => fatherName === pers.name);
  }, []);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': selectedSlug === slug },
      )}
    >

      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          )
          : motherName || '-'}
      </td>

      <td>
        {father
          ? (
            <PersonLink person={father} />
          )
          : fatherName || '-'}
      </td>

    </tr>
  );
};
