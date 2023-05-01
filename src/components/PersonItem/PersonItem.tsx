import React from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = React.memo(
  ({ person }) => {
    const { slug = '' } = useParams();
    const isPersonSelected = (person.slug === slug);
    const {
      sex,
      born,
      died,
      mother,
      father,
      motherName,
      fatherName,
    } = person;

    return (
      <tr
        data-cy="person"
        className={classnames({
          'has-background-warning': isPersonSelected,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>

        <td>
          {mother
            ? <PersonLink person={mother} />
            : motherName || '-'}
        </td>
        <td>
          {father
            ? <PersonLink person={father} />
            : fatherName || '-'}
        </td>
      </tr>
    );
  },
);
