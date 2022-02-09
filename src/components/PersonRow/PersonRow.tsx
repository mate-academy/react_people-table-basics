import React from 'react';

export type Person = {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
};

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <>
      {Object.values(person).slice(
        0, (Object.values(person).length - 1),
      ).map((personData: string | number) => (
        <td key={person.born}>
          {personData}
        </td>
      ))}
    </>
  );
};
