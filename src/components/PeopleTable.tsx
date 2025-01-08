import { Person } from '../types';
import { Loader } from './Loader';
import PersonLink from './PersonLink';
import { useParams } from 'react-router-dom';

interface PeopleProps {
  person: Person[];
  loading: boolean;
}

const PeopleTable: React.FC<PeopleProps> = ({ person, loading }) => {
  const { slug } = useParams<{ slug: string }>();
  const selectedPerson = slug || '';

  return (
    <div className="block">
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : person.length > 0 ? (
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
              {person.map(individual => (
                <tr
                  key={individual.name}
                  data-cy="person"
                  className={
                    selectedPerson ===
                    `${individual.name.replaceAll(' ', '-').toLowerCase()}-${individual.born}`
                      ? 'has-background-warning'
                      : ''
                  }
                >
                  <td>
                    <PersonLink
                      name={individual.name}
                      person={individual}
                    />
                  </td>
                  <td>{individual.sex}</td>
                  <td>{individual.born}</td>
                  <td>{individual.died}</td>
                  <td>
                    {individual.motherName ? (
                      <PersonLink
                        name={individual.motherName}
                        person={person.find(
                          p => p.name === individual.motherName,
                        )}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {individual.fatherName ? (
                      <PersonLink
                        name={individual.fatherName}
                        person={person.find(
                          p => p.name === individual.fatherName,
                        )}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
      </div>
    </div>
  );
};

export default PeopleTable;
