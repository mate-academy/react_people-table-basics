import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type ExtendedPerson = Person & {
  motherObject: Person | null;
  fatherObject: Person | null;
};

type Props = {
  people: ExtendedPerson[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams<{ personSlug?: string }>();

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
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
            motherObject,
            fatherObject,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {motherObject ? (
                  <PersonLink person={motherObject} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {fatherObject ? (
                  <PersonLink person={fatherObject} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
