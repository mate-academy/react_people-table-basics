import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';

interface Props {
  person: Person;
  selectedPerson: string;
  setSelectPerson: (str: string) => void;
}

export const PeopleItem: FC<Props> = ({ person, selectedPerson, setSelectPerson }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  } = person;

  return (
    <tr data-cy="person" className="has-background-warning">
      <td>
        <a
          href="#/people/jan-van-brussel-1714"
          className={classNames({ 'has-text-danger': sex === 'f' })}
          onClick={setSelectPerson(slug)}
        >
          {name}
        </a>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName || '-'}</td>
      <td>{fatherName || '-'}</td>
    </tr>
  );
};
