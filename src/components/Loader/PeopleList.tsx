import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';
import { NO_PARENT } from '../../utils/constants';

type Props = {
  person: Person,
  peopleSlug: string | undefined,
};

export const PeopleList: React.FC<Props> = ({ person, peopleSlug }) => {
  const {
    slug, sex, born, died, motherName, fatherName, mother, father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': peopleSlug === slug,
      })}
    >
      <td><PersonLink person={person} /></td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || NO_PARENT
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || NO_PARENT
        )}
      </td>
    </tr>
  );
};
