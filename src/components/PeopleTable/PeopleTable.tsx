/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getPersonParent } from '../../utils/helpfulFunctions';

interface Props {
  people: Person[];
  selectedPerson?: string;
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { people, selectedPerson } = props;

  return (
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
          const personMother: Person | string
            = getPersonParent(person, people, 'mother');
          const personFather: Person | string
            = getPersonParent(person, people, 'father');

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink person={personMother} />
              </td>
              <td>
                <PersonLink person={personFather} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
