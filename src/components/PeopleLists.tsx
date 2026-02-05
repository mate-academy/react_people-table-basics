import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

type Props = {
  isLoading: boolean;
  peoplesLists: Person[];
  errorMessage: string | null;
};

export const PeopleLists: React.FC<Props> = ({
  isLoading,
  peoplesLists,
  errorMessage,
}) => {
  const { slug } = useParams();

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && peoplesLists.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {peoplesLists.length > 0 && (
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
            {peoplesLists.map(person => {
              const mother = peoplesLists.find(
                p => p.name === person.motherName,
              );
              const father = peoplesLists.find(
                p => p.name === person.fatherName,
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    person.slug === slug ? 'has-background-warning' : ''
                  }
                  key={person.slug}
                >
                  <td>
                    <PersonLink person={person} nameFallBack={person.name} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    <PersonLink
                      person={mother}
                      nameFallBack={person.motherName}
                    />
                  </td>

                  <td>
                    <PersonLink
                      person={father}
                      nameFallBack={person.fatherName}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
