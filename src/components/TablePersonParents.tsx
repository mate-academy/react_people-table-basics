import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personNames: string[];
  findParent: (parentName: string) => Person;
};

export const TablePersonParents: React.FC<Props> = ({
  person,
  personNames,
  findParent,
}) => {
  return (
    <>
      {person.motherName
        ? (
          <>
            {personNames?.includes(person.motherName)
              ? (
                <td>
                  <PersonLink
                    person={
                      findParent(person.motherName)
                    }
                  />
                </td>
              )
              : <td>{person.motherName}</td>}
          </>
        )
        : (
          <td>-</td>
        )}

      {person.fatherName
        ? (
          <>
            {personNames?.includes(person.fatherName)
              ? (
                <td>
                  <PersonLink
                    person={
                      findParent(person.fatherName)
                    }
                  />
                </td>
              )
              : <td>{person.fatherName}</td>}
          </>
        )
        : (
          <td>-</td>
        )}
    </>
  );
};
