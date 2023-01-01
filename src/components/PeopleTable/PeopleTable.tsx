import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  personSlug: string;
};

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
  const isSelected = (person: Person) => person.slug === personSlug;
  const getPerson = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const findPerson = people.find(pers => (
      pers.name === name
    ));

    return findPerson
      ? <PersonLink person={findPerson} />
      : name;
  };

  return (
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
          {people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames(
                { 'has-background-warning': isSelected(person) },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {getPerson(person.motherName)}
              </td>

              <td>
                {getPerson(person.fatherName)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
