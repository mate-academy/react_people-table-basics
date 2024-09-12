import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

interface Props {
  person: Person;
  people: Person[];
  currentSlug: string | undefined;
}

const personExists = (name: string | null, peopleList: Person[]) => {
  return peopleList.find((candidate: Person) => candidate.name === name);
};

export const PersonRow: React.FC<Props> = ({ person, people, currentSlug }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const motherExists = personExists(motherName, people);
  const fatherExists = personExists(fatherName, people);
  const motherDisplayName = motherName || '-';
  const fatherDisplayName = fatherName || '-';
  const isHighlight = slug === currentSlug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isHighlight,
      })}
    >
      <td>
        <PersonLink name={name} sex={sex} slug={slug} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherExists ? (
          <PersonLink
            name={motherExists.name}
            sex={motherExists.sex}
            slug={motherExists.slug}
          />
        ) : (
          motherDisplayName
        )}
      </td>
      <td>
        {fatherExists ? (
          <PersonLink
            name={fatherExists.name}
            sex={fatherExists.sex}
            slug={fatherExists.slug}
          />
        ) : (
          fatherDisplayName
        )}
      </td>
    </tr>
  );
};
