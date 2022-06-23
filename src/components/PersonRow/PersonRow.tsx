import { FC } from 'react';

type Props = {
  person:PersonWithParents;
};

export const PersonRow:FC<Props> = ({ person }) => {
  const {
    name,
    born,
    sex, died,
    father,
    mother,
  } = person;
  const unknown = <p className="unknown">Name is unknown</p>;

  return (
    <tr className="Person">
      <td className="td_name">{name}</td>
      <td className="td_sex">{sex}</td>
      <td className="td_born">{born}</td>
      <td className="td_died">{died}</td>
      <td className="td_motherName">{mother?.name || unknown}</td>
      <td className="td_fatherName">{father?.name || unknown}</td>
    </tr>
  );
};
