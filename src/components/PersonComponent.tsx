import { PersonTypes } from '../types';

type Props = {
  person: PersonTypes
};

export const PersonComponent: React.FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person">
      <td>
        <a href="#/people/jan-van-brussel-1714">
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </tr>
  );
};
