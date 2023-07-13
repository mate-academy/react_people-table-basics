import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

const MISSING_VALUE_SIGN = '-';

interface Props {
  person: Person;
}
export const PersonInfo: FC<Props> = ({ person }) => {
  const { slug } = useParams<{ slug: string }>();
  const {
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tbody>
      <tr
        data-cy="person"
        className={cn({ 'has-background-warning': person.slug === slug })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>
          {mother ? (
            <PersonLink person={mother} />
          ) : (
            motherName || MISSING_VALUE_SIGN
          )}
        </td>

        <td>
          {father ? (
            <PersonLink person={father} />
          ) : (
            fatherName || MISSING_VALUE_SIGN
          )}
        </td>
      </tr>
    </tbody>
  );
};
