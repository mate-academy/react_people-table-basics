import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonRow: React.FC<Props> = (props) => {
  const {
    person,
  } = props;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === person.slug },
      )}
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? <PersonLink person={person.mother} />
          : person.motherName || '-'}
      </td>
      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
