import { Person } from '../types';
import { Loader } from './Loader';
import { useOutletContext, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import cn from 'classnames';

export const PeopleTable: React.FC = () => {
  const { people, isLoading, isErrorsLoading } = useOutletContext<{
    people: Person[];
    isLoading: boolean;
    isErrorsLoading: {
      serverError: boolean;
      noPeople: boolean;
    };
  }>();
  const { slug } = useParams();

  const findParents = (parentName: string | null) => {
    const isParent = people.find(person => person.name === parentName);

    return isParent ? isParent : parentName;
  };

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {isErrorsLoading.serverError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isErrorsLoading.noPeople && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {people.length !== 0 && (
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
            {people.map((person, index) => {
              const mother = findParents(person.motherName);
              const father = findParents(person.fatherName);

              const rowKey = `${person.name}-${index}`;
              const isRowHighlighted = person.slug === slug;

              return (
                <tr
                  key={rowKey}
                  data-cy="person"
                  className={cn({ 'has-background-warning': isRowHighlighted })}
                >
                  <PersonLink person={person} />
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <PersonLink person={mother || '-'} />
                  <PersonLink person={father || '-'} />
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
