import { FC } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonInfo: FC<Props> = ({ person }) => {
  return (
    <tr data-cy="person" key={person.slug}>
      <td>
        <a href="#/people/jan-van-brussel-1714">
          {person.name}
        </a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>Mother</td>
      <td>Father</td>
    </tr>
  );
};
