import { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  findParent: (parentName: string) => Person | null;
};

export const TablePersonParents: React.FC<Props> = ({
  person,
  findParent,
}) => {
  const personMother: Person | string | null = useMemo(() => (
    person.motherName
      ? findParent(person.motherName) || person.motherName
      : null
  ), [person]);
  const personFather: Person | string | null = useMemo(() => (
    person.fatherName
      ? findParent(person.fatherName) || person.fatherName
      : null
  ), [person]);

  return (
    <>
      {personMother
        ? (
          <td>
            <PersonLink person={personMother} />
          </td>
        )
        : <td>-</td>}

      {personFather
        ? (
          <td>
            <PersonLink person={personFather} />
          </td>
        )
        : <td>-</td> }
    </>
  );
};
