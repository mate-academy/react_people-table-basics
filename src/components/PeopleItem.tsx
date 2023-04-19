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

  const linkParents = (selectedParrents: string | null) => {
    const findedParents = selectedParrents && peopleFromServer.find(
      (people) => people.name === selectedParrents,
    );

    if (findedParents) {
      return (
        <Link
          to={`/people/${findedParents.slug}`}
          className={classNames({
            'has-text-danger': findedParents.sex === 'f',
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
      <td>{linkParents(motherName)}</td>
      <td>{linkParents(fatherName)}</td>
    </tr>
  );
};
