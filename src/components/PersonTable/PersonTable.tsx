import {
  FunctionComponent,
  memo,
} from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface PersonTableProps {
  person: Person;
  slug: string;
  personMother?: Person;
  personFather?: Person;
}

export const PersonTable: FunctionComponent<PersonTableProps> = memo(({
  person,
  slug,
  personMother,
  personFather,
}) => {
  const motherName = person.motherName || '-';
  const fatherName = person.fatherName || '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {personMother
          ? (<PersonLink person={personMother} />)
          : (motherName)}
      </td>
      <td>
        {personFather
          ? (<PersonLink person={personFather} />)
          : (fatherName)}
      </td>
    </tr>
  );
});
