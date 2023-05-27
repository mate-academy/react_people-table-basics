import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  selectedPersonSlug: string;
};

export const PersonCell: React.FC<Props> = ({ person, selectedPersonSlug }) => {
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames(
        { 'has-background-warning': person.slug === selectedPersonSlug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          person.mother
            ? (<PersonLink person={person.mother} />)
            : (person.motherName || '-')
        }
      </td>
      <td>
        {
          person.father
            ? (<PersonLink person={person.father} />)
            : (person.fatherName || '-')
        }
      </td>
    </tr>
  );
};
