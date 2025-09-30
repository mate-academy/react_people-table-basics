import { Loader } from './Loader';

import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  isLoading: boolean;
  selectedSlug: string;
  isError: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  selectedSlug,
  isError,
}) => {
  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {!isLoading && !isError && people.length > 0 && (
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
            {people?.map(person => {
              const mother = people.find(p => p.name === person.motherName);
              const father = people.find(p => p.name === person.fatherName);

              return (
                <tr
                  className={cn('', {
                    'has-background-warning': selectedSlug === person.slug,
                  })}
                  key={person.slug}
                  data-cy="person"
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {mother ? (
                      <PersonLink person={mother}>
                        {person.motherName}
                      </PersonLink>
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <PersonLink person={father}>
                        {person.fatherName}
                      </PersonLink>
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!isLoading && !isError && !people.length && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
    </div>
  );
};
