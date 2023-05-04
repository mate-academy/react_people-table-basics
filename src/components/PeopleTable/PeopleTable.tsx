import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  people: Person[];
  error: string | null;
  isLoading: boolean;
}

export const PeopleTable: React.FC<Props> = ({ people, error, isLoading }) => {
  const { personSlug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!people.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

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
                  return (
                    <tr
                      data-cy="person"
                      key={person.name}
                      className={classNames({
                        'has-background-warning': person.slug === personSlug,
                      })}
                    >
                      <td>
                        <PersonLink person={person} />
                      </td>

                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.mother && <PersonLink person={person.mother} />}
                        {person.motherName && !person.mother && (
                          <p>{person.motherName}</p>
                        )}
                        {!person.motherName && '-'}
                      </td>
                      <td>
                        {person.father && <PersonLink person={person.father} />}
                        {person.fatherName && !person.father && (
                          <p>{person.fatherName}</p>
                        )}
                        {!person.fatherName && '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};
