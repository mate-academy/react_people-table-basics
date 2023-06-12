import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { query } = useParams();

  const findPerson = (personName: string | null): string | JSX.Element => {
    if (!personName) {
      return '-';
    }

    const foundPerson = people.find(
      (currentPerson: Person) => currentPerson.name === personName,
    );

    if (!foundPerson) {
      return personName;
    }

    return (
      <PersonLink person={foundPerson} />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => {
          const {
            sex, born, died, motherName, fatherName, slug,
          } = person;
          const mother = findPerson(motherName);
          const father = findPerson(fatherName);

          return (
            <tr
              key={slug}
              className={classNames({
                'has-background-warning': slug === query,
              })}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{mother}</td>
              <td>{father}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
