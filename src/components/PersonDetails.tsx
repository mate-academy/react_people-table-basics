import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  isSelected: (person: Person) => boolean;
  people: Person[];
};

export const PersonDetails: FC<Props> = ({ person, isSelected, people }) => {
  const {
    motherName,
    fatherName,
    sex,
    born,
    died,
  } = person;
  const motherFound = people.find(p => p.name === motherName);
  const motherNameCell = motherName || '-';
  const fatherFound = people.find(p => p.name === fatherName);
  const fatherNameCell = fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected(person) })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        { motherFound
          ? <PersonLink person={motherFound} />
          : motherNameCell}
      </td>
      <td>
        {fatherFound
          ? <PersonLink person={fatherFound} />
          : fatherNameCell}
      </td>
    </tr>
  );
};
