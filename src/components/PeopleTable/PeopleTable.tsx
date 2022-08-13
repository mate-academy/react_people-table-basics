import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const findPerson = (name: string) => {
    return people.find(person => person.name === name);
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
        {people.map(person => {
          const {
            name, sex, born, died, motherName, fatherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={name}
              className={classNames(
                { 'has-background-warning': person.slug === slug },
              )}
            >
              <td><PersonLink person={person} /></td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherName && findPerson(motherName)
                  ? <PersonLink person={findPerson(motherName)} />
                  : motherName || '-'}
              </td>
              <td>
                {fatherName && findPerson(fatherName)
                  ? <PersonLink person={findPerson(fatherName)} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
