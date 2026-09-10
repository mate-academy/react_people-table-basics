import classNames from 'classnames';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
  isLoading: boolean;
  showError: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  showError,
}) => {
  const { slug } = useParams();

  const findPersonByName = (name: string | null) => {
    const seekedPerson = people.find(person => person.name === name);

    if (!seekedPerson) {
      return null;
    }

    return seekedPerson;
  };

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {showError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && (
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
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  {findPersonByName(person.motherName) !== null ? (
                    <td>
                      <PersonLink
                        person={findPersonByName(person.motherName)}
                      />
                    </td>
                  ) : (
                    <td>{person.motherName ? person.motherName : '-'}</td>
                  )}
                  {findPersonByName(person.fatherName) !== null ? (
                    <td>
                      <PersonLink
                        person={findPersonByName(person.fatherName)}
                      />
                    </td>
                  ) : (
                    <td>{person.fatherName ? person.fatherName : '-'}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
