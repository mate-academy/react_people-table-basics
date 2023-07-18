import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  isSelected: string,
};

export const PersonInfo: React.FC<Props> = ({
  person,
  isSelected,
}) => {
  const isSelectedSlug = person.slug === isSelected;

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelectedSlug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother
          ? <PersonLink person={person.mother} />
          : person.motherName || '-'}
      </td>

      <td>
        {person.father
          ? <PersonLink person={person.father} />
          : person.fatherName || '-'}
      </td>
    </tr>
  );
};
