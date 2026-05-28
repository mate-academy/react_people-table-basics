import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

const renderParent = (parentName: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  if (parentName) {
    return parentName;
  }

  return '-';
};

interface Props {
  person: Person;
  selectedSlug?: Person['slug'];
}

export const PeopleTableRow = ({ person, selectedSlug }: Props) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParent(person.motherName, person.mother)}</td>
      <td>{renderParent(person.fatherName, person.father)}</td>
    </tr>
  );
};
