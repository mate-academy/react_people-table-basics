import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  peopleList: Person[];
};

export const PersonRow: React.FC<Props> = ({ person, peopleList }) => {
  const { personName } = useParams();

  const currentSlug = `${person.name} ${person.born ?? ''}`
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
  const isActive = personName === currentSlug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActive })}
    >
      <td>
        <PersonLink name={person.name} peopleList={peopleList} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          <PersonLink name={person.motherName} peopleList={peopleList} />
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          <PersonLink name={person.fatherName} peopleList={peopleList} />
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
