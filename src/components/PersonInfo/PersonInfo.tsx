import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
}

const NOT_SET_VALUE = '-';

export const PersonInfo: FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    slug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;
  const isSelected = slug === personSlug;

  return (
    <tbody>
      <tr
        data-cy="person"
        key={person.slug}
        className={cn({ 'has-background-warning': isSelected })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother
            ? (<PersonLink person={mother} />)
            : (motherName || NOT_SET_VALUE)}
        </td>

        <td>
          {father
            ? (<PersonLink person={father} />)
            : (fatherName || NOT_SET_VALUE)}
        </td>
      </tr>
    </tbody>
  );
};
