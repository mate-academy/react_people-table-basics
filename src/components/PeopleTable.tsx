import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  function getPersonParent(name: string): Person | null {
    return people.find(person => person.name === name) || null;
  }

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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': personSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {(() => {
                if (
                  person.motherName == null ||
                  person.motherName.trim() === ''
                ) {
                  return '-';
                }

                const parent = getPersonParent(person.motherName);

                return parent ? (
                  <PersonLink person={parent} />
                ) : (
                  person.motherName
                );
              })()}
            </td>
            <td>
              {(() => {
                if (
                  person.fatherName == null ||
                  person.fatherName.trim() === ''
                ) {
                  return '-';
                }

                const parent = getPersonParent(person.fatherName);

                return parent ? (
                  <PersonLink person={parent} />
                ) : (
                  person.fatherName
                );
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
