import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';
import { PersonType } from '../../types';

interface Props {
  people: PersonType[];
  person: PersonType;
}

export const Person: FC<Props> = ({ people, person: personData }) => {
  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name) || null;
  };

  const { sex, born, died, motherName, fatherName, slug } = personData;

  const isFatherName = fatherName || '-';
  const isMotherName = motherName || '-';

  const mother = findPersonByName(isMotherName);
  const father = findPersonByName(isFatherName);

  const actualSlug = useParams<{ slug: string }>().slug;

  const getPersonClassNames = (slugParam: string) =>
    classNames({
      'has-background-warning': slugParam === actualSlug,
    });

  return (
    <tr key={slug} data-cy="person" className={getPersonClassNames(slug)}>
      <td>
        <PersonLink person={personData} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died || '-'}</td>
      <td>{mother ? <PersonLink person={mother} /> : isMotherName}</td>
      <td>{father ? <PersonLink person={father} /> : isFatherName}</td>
    </tr>
  );
};
