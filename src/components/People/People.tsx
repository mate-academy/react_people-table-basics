import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../Person/PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};
export const People: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();

  return (
    <div className="block">
      <div className="box table-container">
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
                  'has-background-warning': person.slug === slug,
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
                    <PersonLink
                      person={people.find(p => p.name === person.motherName)}
                      name={person.motherName}
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {person.fatherName ? (
                    <PersonLink
                      person={people.find(p => p.name === person.fatherName)}
                      name={person.fatherName}
                    />
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
