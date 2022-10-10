import { FC } from 'react';
import { ClassNames } from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
}

export const PeopleItem: FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
  } = person;

  return (
    <tr data-cy="person" className="has-background-warning">
      <td>
        <a
          href="#/people/jan-van-brussel-1714"
          className={classNames()}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};
