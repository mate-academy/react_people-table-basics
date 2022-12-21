import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  personSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personSlug,
}) => {
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
            {people.map(person => {
              const {
                sex, born, died, motherName, fatherName, slug,
              } = person;

              const mother = people.find(women => {
                return motherName === women.name;
              });
              const father = people.find(man => fatherName === man.name);

              return (
                <tr
                  data-cy="person"
                  key={slug}
                  className={classNames(
                    { 'has-background-warning': personSlug === slug },
                  )}
                >
                  <td>
                    <PersonLink person={person} />
                  </td>

                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother?.slug === undefined
                      ? (
                        motherName || '-'
                      )
                      : (
                        <PersonLink person={mother} />
                      )}

                  </td>
                  <td>
                    {father?.slug === undefined
                      ? (
                        fatherName || '-'
                      )
                      : (
                        <PersonLink person={father} />
                      )}

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
