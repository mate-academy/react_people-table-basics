import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { Person } from '../types';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  return (
    <>
      <h1 className="title">People Page</h1>

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
                  data-cy="person"
                  key={person.slug}
                  className={classNames({
                    'has-background-warning': person.slug === slug,
                  })}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {/* eslint-disable */}
                    {person.motherName &&
                      people.some(p => p.name === person.motherName) ? (
                      <Link
                        to={`/people/${people.find(p => p.name === person.motherName)?.slug}`}
                        className={'has-text-danger'}
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>

                  <td>
                    {person.fatherName &&
                      people.some(p => p.name === person.fatherName) ? (
                      <Link
                        to={`/people/${people.find(p => p.name === person.fatherName)?.slug}`}
                      >
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName || '-'
                    )}
                    {/* eslint-enable */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
