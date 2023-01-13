import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonalLink } from '../PersonalLink/PersonalLink';

type Props = {
  person: Person,
  people: Person[],
};

export const PersonalInfo: React.FC<Props> = ({ person, people }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  const parent = (parentName: string | null) => people
    .find(personItem => personItem.name === parentName);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <PersonalLink person={person} />
      </td>
      <td>
        {sex}
      </td>
      <td>
        {born}
      </td>
      <td>
        {died}
      </td>
      <td>
        {!motherName
          ? '-'
          : (<PersonalLink person={parent(motherName) || motherName} />)}
      </td>
      <td>
        {!fatherName
          ? '-'
          : (<PersonalLink person={parent(fatherName) || fatherName} />)}
      </td>
    </tr>
  );
};
