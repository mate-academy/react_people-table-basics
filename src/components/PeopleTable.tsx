import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Loader } from './Loader/Loader';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  isLoading: boolean;
  error: string;
}

export const PeopleTable = ({ people, isLoading, error }: PeopleTableProps) => {
  const { slug: selectedSlug } = useParams();

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!isLoading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {people.length > 0 && (
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
                const { sex, born, died, fatherName, motherName, slug } =
                  person;

                const mother = people.find(p => p.name === motherName);
                const father = people.find(p => p.name === fatherName);

                return (
                  <tr
                    data-cy="person"
                    key={slug}
                    className={
                      slug === selectedSlug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>

                    <td>
                      {mother ? (
                        <PersonLink person={mother} />
                      ) : (
                        motherName || '-'
                      )}
                    </td>

                    <td>
                      {father ? (
                        <PersonLink person={father} />
                      ) : (
                        fatherName || '-'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
