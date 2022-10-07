import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';

import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonDetails: React.FC<Props> = ({
  person,
  people,
}) => {
  const { slug = '' } = useParams();

  const findPerson = (list: Person[], targetName: string) => {
    return list.find(pers => pers.name === targetName) || null;
  };

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {person.motherName ? (
          <PersonLink
            person={
              findPerson([...people], person.motherName)
            }
            parentName={person.motherName}
          />
        ) : (
          '-'
        )}
      </td>

      <td>
        {person.fatherName ? (
          <PersonLink
            person={
              findPerson([...people], person.fatherName)
            }
            parentName={person.fatherName}
          />
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
