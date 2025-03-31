import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  person: Person;
};

const PersonItem: React.FC<Props> = ({ person }) => {
  const { sex, born, died, slug, mother, father } = person;
  const { personName } = useParams();
  const isSelected = personName && personName === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (
          <PersonLink person={mother} className="has-text-danger" />
        ) : (
          '-'
        )}
      </td>

      <td>{father ? <PersonLink person={father} /> : '-'}</td>
    </tr>
  );
};

export default PersonItem;
