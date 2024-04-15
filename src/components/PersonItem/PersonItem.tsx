import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};
export const PersonItem: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const { sex, born, died, fatherName, motherName, mother, father } = person;
  const noParents = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          <>
            {!!mother && <PersonLink person={mother} />}

            {!mother && <span>{motherName}</span>}
          </>
        ) : (
          noParents
        )}
      </td>
      <td>
        {fatherName ? (
          <>
            {!!father && <PersonLink person={father} />}

            {!father && <span>{fatherName}</span>}
          </>
        ) : (
          noParents
        )}
      </td>
    </tr>
  );
};
