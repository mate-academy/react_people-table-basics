import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  peoples: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: FC<Props> = ({
  peoples,
  selectedPersonSlug,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {peoples.length === 0 ? (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) : (
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
              {peoples.map(person => {
                const {
                  sex,
                  born,
                  died,
                  fatherName,
                  motherName,
                  slug,
                  mother,
                  father,
                } = person;

                return (
                  <tr
                    data-cy="person"
                    className={cn({
                      'has-background-warning': selectedPersonSlug === slug,
                    })}
                    key={slug}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>

                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>
                    <td>
                      {mother
                        ? <PersonLink person={mother} />
                        : (
                          <>
                            {motherName
                              ? `${motherName}`
                              : '-'}
                          </>
                        )}
                    </td>
                    <td>
                      {father
                        ? <PersonLink person={father} />
                        : (
                          <>
                            {fatherName
                              ? `${fatherName}`
                              : '-'}
                          </>
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
