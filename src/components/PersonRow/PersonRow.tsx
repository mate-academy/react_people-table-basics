import React from "react";

interface Props {
  person: PersonWithParents,
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    father,
    mother,
  } = person;

  return (
    <>
      <td className="cell">{name}</td>
      <td className="cell center">{sex}</td>
      <td className="cell center">{born}</td>
      <td className="cell center">{died}</td>
      <td className="cell">{mother?.name}</td>
      <td className="cell">{father?.name}</td>
    </>
  );
}
