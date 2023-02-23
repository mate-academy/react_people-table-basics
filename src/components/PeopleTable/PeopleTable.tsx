import cn from 'classnames';
import { Person } from '../../types';
import { findParent } from '../../utils/helpers';
import { PersonLink } from '../PersonLink';

interface Props {
  people: Person[],
  personSlug: string,
}

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
  return (
    people.length
      ? (
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
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;

              const isSelected = personSlug === slug;
              const displayFatherName = fatherName || '-';
              const displayMotherName = motherName || '-';
              const father = findParent(displayFatherName, people);
              const mother = findParent(displayMotherName, people);

              return (
                <tr
                  data-cy="person"
                  className={cn({
                    'has-background-warning': isSelected,
                  })}
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
                      : displayMotherName}
                  </td>
                  <td>
                    {father
                      ? <PersonLink person={father} />
                      : displayFatherName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )
      : (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      ));
};
