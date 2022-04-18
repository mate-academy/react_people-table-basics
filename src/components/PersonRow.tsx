import { FC, memo } from 'react';

type Props = {
  person: Person;
};

const PersonRow: FC<Props> = memo(({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.fatherName}</td>
    <td>{person.motherName}</td>
  </tr>
));

export default PersonRow;
