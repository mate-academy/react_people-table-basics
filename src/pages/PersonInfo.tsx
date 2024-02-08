import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../components/Loader/PersonLink';
import { ParentLink } from '../components/Loader/ParentLink';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug: slugCurrent,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={slugCurrent}
      className={classNames(
        { 'has-background-warning': slug === slugCurrent },
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <td>
        <PersonLink
          name={name}
          slugCurrent={slugCurrent}
          sex={sex}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          && motherName
          ? <ParentLink parent={mother} />
          : motherName || '-'}
      </td>
      <td>
        {father
          && fatherName
          ? <ParentLink parent={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};
