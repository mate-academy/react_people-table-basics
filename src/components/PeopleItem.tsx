import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

export const PeopleItem: React.FC<{
  person: Person;
  selectedTodoId: string;
  peopleFromServer: Person[] | undefined;
}> = ({ person, selectedTodoId, peopleFromServer = [] }) => {
  const {
    name, sex, born, died, fatherName, motherName, slug,
  }
    = person;

  const LinkParrents = (selectedParrents: string | null) => {
    const findedParrents = selectedParrents && peopleFromServer.find(
      (people) => people.name === selectedParrents,
    );

    if (findedParrents) {
      return (
        <Link
          to={`/people/${findedParrents.slug}`}
          className={classNames({
            'has-text-danger': findedParrents.sex === 'f',
          })}
        >
          {selectedParrents}
        </Link>
      );
    }

    return selectedParrents || ' - ';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedTodoId === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName === null ? ' - ' : LinkParrents(motherName)}</td>
      <td>{fatherName === null ? ' - ' : LinkParrents(fatherName)}</td>
    </tr>
  );
};
