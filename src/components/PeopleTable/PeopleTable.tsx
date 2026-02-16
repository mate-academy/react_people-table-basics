import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peoples }) => {
  const { slug } = useParams();

  const findPerson = (name: string | null): Person | null => {
    if (!name) {
      return null;
    }

    return peoples.find(person => person.name === name) || null;
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
        {peoples.map((person: Person) => {
          const mother = findPerson(person.motherName);
          const father = findPerson(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  <PersonLink person={mother} name={person.motherName} />
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  <PersonLink person={father} name={person.fatherName} />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
