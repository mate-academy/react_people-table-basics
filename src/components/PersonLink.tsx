import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person,
  people: Person[],
}

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const {
    name,
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
        <a
          href={`#/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <a
              href={`#/people/${mother.slug}`}
              className="has-text-danger"
            >
              {motherName }
            </a>
          )
          : motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <a
              href={`#/people/${father.slug}`}
              className="has-text-link"
            >
              {fatherName }
            </a>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
