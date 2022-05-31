import { FC } from 'react';

type Props = {
  person: Person;
};

export const PersonRow: FC<Props> = ({ person }) => {
  const valuesOfPerson = Object.values(person);

  valuesOfPerson.pop();

  return (
    <tr className="person-row">
      {
        valuesOfPerson.map(value => (
          <td>{value || '-/-'}</td>
        ))
      }
    </tr>
  );
};
