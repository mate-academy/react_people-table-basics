import React from 'react';
import { Person as PersonType } from '../../types';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: PersonType;
};

export const Person: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const { sex, born, died, fatherName, motherName, mother, father } = person;
  const EMPTY_VALUE = '-';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? <PersonLink person={mother} /> : motherName || EMPTY_VALUE}
      </td>

      <td>
        {father ? <PersonLink person={father} /> : fatherName || EMPTY_VALUE}
      </td>
    </tr>
  );
};
