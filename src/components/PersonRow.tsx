import cn from 'classnames';
// import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personSlug: string | undefined;
};

export const PersonRow:React.FC<Props> = ({ person, personSlug }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
    slug,
  } = person;

  const isPersonSelected = personSlug === slug;

  return (
    <tr
      data-cy="person"
      className={cn({
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
        {
          mother ? (
            <PersonLink person={mother} />
          ) : (
            <p>
              {motherName || '-'}
            </p>
          )
        }
      </td>
      <td>
        {
          father ? (
            <PersonLink person={father} />
          ) : (
            <p>
              {fatherName || '-'}
            </p>
          )
        }
      </td>
    </tr>
  );
};
