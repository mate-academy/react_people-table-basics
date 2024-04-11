import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  personMother?: Person;
  personFather?: Person;
  personSlug?: string;
};

export const Human: React.FC<Props> = ({
  person,
  personMother,
  personFather,
  personSlug,
}) => {
  const { sex, born, died, fatherName, motherName, slug } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {personMother ? (
          <PersonLink person={personMother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {personFather ? (
          <PersonLink person={personFather} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
