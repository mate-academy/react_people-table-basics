import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[];
  person: Person;
  selectedSlug: string;
};

export const PersonItem: React.FC<Props> = (props) => {
  const { people, person, selectedSlug } = props;

  const isSelected = (onePerson: Person) => (
    onePerson.slug === selectedSlug
  );

  person.mother = useMemo(() => people.find(one => (
    person.motherName === one.name
  )), [person, people]);

  person.father = useMemo(() => people.find(one => (
    person.fatherName === one.name
  )), [person, people]);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected(person),
      })}
    >
      <td>
        <PersonLink human={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? <PersonLink human={person.mother} />
          : (person.motherName || '-')}
      </td>
      <td>
        {person.father
          ? <PersonLink human={person.father} />
          : (person.fatherName || '-')}
      </td>
    </tr>
  );
};
