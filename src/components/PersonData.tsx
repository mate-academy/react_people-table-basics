import classNames from 'classnames';
import { Person } from '../types';

interface PersonDataProps {
  person: Person;
}

const PersonData: React.FC<PersonDataProps> = ({ person }) => {
  return (
    <tr>
      <td data-cy="person">
        <a
          href="#/people/jan-van-brussel-1714"
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </a>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName || '-'}</td>
      <td>{person.fatherName || '-'}</td>
    </tr>
  );
};

export default PersonData;
